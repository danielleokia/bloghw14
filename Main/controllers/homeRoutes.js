const router = require('express').Router();
const { Comment, User, Blog } = require('../models');
const {findAll} = require("../models/User")
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const commentData = await findAll({
      attributes
      include:[
      {
        model: User,  
        exclude: ["password"],
      },
    ]
  });
    const comments = commentData.map(comment => comment.get({plain:true}))

    res.render('homepage', {comments});
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', async (req, res) => {
  try {
    res.render('login');
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;
