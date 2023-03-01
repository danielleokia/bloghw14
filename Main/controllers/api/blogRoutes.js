const router = require('express').Router();
const { Blog, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//get all blogs
router.get('/', (req, res) => {
    Blog.findAll({
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
    .then(blogData => res.json(blogData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

//get one blog
router.get('/:id', (req, res) => {
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
        res.json(blogData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });


router.post('/', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.create({
      user_id: req.session.user_id,
      blog_text: req.body.blog_text,
      blog_title: req.body.blog_title
    });

    res.status(200).json(blogData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
    try {
        const blogData = await Blog.update({
          blog_text: req.body.blog_text,
          blog_title: req.body.blog_title
        },
        {
          where: {
            id: req.params.id
          }
        })
    
        res.status(200).json(blogData);
      } catch (err) {
        res.status(400).json(err);
      }
});



router.delete('/:id', async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogData) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
