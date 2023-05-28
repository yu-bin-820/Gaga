const { Op, literal } = require('sequelize');
const express = require('express');
const multer = require('multer');
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
//-----------------Club,Meeting Totalunread GET-----------------------------------------
router.get(
  '/chat/group/message/unreads/userno/:userNo',
  async (req, res, next) => {
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
      const countGroupUnreads = countMessage - countReadedMessage;

      //------------------------------directUnreads count--------------------------

      const countDirectUnreads = await DirectMessage.count({
        where: {
          [Op.and]: [
            { receiver_no: req.params.userNo },
            { read_state: 1 },
            { sender_no: { [Op.not]: null } },
          ],
        },
      });

      const countAlramUnreads = await DirectMessage.count({
        where: {
          [Op.and]: [
            { receiver_no: req.params.userNo },
            { read_state: 1 },
            { sender_no: null },
          ],
        },
      });

      res.json({ countGroupUnreads, countDirectUnreads, countAlramUnreads });
    } catch (error) {
      next(error);
    }
  }
);
//-------------------Club, Meeting list GET---------------------------------------------
router.get('/chat/club/list/userno/:userNo', async (req, res, next) => {
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
});

router.get('/chat/meeting/list/userno/:userNo', async (req, res, next) => {
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
});

router.get('/chat/group/list/userno/:userNo', async (req, res, next) => {
  try {
    console.log('여기는');
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
    });
    const ownedMeetings = await user.getOwnedMeeting({
      include: [
        {
          model: User,
          attributes: ['user_no', 'nick_name', 'profile_img'],
          as: 'MeetingLeader',
        },
      ],
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
      group.dataValues.unreadMessages = countGroupMessage - countReadedMessages;

      console.log(group.dataValues.unreadMessages);
    }
    const groups = unsortedGroups.sort(
      (a, b) => b.last_message_time - a.last_message_time
    );

    return res.json({
      groups,
    });
  } catch (error) {
    next(error);
  }
});
//--------------------------Room Message GET------------------------------------
router.get(
  '/chat/clubno/:clubNo/message/list/userno/:userNo',
  async (req, res, next) => {
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
        order: [['created_at', 'ASC']],
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
          const readCount =
            countClubMembers +
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
            Club: message.Club,
            club_no: message.club_no,
            readCount,
          };
        })
      );
      // console.log(clubMessagesWithReadCount);

      return res.json(clubMessagesWithReadCount);
    } catch (error) {
      next(error);
    }
  }
);
module.exports = router;

router.get(
  '/chat/meetingno/:meetingNo/message/list/userno/:userNo',
  async (req, res, next) => {
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
        order: [['created_at', 'ASC']],
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
            readCount,
          };
        })
      );
      // console.log(meetingMessagesWithReadCount);
      res.json(meetingMessagesWithReadCount);
    } catch (error) {
      next(error);
    }
  }
);
module.exports = router;

//-----------------------------Room Message POST-----------------------
router.post('/chat/club/message', async (req, res, next) => {
  try {
    const club = await Club.findOne({
      where: { club_no: req.body.clubNo },
    });
    const roomMessage = await RoomMessage.create({
      sender_no: req.body.senderNo,
      club_no: req.body.clubNo,
      content: req.body.content,
      content_type_no: req.body.contentTypeNo,
    });

    const roomMessageWithUser = await RoomMessage.findOne({
      where: {
        message_no: roomMessage.message_no,
      },
      include: [
        {
          model: User,
          as: 'Sender',
        },
        {
          model: Club,
          as: 'Club',
        },
      ],
    });

    const io = req.app.get('io');
    io.of(`/ct-club`)
      .to(`/ct-club-${req.body.clubNo}`)
      .emit('message', roomMessageWithUser);

    let lastMessage = req.body.content;
    if (lastMessage.length > 15) {
      lastMessage = lastMessage.slice(0, 15) + '...'; // 15글자까지 자르기
    }

    if (req.body.contentTypeNo === 2) {
      lastMessage = '(사진)';
    } else if (req.body.contentTypeNo === 3) {
      lastMessage = '(위치 공유)';
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
      where: { meeting_no: req.body.meetingNo },
    });
    const roomMessage = await RoomMessage.create({
      sender_no: req.body.senderNo,
      meeting_no: req.body.meetingNo,
      content: req.body.content,
      content_type_no: req.body.contentTypeNo,
    });

    const roomMessageWithUser = await RoomMessage.findOne({
      where: {
        message_no: roomMessage.message_no,
      },
      include: [
        {
          model: User,
          as: 'Sender',
        },
        {
          model: Meeting,
          as: 'Meeting',
        },
      ],
    });
    const io = req.app.get('io');
    io.of(`/ct-meeting`)
      .to(`/ct-meeting-${req.body.meetingNo}`)
      .emit('message', roomMessageWithUser);

    let lastMessage = req.body.content;
    if (lastMessage.length > 15) {
      lastMessage = lastMessage.slice(0, 15) + '...'; // 15글자까지 자르기
    }

    if (req.body.contentTypeNo === 2) {
      lastMessage = '(사진)';
    } else if (req.body.contentTypeNo === 3) {
      lastMessage = '(위치 공유)';
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
//------------------DM List Get-----------------------------------------------------
router.get('/chat/direct/list/senderno/:senderNo', async (req, res, next) => {
  try {
    const directMessageList = await DirectMessage.findAll({
      attributes: ['receiver_no', 'content', 'content_type_no', 'created_at'],
      where: {
        sender_no: req.params.senderNo,
      },
      include: [
        {
          model: User,
          as: 'Receiver',
          attributes: ['user_no', 'user_id', 'nick_name', 'profile_img'],
        },
      ],
      group: ['receiver_no', 'content', 'content_type_no', 'created_at'],
      having: literal(
        'created_at = (SELECT MAX(created_at) FROM direct_messages WHERE sender_no = 1 AND receiver_no = `DirectMessage`.`receiver_no` LIMIT 1)'
      ),
    });

    for (const directMessage of directMessageList) {
      const unreadMessages = await DirectMessage.count({
        where: {
          [Op.and]: [
            { sender_no: directMessage.receiver_no },
            { receiver_no: req.params.senderNo },
            { read_state: 1 },
          ],
        },
      });
      directMessage.dataValues.unreadMessages = unreadMessages;
    }

    res.json(directMessageList);
  } catch (error) {
    next(error);
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
        })
      );
    } catch (error) {
      next(error);
    }
  }
);
//-------------------------Alarm Get----------------------------------------------
router.get('/chat/alarm/receiverno/:receiverNo', async (req, res, next) => {
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
      })
    );
  } catch (error) {
    next(error);
  }
});

//---------------------------Direct Message Post------------------------------
function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}

router.post('/chat/direct', async (req, res, next) => {
  try {
    const directMessage = await DirectMessage.create({
      sender_no: req.body.senderNo,
      receiver_no: req.body.receiverNo,
      content: req.body.content,
      content_type_no: req.body.contentTypeNo,
    });
    const directMessageWithSender = await DirectMessage.findOne({
      where: { message_no: directMessage.message_no },
      include: [
        {
          model: User,
          as: 'Sender',
        },
      ],
    });
    const io = req.app.get('io');
    const onlineMap = req.app.get('onlineMap');
    // const receiverSocketId = getKeyByValue(
    //   onlineMap['/ct-direct'],
    //   Number(req.body.receiverNo)
    // );
    // io.of('/ct-direct')
    //   .to(receiverSocketId)
    //   .emit('directMessage', directMessageWithSender);
    res.send('direct ok');
  } catch (error) {
    next(error);
  }
});

//---------------------------Alarm Post-----------------------------------------

router.post('/chat/alarm', async (req, res, next) => {
  try {
    const directMessage = await DirectMessage.create({
      receiver_no: req.body.receiverNo,
      content: req.body.content,
      content_type_no: req.body.contentTypeNo,
    });
    const directMessageWithSender = await DirectMessage.findOne({
      where: { message_no: directMessage.message_no },
      include: [
        {
          model: User,
          as: 'Sender',
        },
      ],
    });
    const io = req.app.get('io');
    const onlineMap = req.app.get('onlineMap');
    // const receiverSocketId = getKeyByValue(
    //   onlineMap['/ct-direct'],
    //   Number(req.body.receiverNo)
    // );
    // io.of('/ct-direct')
    //   .to(receiverSocketId)
    //   .emit('directMessage', directMessageWithSender);
    res.send('alarm ok');
  } catch (error) {
    next(error);
  }
});
//
