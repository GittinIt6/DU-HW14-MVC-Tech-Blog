const router = require('express').Router();
const { Post, User, Comment } = require('../models');
router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    // Pass data into view
    res.render('homepage', { 
      posts, 
      logged_in: req.session.logged_in,
      title: "The Tech Blog"
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', async (req, res) => {
  try {
  // If the user is already logged in, redirect the request to /profile
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }
  
  else {
    res.render('login', { 
      title: "The Tech Blog" 
    });
  }

  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/signup', async (req, res) => {
  try {
    // If the user is already logged in, redirect the request to /profile
    if (req.session.logged_in) {
      res.redirect('/profile');
      return;
    }
    
    else {
      res.render('signup', { 
        title: "The Tech Blog" 
      });
    }
  
    } catch (err) {
      res.status(500).json(err);
    }
  });


router.get('/profile', async (req, res) => {
  try {
    if (req.session.logged_in === true) {
      const currentUserData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Post }],
      });

      const postData = await Post.findAll({
        where: { user_id: req.session.user_id },
        include: [
          {
            model: User,
            attributes: ['name'],
          },
        ],
      });
  
      // Serialize data so the template can read it
      const posts = postData.map((post) => post.get({ plain: true }));
  
      const user = currentUserData.get({ plain: true });
  
      res.render('profile', {
        ...user,
        posts,
        logged_in: true,
        title: "Your Dashboard"
      });
    }

    else {
      res.render('login', {
        title: "The Tech Blog"
      });
    }

  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/newpost', async (req, res) => {
  try {
    const currentUserData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      // include: [{ model: Post }],
    });
    const user = currentUserData.get({ plain: true });
    res.render('newpost', { 
      // ContentData, 
      ...user,
      logged_in: req.session.logged_in,
      title: "Your Dashboard" 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/post/:id', async (req, res) => {
  try {
    // Get all projects with user data
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          attributes: ['commentText', 'user_id', 'createdAt'],
          include: [
            {
              model: User,
              attributes: ['name'],
            },]
        },
      ],
    });
    let user;
    if (req.session.logged_in === true) {
      const currentUserData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
      });
      user = currentUserData.get({ plain: true });
    }; 
    // Serialize data so the template can read it
    const posts = postData.get({ plain: true });
    let commentAry = [];
    commentAry.push(posts.comments);
    // Pass data to view
    res.render('postdetail', { 
      ...user,
      posts,
      commentAry, 
      logged_in: req.session.logged_in,
      title: "The Tech Blog"
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

