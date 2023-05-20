const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const { sequelize } = require('../models');
const User = require('../models/user');
const Club = require('../models/club');
const Meeting = require('../models/club');
const RoomMessage = require('../models/roomMessage');
const DirectMessage = require('../models/directMessage');

const router = express.Router();

router.get('/community/chat/club/list/userno/:userNo',async (req,res,next) =>{
  try{
    const user = await User.findeOne({where: {url:req.params.userNo}})
    return res.json(await user.getClubs({
      include:[
        {
          model:User,
          as:'ClubMembers',
          attributes:['club_no'],}]}))
  }
}
)

module.exports = router;
