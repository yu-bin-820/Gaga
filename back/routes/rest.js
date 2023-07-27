const { Op, literal } = require('sequelize');
const express = require('express');

const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const fs = require('fs');
const path = require('path');

const { sequelize } = require('../models');
const User = require('../models/user');
const Club = require('../models/club');
const Meeting = require('../models/meeting');
const RoomMessage = require('../models/roomMessage');
const DirectMessage = require('../models/directMessage');
const Reader = require('../models/reader');
const Member = require('../models/member');
const router = express.Router();

//-------------------file upload ------------------------------------------

// AWS.config.update({
//   accessKeyId: 'bPEvFJueAhcx3WIpM2ox',
//   secretAccessKey: 'GHvfAADsVz9Nk9EgZdIVYDfmB2btdKBD3NABbJ2U',
//   region: 'ap-northeast-2', // 예: 'ap-northeast-2' (서울)
// });

const s3option = {
  endpoint: 'https://kr.object.ncloudstorage.com/',
  region: 'ap-northeast-2',
  credentials: {
    accessKeyId: 'bPEvFJueAhcx3WIpM2ox',
    secretAccessKey: 'GHvfAADsVz9Nk9EgZdIVYDfmB2btdKBD3NABbJ2U',
  },
};

async function uploadToS3(file) {
  const s3 = new AWS.S3(s3option);

  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
  const fileName = uniqueSuffix + '_' + file.originalname;

  const bucket_name = 'gaga-objectstorage';
  const objectName = 'upload_images/chat/' + fileName;

  await s3
    .putObject({
      Bucket: bucket_name,
      Key: objectName,
      ACL: 'public-read',
      Body: file.buffer,
    })
    .promise();

  return objectName;
}

// const s3 = new AWS.S3({
//   endpoint: 'https://kr.object.ncloudstorage.com/',
//   region: 'ap-northeast-2',
//   credentials: {
//     accessKeyId: 'bPEvFJueAhcx3WIpM2ox',
//     secretAccessKey: 'GHvfAADsVz9Nk9EgZdIVYDfmB2btdKBD3NABbJ2U',
//   },
// });

// const upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: 'gaga-objectstorage',
//     acl: 'public-read', // 파일 접근 권한 설정
//     metadata: function (req, file, cb) {
//       cb(null, { fieldName: file.fieldname });
//     },
//     key: function (req, file, cb) {
//       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//       const fileName =
//         file.fieldname + '_' + uniqueSuffix + '_' + file.originalname;

//       const fullPath = 'upload_images/chat/' + fileName;
//       req.body.content = fullPath;
//       cb(null, fullPath);
//     },
//   }),
// });

const upload = multer({
  storage: multer.memoryStorage(),
});

//-----------------Club,Meeting Totalunread GET-----------------------------------------
router.get(
  '/chat/group/message/unreads/userno/:userNo',
  async (req, res, next) => {
    if (req.params.userNo != 'undefined') {
      try {
        const user = await User.findOne({
          where: { user_no: req.params.userNo },
        });

        const ownedClubs = await user.getOwnedClub(); // getOwnedClub 호출

        const joinedClubs = await user.getClubs({
          through: { where: { state: 2 } },
        });

        const ownedMeetings = await user.getOwnedMeeting(); // getOwnedClub 호출

        const joinedMeetings = await user.getMeetings({
          through: { where: { state: 2 } },
        });
        //------------------- user가 속한 그룹 전체 메시지수 count-------------------------

        let countMessage = 0;

        for (const club of ownedClubs) {
          countMessage += await club.countClubMessages();
        }

        for (const club of joinedClubs) {
          countMessage += await club.countClubMessages();
        }

        for (const meeting of ownedMeetings) {
          countMessage += await meeting.countMeetingMessages();
        }

        for (const meeting of joinedMeetings) {
          countMessage += await meeting.countMeetingMessages();
        }

        const countReadedMessage = await user.countReadedMessages();
        let countGroupUnreads = countMessage - countReadedMessage;

        //------------------------------directUnreads count--------------------------

        let countDirectUnreads = await DirectMessage.count({
          where: {
            [Op.and]: [
              { receiver_no: req.params.userNo },
              { read_state: 1 },
              { sender_no: { [Op.not]: null } },
            ],
          },
        });

        let countAlramUnreads = await DirectMessage.count({
          where: {
            [Op.and]: [
              { receiver_no: req.params.userNo },
              { read_state: 1 },
              { sender_no: null },
            ],
          },
        });

        if (countGroupUnreads < 0) {
          countGroupUnreads = 0;
        }

        if (countDirectUnreads < 0) {
          countDirectUnreads = 0;
        }

        if (countAlramUnreads < 0) {
          countAlramUnreads = 0;
        }

        res.json({ countGroupUnreads, countDirectUnreads, countAlramUnreads });
      } catch (error) {
        next(error);
      }
    } else {
      res.json({});
    }
  }
);
//-------------------Club, Meeting list GET---------------------------------------------
router.get('/chat/club/list/userno/:userNo', async (req, res, next) => {
  if (req.params.userNo != 'undefined') {
    try {
      console.log('여기는');
      const user = await User.findOne({
        where: { user_no: req.params.userNo },
      });
      const ownedClubs = await user.getOwnedClub(); // getOwnedClub 호출
      const joinedClubs = await user.getClubs({
        through: { where: { state: 2 } },
      });
      return res.json({ ownedClubs, joinedClubs });
    } catch (error) {
      next(error);
    }
  } else {
    return res.json({});
  }
});

router.get('/chat/meeting/list/userno/:userNo', async (req, res, next) => {
  if (req.params.userNo != 'undefined') {
    try {
      console.log('여기는');
      const user = await User.findOne({
        where: { user_no: req.params.userNo },
      });
      const ownedMeetings = await user.getOwnedMeeting(); // getOwnedClub 호출
      const joinedMeetings = await user.getMeetings({
        through: { where: { state: 2 } },
      });
      return res.json({ ownedMeetings, joinedMeetings });
    } catch (error) {
      next(error);
    }
  } else {
    return res.json({});
  }
});

router.get('/chat/group/list/userno/:userNo', async (req, res, next) => {
  if (req.params.userNo != 'undefined') {
    try {
      console.log('/chat/group/list/userno/:userNo', req.params.userNo);

      const user = await User.findOne({
        where: { user_no: req.params.userNo },
      });

      const ownedClubs = await user.getOwnedClub({
        include: [
          {
            model: User,
            attributes: ['user_no', 'nick_name', 'profile_img'],
            as: 'ClubLeader',
          },
        ],
        where: {
          club_state: [1, 2],
        },
      }); // getOwnedClub 호출
      const joinedClubs = await user.getClubs({
        through: { where: { state: 2 } },
        include: [
          {
            model: User,
            attributes: ['user_no', 'nick_name', 'profile_img'],
            as: 'ClubLeader',
          },
        ],
        where: {
          club_state: [1, 2],
        },
      });
      const ownedMeetings = await user.getOwnedMeeting({
        include: [
          {
            model: User,
            attributes: ['user_no', 'nick_name', 'profile_img'],
            as: 'MeetingLeader',
          },
        ],
        where: {
          meeting_state: [1, 2],
        },
      }); // getOwnedClub 호출
      const joinedMeetings = await user.getMeetings({
        through: { where: { state: 2 } },
        include: [
          {
            model: User,
            attributes: ['user_no', 'nick_name', 'profile_img'],
            as: 'MeetingLeader',
          },
        ],
        where: {
          meeting_state: [1, 2],
        },
      });
      const unsortedGroups = [
        ...ownedClubs,
        ...joinedClubs,
        ...ownedMeetings,
        ...joinedMeetings,
      ];
      // get all read messages by the user
      console.log('userno', user.user_no);
      const readMessages = await user.getReadedMessages();
      console.log('readMessages', readMessages.length);
      for (const group of unsortedGroups) {
        const countGroupMessage =
          group instanceof Club
            ? await group.countClubMessages()
            : await group.countMeetingMessages();

        // filter the read messages where club_no or meeting_no matches with the group
        const countReadedMessages = await readMessages.filter(
          (message) =>
            message[group instanceof Club ? 'club_no' : 'meeting_no'] ===
            group[group instanceof Club ? 'club_no' : 'meeting_no']
        ).length;

        console.log(
          group instanceof Club ? 'club_no' : 'meeting_no',
          group[group instanceof Club ? 'club_no' : 'meeting_no'],
          countReadedMessages
        );
        console.log(countGroupMessage);

        if (countGroupMessage - countReadedMessages >= 0) {
          group.dataValues.unreadMessages =
            countGroupMessage - countReadedMessages;
        } else {
          group.dataValues.unreadMessages = 0;
        }

        console.log(group.dataValues.unreadMessages);
      }
      const groups = unsortedGroups.sort(
        (a, b) => new Date(b.last_message_time) - new Date(a.last_message_time)
      );

      return res.json({
        groups,
      });
    } catch (error) {
      next(error);
    }
  } else {
    return res.json({});
  }
});
//--------------------------Room Message GET------------------------------------
router.get(
  '/chat/clubno/:clubNo/message/list/userno/:userNo',
  async (req, res, next) => {
    if (req.params.userNo != 'undefined') {
      try {
        const club = await Club.findOne({
          where: { club_no: req.params.clubNo },
        });
        // return res.json(
        const clubMessages = await club.getClubMessages({
          include: [
            {
              model: User,
              attributes: ['user_no', 'nick_name', 'profile_img'],
              as: 'Sender',
            },
            {
              model: Club,
              as: 'Club',
            },
          ],
          order: [['created_at', 'DESC']],
          limit: parseInt(req.query.pageSize, 10),
          offset: req.query.pageSize * (req.query.page - 1),
        });
        // );

        //------readers table insert-----------
        const reader = await Reader.findAll({
          where: {
            user_no: req.params.userNo,
            message_no: clubMessages.map((message) => message.message_no),
          },
        });

        const readedMessageNoList = reader?.map((readed) => readed.message_no);
        const messagesToInsert = clubMessages.filter(
          (message) => !readedMessageNoList?.includes(message.message_no)
        );

        if (messagesToInsert.length > 0) {
          await Reader.bulkCreate(
            messagesToInsert.map((message) => ({
              user_no: req.params.userNo,
              message_no: message.message_no,
            }))
          );
        }

        // 클럽 총원 Count
        const countClubMembers = await club.countClubMembers({
          through: { where: { state: 2 } },
        });
        // console.log('countMeeting', countMeetingMembers);

        // 읽은 인원 수를 카운트하여 meetingMessages에 연결
        const clubMessagesWithReadCount = await Promise.all(
          clubMessages.map(async (message) => {
            let readCount =
              countClubMembers +
              1 -
              (await Reader.count({
                where: { message_no: message.message_no },
              }));
            if (readCount < 0) {
              readCount = 0;
            }
            return {
              message_no: message.message_no,
              content: message.content,
              sender_no: message.sender_no,
              content_type_no: message.content_type_no,
              created_at: message.created_at,
              Sender: message.Sender,
              Club: message.Club,
              club_no: message.club_no,
              lat: message.lat,
              lng: message.lng,
              readCount,
            };
          })
        );
        // console.log(clubMessagesWithReadCount);

        return res.json(clubMessagesWithReadCount);
      } catch (error) {
        next(error);
      }
    } else {
      return res.json({});
    }
  }
);
module.exports = router;

router.get(
  '/chat/meetingno/:meetingNo/message/list/userno/:userNo',
  async (req, res, next) => {
    if (req.params.userNo != 'undefined') {
      try {
        const meeting = await Meeting.findOne({
          where: { meeting_no: req.params.meetingNo },
        });
        // return res.json(
        const meetingMessages = await meeting.getMeetingMessages({
          include: [
            {
              model: User,
              attributes: ['user_no', 'nick_name', 'profile_img'],
              as: 'Sender',
            },
            {
              model: Meeting,
              as: 'Meeting',
            },
          ],
          order: [['created_at', 'DESC']],
          limit: parseInt(req.query.pageSize, 10),
          offset: req.query.pageSize * (req.query.page - 1),
        });
        // );

        //------readers table insert-----------
        const reader = await Reader.findAll({
          where: {
            user_no: req.params.userNo,
            message_no: meetingMessages.map((message) => message.message_no),
          },
        });

        const readedMessageNoList = reader?.map((readed) => readed.message_no);
        const messagesToInsert = meetingMessages.filter(
          (message) => !readedMessageNoList?.includes(message.message_no)
        );

        if (messagesToInsert.length > 0) {
          await Reader.bulkCreate(
            messagesToInsert.map((message) => ({
              user_no: req.params.userNo,
              message_no: message.message_no,
            }))
          );
        }

        // 미팅 총원 Count
        const countMeetingMembers = await meeting.countMeetingMembers({
          through: { where: { state: 2 } },
        });
        // console.log('countMeeting', countMeetingMembers);

        // 읽은 인원 수를 카운트하여 meetingMessages에 연결
        const meetingMessagesWithReadCount = await Promise.all(
          meetingMessages.map(async (message) => {
            const readCount =
              countMeetingMembers +
              1 -
              (await Reader.count({
                where: { message_no: message.message_no },
              }));

            return {
              message_no: message.message_no,
              content: message.content,
              sender_no: message.sender_no,
              content_type_no: message.content_type_no,
              created_at: message.created_at,
              Sender: message.Sender,
              Meeting: message.Meeting,
              meeting_no: message.meeting_no,
              lat: message.lat,
              lng: message.lng,
              readCount,
            };
          })
        );
        // console.log(meetingMessagesWithReadCount);
        res.json(meetingMessagesWithReadCount);
      } catch (error) {
        next(error);
      }
    } else {
      res.json({});
    }
  }
);
module.exports = router;

//-----------------------------Room Message POST-----------------------
router.post('/chat/club/message', async (req, res, next) => {
  try {
    const club = await Club.findOne({
      where: { club_no: req.body.groupNo },
    });

    let content = req.body.content;

    if (typeof content === 'object' && content !== null) {
      // content가 객체인 경우에만 stringify를 사용합니다.
      content = JSON.stringify(content);
    }

    const roomMessage = await RoomMessage.create({
      sender_no: req.body.senderNo,
      club_no: req.body.groupNo,
      content: content,
      content_type_no: req.body.contentTypeNo,
      lat: req.body.lat,
      lng: req.body.lng,
    });
    //1: text, 2: imgFile, 3:location
    // const roomMessageWithUser = await RoomMessage.findOne({
    //   where: {
    //     message_no: roomMessage.message_no,
    //   },
    //   include: [
    //     {
    //       model: User,
    //       as: 'Sender',
    //     },
    //     {
    //       model: Club,
    //       as: 'Club',
    //     },
    //   ],
    // });

    const io = req.app.get('io');
    io.of(`/ct-club`)
      .to(`/ct-club-${req.body.groupNo}`)
      // .emit('message', roomMessageWithUser);
      .emit('message', 'ok');

    let lastMessage = null;

    if (typeof content !== 'object') {
      lastMessage = content;
    }

    if (req.body.contentTypeNo === 2) {
      lastMessage = '(사진)';
    } else if (req.body.contentTypeNo === 3) {
      lastMessage = '(위치 공유)' + lastMessage;
    } else if (req.body.contentTypeNo === 102) {
      lastMessage = '(새 모임 참여링크)';
    }

    if (lastMessage.length > 15) {
      lastMessage = lastMessage.slice(0, 15) + '...'; // 15글자까지 자르기
    }

    await club.update({
      last_message_time: literal('NOW()'),
      last_message: lastMessage,
    });

    res.send('club ok');
  } catch (error) {
    next(error);
  }
});

router.post('/chat/meeting/message', async (req, res, next) => {
  try {
    const meeting = await Meeting.findOne({
      where: { meeting_no: req.body.groupNo },
    });

    let content = req.body.content;

    if (typeof content === 'object' && content !== null) {
      // content가 객체인 경우에만 stringify를 사용합니다.
      content = JSON.stringify(content);
    }

    const roomMessage = await RoomMessage.create({
      sender_no: req.body.senderNo,
      meeting_no: req.body.groupNo,
      content: content,
      content_type_no: req.body.contentTypeNo,
      lat: req.body.lat,
      lng: req.body.lng,
    });

    // const roomMessageWithUser = await RoomMessage.findOne({
    //   where: {
    //     message_no: roomMessage.message_no,
    //   },
    //   include: [
    //     {
    //       model: User,
    //       as: 'Sender',
    //     },
    //     {
    //       model: Meeting,
    //       as: 'Meeting',
    //     },
    //   ],
    // });
    const io = req.app.get('io');
    io.of(`/ct-meeting`)
      .to(`/ct-meeting-${req.body.groupNo}`)
      // .emit('message', roomMessageWithUser);
      .emit('message', 'ok');

    let lastMessage = null;

    if (typeof content !== 'object') {
      lastMessage = content;
    }

    if (req.body.contentTypeNo === 2) {
      lastMessage = '(사진)';
    } else if (req.body.contentTypeNo === 3) {
      lastMessage = '(위치 공유)' + lastMessage;
    } else if (req.body.contentTypeNo === 102) {
      lastMessage = '(새 모임 참여링크)';
    }

    if (lastMessage.length > 15) {
      lastMessage = lastMessage.slice(0, 15) + '...'; // 15글자까지 자르기
    }

    await meeting.update({
      last_message_time: literal('NOW()'),
      last_message: lastMessage,
    });

    res.send('meeting ok');
  } catch (error) {
    next(error);
  }
});

//-----------------------------GroupChat Image POST----------------------------------------------

router.post(
  '/chat/club/image',
  upload.single('file'),
  async (req, res, next) => {
    try {
      const objectName = await uploadToS3(req.file);

      const club = await Club.findOne({
        where: { club_no: req.body.groupNo },
      });
      const roomMessage = await RoomMessage.create({
        sender_no: req.body.senderNo,
        club_no: req.body.groupNo,
        content: objectName,
        content_type_no: 2,
      });

      // const roomMessageWithUser = await RoomMessage.findOne({
      //   where: {
      //     message_no: roomMessage.message_no,
      //   },
      //   include: [
      //     {
      //       model: User,
      //       as: 'Sender',
      //     },
      //     {
      //       model: Club,
      //       as: 'Club',
      //     },
      //   ],
      // });
      const io = req.app.get('io');
      io.of(`/ct-club`)
        .to(`/ct-club-${req.body.groupNo}`)
        // .emit('message', roomMessageWithUser);
        .emit('message', 'ok');

      const lastMessage = '(사진)';

      await club.update({
        last_message_time: literal('NOW()'),
        last_message: lastMessage,
      });

      res.send('club ok');
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/chat/meeting/image',
  upload.single('file'),
  async (req, res, next) => {
    try {
      const objectName = await uploadToS3(req.file);

      const meeting = await Meeting.findOne({
        where: { meeting_no: req.body.groupNo },
      });
      const roomMessage = await RoomMessage.create({
        sender_no: req.body.senderNo,
        meeting_no: req.body.groupNo,
        content: objectName,
        content_type_no: 2,
      });

      // const roomMessageWithUser = await RoomMessage.findOne({
      //   where: {
      //     message_no: roomMessage.message_no,
      //   },
      //   include: [
      //     {
      //       model: User,
      //       as: 'Sender',
      //     },
      //     {
      //       model: Meeting,
      //       as: 'Meeting',
      //     },
      //   ],
      // });
      const io = req.app.get('io');
      io.of(`/ct-meeting`)
        .to(`/ct-meeting-${req.body.groupNo}`)
        // .emit('message', roomMessageWithUser);
        .emit('message', 'ok');
      const lastMessage = '(사진)';

      await meeting.update({
        last_message_time: literal('NOW()'),
        last_message: lastMessage,
      });

      res.send('meeting ok');
    } catch (error) {
      next(error);
    }
  }
);

//------------------DM List Get-----------------------------------------------------
router.get('/chat/direct/list/userno/:userNo', async (req, res, next) => {
  if (req.params.userNo != 'undefined') {
    try {
      const userNo = req.params.userNo;

      const sendDirectMessageList = await DirectMessage.findAll({
        attributes: [
          'receiver_no',
          'sender_no',
          'content',
          'content_type_no',
          'created_at',
        ],
        where: {
          sender_no: userNo,
        },
        include: [
          {
            model: User,
            as: 'Receiver',
            attributes: ['user_no', 'user_id', 'nick_name', 'profile_img'],
          },
        ],
        group: [
          'receiver_no',
          'sender_no',
          'content',
          'content_type_no',
          'created_at',
        ],
        having: literal(
          'created_at = (SELECT MAX(created_at) FROM direct_messages WHERE sender_no = `DirectMessage`.`sender_no` AND receiver_no = `DirectMessage`.`receiver_no` LIMIT 1)'
        ),
      });

      const receiveDirectMessageList = await DirectMessage.findAll({
        attributes: [
          'receiver_no',
          'sender_no',
          'content',
          'content_type_no',
          'created_at',
        ],
        where: {
          receiver_no: userNo,
        },
        include: [
          {
            model: User,
            as: 'Sender',
            attributes: ['user_no', 'user_id', 'nick_name', 'profile_img'],
          },
        ],
        group: [
          'receiver_no',
          'sender_no',
          'content',
          'content_type_no',
          'created_at',
        ],
        having: literal(
          'created_at = (SELECT MAX(created_at) FROM direct_messages WHERE sender_no = `DirectMessage`.`sender_no` AND receiver_no = `DirectMessage`.`receiver_no` LIMIT 1)'
        ),
      });

      for (const directMessage of sendDirectMessageList) {
        const unreadMessages = await DirectMessage.count({
          where: {
            [Op.and]: [
              { sender_no: directMessage.receiver_no },
              { receiver_no: userNo },
              { read_state: 1 },
            ],
          },
        });

        if (unreadMessages < 0) {
          unreadMessages = 0;
        }

        directMessage.dataValues.unreadMessages = unreadMessages;
      }

      for (const directMessage of receiveDirectMessageList) {
        const unreadMessages = await DirectMessage.count({
          where: {
            [Op.and]: [
              { sender_no: directMessage.sender_no },
              { receiver_no: userNo },
              { read_state: 1 },
            ],
          },
        });
        directMessage.dataValues.unreadMessages = unreadMessages;
      }

      const allDirectMessageList = [
        ...sendDirectMessageList,
        ...receiveDirectMessageList,
      ];

      // sender와 receiver의 조합을 정렬해서 동일한 조합을 만듭니다.
      allDirectMessageList.forEach((msg) => {
        if (msg.sender_no > msg.receiver_no) {
          [msg.sender_no, msg.receiver_no] = [msg.receiver_no, msg.sender_no];
        }
      });

      const sortedAndUniqueList = allDirectMessageList
        .sort((a, b) => {
          // 기준이 되는 sender_no와 receiver_no가 동일한 메시지 중에서,
          // created_at 기준으로 정렬합니다.
          if (a.sender_no === b.sender_no && a.receiver_no === b.receiver_no) {
            return b.created_at - a.created_at;
          }
          // 그 외의 경우는 sender_no와 receiver_no 기준으로 정렬합니다.
          return a.sender_no - b.sender_no || a.receiver_no - b.receiver_no;
        })
        .filter((item, index, self) => {
          // sender_no와 receiver_no가 동일한 중복 메시지 중에서,
          // 가장 먼저 나타나는 메시지 (즉, 가장 최근의 메시지)만 남깁니다.
          const previousItem = self[index - 1];
          if (
            previousItem &&
            item.sender_no === previousItem.sender_no &&
            item.receiver_no === previousItem.receiver_no
          ) {
            return false;
          }
          return true;
        });

      const finalList = sortedAndUniqueList.sort((a, b) => {
        // 최신 메시지가 먼저 오도록 created_at 기준으로 정렬합니다.
        return new Date(b.created_at) - new Date(a.created_at);
      });
      console.log(sendDirectMessageList);
      res.json(finalList);
    } catch (error) {
      next(error);
    }
  } else {
    res.json({});
  }
});
//---------------------------Direct Message Get--------------------------------------

router.get(
  '/chat/direct/senderno/:senderNo/receiverno/:receiverNo',
  async (req, res, next) => {
    try {
      await DirectMessage.update(
        { read_state: 0 },
        {
          where: {
            receiver_no: req.params.senderNo,
          },
        }
      );
      return res.json(
        await DirectMessage.findAll({
          where: {
            [Op.or]: [
              {
                sender_no: req.params.senderNo,
                receiver_no: req.params.receiverNo,
              },
              {
                sender_no: req.params.receiverNo,
                receiver_no: req.params.senderNo,
              },
            ],
          },
          include: [
            {
              model: User,
              as: 'Sender',
              attributes: ['nick_name', 'user_no', 'profile_img'],
            },
            {
              model: User,
              as: 'Receiver',
              attributes: ['nick_name', 'user_no', 'profile_img'],
            },
          ],
          order: [['created_at', 'ASC']],
          limit: parseInt(req.query.pageSize, 10),
          offset: req.query.pageSize * (req.query.page - 1),
        })
      );
    } catch (error) {
      next(error);
    }
  }
);
//-------------------------Alarm Get----------------------------------------------
router.get('/chat/alarm/receiverno/:receiverNo', async (req, res, next) => {
  if (req.params.receiverNo) {
    try {
      await DirectMessage.update(
        { read_state: 0 },
        {
          where: {
            sender_no: null,
            receiver_no: req.params.receiverNo,
          },
        }
      );
      return res.json(
        await DirectMessage.findAll({
          where: {
            sender_no: null,
            receiver_no: req.params.receiverNo,
          },
          include: [
            {
              model: User,
              as: 'Receiver',
              attributes: ['nick_name', 'user_no', 'profile_img'],
            },
          ],
          order: [['created_at', 'DESC']],
        })
      );
    } catch (error) {
      next(error);
    }
  } else {
    return res.json({});
  }
});

//---------------------------Direct Message Post------------------------------
function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}

router.post('/chat/direct/message', async (req, res, next) => {
  try {
    const directMessage = await DirectMessage.create({
      sender_no: req.body.senderNo,
      receiver_no: req.body.receiverNo,
      content: req.body.content,
      content_type_no: req.body.contentTypeNo,
      lat: req.body.lat,
      lng: req.body.lng,
    });
    // const directMessageWithSender = await DirectMessage.findOne({
    //   where: { message_no: directMessage.message_no },
    //   include: [
    //     {
    //       model: User,
    //       as: 'Sender',
    //     },
    //   ],
    // });
    const io = req.app.get('io');
    const onlineMap = req.app.get('onlineMap');
    //--불안한 부분--
    const receiverSocketId = getKeyByValue(
      onlineMap['/ct-direct'],
      Number(req.body.receiverNo)
    );
    io.of('/ct-direct')
      .to(receiverSocketId)
      // .emit('directMessage', directMessageWithSender);
      .emit('directMessage', 'ok');

    //--불안한부분끝--
    res.send('direct ok');
  } catch (error) {
    next(error);
  }
});
//---------------------------Direct Chat Imgage Post ---------------------------------------------
router.post(
  '/chat/direct/image',
  upload.single('file'),
  async (req, res, next) => {
    try {
      const objectName = await uploadToS3(req.file);

      const directMessage = await DirectMessage.create({
        sender_no: req.body.senderNo,
        receiver_no: req.body.receiverNo,
        content: objectName,
        content_type_no: 2,
      });

      // const directMessageWithSender = await DirectMessage.findOne({
      //   where: { message_no: directMessage.message_no },
      //   include: [
      //     {
      //       model: User,
      //       as: 'Sender',
      //     },
      //   ],
      // });

      const io = req.app.get('io');
      const onlineMap = req.app.get('onlineMap');
      const receiverSocketId = getKeyByValue(
        onlineMap['/ct-direct'],
        Number(req.body.receiverNo)
      );
      io.of('/ct-direct')
        .to(receiverSocketId)
        // .emit('directMessage', directMessageWithSender);
        .emit('directMessage', 'ok');

      res.send('direct ok');
    } catch (error) {
      next(error);
    }
  }
);
//---------------------------Alarm Post-----------------------------------------

router.post('/chat/alarm', async (req, res, next) => {
  try {
    const directMessage = await DirectMessage.create({
      receiver_no: req.body.receiverNo,
      content_type_no: 1,
      content: req.body.content,
      path: req.body.path,
    });
    // const directMessageWithSender = await DirectMessage.findOne({
    //   where: { message_no: directMessage.message_no },
    //   include: [
    //     {
    //       model: User,
    //       as: 'Sender',
    //     },
    //   ],
    // });
    const io = req.app.get('io');
    const onlineMap = req.app.get('onlineMap');
    const receiverSocketId = getKeyByValue(
      onlineMap['/ct-direct'],
      Number(req.body.receiverNo)
    );
    io.of('/ct-direct')
      .to(receiverSocketId)
      // .emit('directMessage', directMessageWithSender);
      .emit('directMessage', 'ok');

    res.send('alarm ok');
  } catch (error) {
    next(error);
  }
});

//----------------------------------Chat Delete, Exit----------------------------------------------------
router.patch('/chat/meeting/member/state', async (req, res, next) => {
  try {
    const member = await Member.findOne({
      where: [{ user_no: req.body.userNo }, { meeting_no: req.body.meetingNo }],
    });
    await member.update({ state: 3 });

    const user = await User.findOne({ where: { user_no: req.body.userNo } });
    console.log('user', user);
    const content = user.dataValues.nick_name + '님이 퇴장하셨습니다.';
    const roomMessage = await RoomMessage.create({
      sender_no: null,
      meeting_no: req.body.meetingNo,
      content: content,
      content_type_no: 101,
      lat: null,
      lng: null,
    });

    const meeting = await Meeting.findOne({
      where: { meeting_no: req.body.meetingNo },
    });

    await meeting.update({
      last_message_time: literal('NOW()'),
      last_message: content,
    });

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

router.patch('/chat/meeting/state', async (req, res, next) => {
  try {
    const meeting = await Meeting.findOne({
      where: { meeting_no: req.body.meetingNo },
    });
    // console.log('!!!!', meeting);
    await meeting.update({ meeting_state: 3 });

    const members = await meeting.getMeetingMembers();

    console.log(members);
    const content =
      meeting.dataValues.meeting_name + '모임의 채팅방이 삭제되었습니다.';
    const path = '/meeting/meetingno/' + meeting.dataValues.meeting_no;

    await members.map((user) => {
      DirectMessage.create({
        receiver_no: user.dataValues.user_no,
        content_type_no: 1,
        content: content,
        path: path,
      });
    });

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});
