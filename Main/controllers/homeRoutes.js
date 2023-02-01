const router = require('express').Router();
const { Comment, User, Blog } = require('../models');
const {findAll} = require("../models/User")
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      attributes: [
      'id',
      'post_name',
      'description',
      'created_at'
      ],
      include:[
        {
          model: Comment,  
          attributes: ['id', 'comment', 'blog_id', 'user_id', 'created_at'],
        },
      
        {
        model: User,  
        attributes: ['name'],
      },

    ]
  });
    const blogs = blogData.map(blog => blog.get({plain:true}));

    res.render('homepage', {blogs});
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

router.get('/:id', (req, res) => {
  Blog.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'post_name', 'description', 'created_at'],
    include: [
      {
        model: User,
        attributes: ['name']
      },
      {
        model: Comment,
        attributes: ['id', 'comment', 'blog_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['name']
        }
      }
    ]
  })
    .then(blogData => {
      if (!blogData) {
        res.status(404).json({ message: 'No blog found with this id' });
        return;
      }
      res.json(blogData);
    })
    const blog = blogData.get({plain:true});
    res.render('single-blog', {blog,
      logged_in: req.session.logged_in
  })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});



    
module.exports = router;
