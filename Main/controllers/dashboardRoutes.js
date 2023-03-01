const router = require('express').Router();
const { User, Blog, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
    Blog.findAll({
     where: {
            user_id: req.session.user_id
          },
      attributes: ['id', 'blog_title', 'blog_text', 'created_at'],
      order: [['created_at', 'DESC']],
      include: [
        {
          model: User,
          attributes: ['username']
        },
        {
          model: Comment,
          attributes: ['id', 'comment', 'blog_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        }
      ]
    })
    .then(blogData =>{
        const blogs = blogData.map(blog => blog.get({plain:true}));

    res.render('dashboard', {blogs, logged_in: true});
  }) 
  .catch (err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/edit/:id', (req, res) => {
    Blog.findOne({
      where: {
        id: req.params.id
      },
      attributes: ['id', 'blog_title', 'blog_text', 'created_at'],
      include: [
        {
          model: User,
          attributes: ['username']
        },
        {
          model: Comment,
          attributes: ['id', 'comment', 'blog_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        }
      ]
    })
      .then(blogData => {
        if (!blogData) {
          res.status(404).json({ message: 'No blog found with this id' });
          return;
        }
        const blogs = blogData.get({plain:true});

    res.render('edit-blog', {blogs, logged_in: req.session.logged_in});
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.get('/new', (req, res) => {
    res.render('new-blog');
  });

  module.exports = router;