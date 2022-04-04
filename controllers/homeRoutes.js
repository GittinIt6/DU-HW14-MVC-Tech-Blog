const router = require('express').Router();
const { Post, User } = require('../models');
// let title = { name: "The Tech Blog"};
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

    // Pass serialized data and session flag into template
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
    // const queryOneData = await ModelOne.findAll();
    // const ContentData = {
    //   "id": queryOneData[0].dataValues.id,
    //   "content": queryOneData[0].dataValues.content,
    // };

    // const queryTwoData = await ModelTwo.findAll();
    // const subContentData = {
    //   "id": queryTwoData[0].dataValues.id,
    //   "SubContent": queryTwoData[0].dataValues.SubContent,
    //   "one_id": queryTwoData[0].dataValues.one_id,
    // };
    if (req.session.logged_in === true) {
      const currentUserData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Post }],
      });
  
      const user = currentUserData.get({ plain: true });
  
      res.render('profile', {
        ...user,
        logged_in: true,
        title: "Your Dashboard"
      });
    }

    else {
      res.render('profile', {
        logged_in: false,
        title: "Your Dashboard"
      });
    }


    // res.render('profile', { 
    //   // ContentData, 
    //   currentUserData,
    //   logged_in: req.session.logged_in,
    //   title: "Your Dashboard" 
    // });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/newpost', async (req, res) => {
  try {
    res.render('newpost', { 
      // ContentData, 
      // subContentData,
      logged_in: req.session.logged_in,
      title: "Your Dashboard" 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

