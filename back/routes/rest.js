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

const router = express.Router();

//-------------------그룹 채팅방 목록 GET---------------------------------------------
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
    const ownedClubs = await user.getOwnedClub(); // getOwnedClub 호출
    const joinedClubs = await user.getClubs({
      through: { where: { state: 2 } },
    });
    const ownedMeetings = await user.getOwnedMeeting(); // getOwnedClub 호출
    const joinedMeetings = await user.getMeetings({
      through: { where: { state: 2 } },
    });
    return res.json({
      ownedClubs,
      joinedClubs,
      ownedMeetings,
      joinedMeetings,
    });
  } catch (error) {
    next(error);
  }
});
//--------------------------그룹 채팅 메시지 GET------------------------------------
router.get('/chat/clubno/:clubNo/message/list', async (req, res, next) => {
  try {
    const club = await Club.findOne({
      where: { club_no: req.params.clubNo },
    });
    return res.json(
      await club.getClubMessages({
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
      })
    );
  } catch (error) {
    next(error);
  }
});
module.exports = router;

router.get(
  '/chat/meetingno/:meetingNo/message/list',
  async (req, res, next) => {
    try {
      const meeting = await Meeting.findOne({
        where: { meeting_no: req.params.meetingNo },
      });
      return res.json(
        await meeting.getMeetingMessages({
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
        })
      );
    } catch (error) {
      next(error);
    }
  }
);
module.exports = router;

//--------------------------------그룹채팅 Message POST-----------------------
router.post('/chat/clubno/:clubNo', async (req, res, next) => {
  try {
    // const club = await Club.findOne({
    //   where: { club_no: req.params.clubNo },
    // });
    const message = await RoomMessage.create({
      sender_no: req.body.userNo,
      club_no: req.params.clubNo,
      content: req.body.content,
      content_type_no: req.body.contentTypeNo,
    });

    const messageWithUser = await RoomMessage.findOne({
      where: {
        message_no: message.message_no,
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
      .to(`/ct-club-${req.params.clubNo}`)
      .emit('message', messageWithUser);
    res.send('club ok');
  } catch (error) {
    next(error);
  }
});

router.post('/chat/meetingno/:meetingNo', async (req, res, next) => {
  try {
    // const meeting = await Meeting.findOne({
    //   where: { meeting_no: req.params.meetingNo },
    // });
    const message = await RoomMessage.create({
      sender_no: req.body.userNo,
      meeting_no: req.params.meetingNo,
      content: req.body.content,
      content_type_no: req.body.contentTypeNo,
    });

    const messageWithUser = await RoomMessage.findOne({
      where: {
        message_no: message.message_no,
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
      .to(`/ct-meeting-${req.params.meetingNo}`)
      .emit('message', messageWithUser);
    res.send('meeting ok');
  } catch (error) {
    next(error);
  }
});

//---------------------------Direct Message Get--------------------------------------
