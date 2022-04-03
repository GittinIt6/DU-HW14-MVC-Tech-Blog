const router = require('express').Router();
const { Project, User } = require('../models');
// let title = { name: "The Tech Blog"};
router.get('/', async (req, res) => {
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

    // res.render('content', { 
    //   ContentData, 
    //   subContentData 
    // });
    res.render('homepage', {
      logged_in: req.session.logged_in,
      title: "The Tech Blog"
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', async (req, res) => {
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

    res.render('login', { 
      // ContentData, 
      // subContentData,
      logged_in: req.session.logged_in,
      title: "The Tech Blog" 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/signup', async (req, res) => {
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

    res.render('signup', { 
      // ContentData, 
      // subContentData,
      logged_in: req.session.logged_in,
      title: "The Tech Blog" 
    });
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

    res.render('profile', { 
      // ContentData, 
      // subContentData,
      logged_in: req.session.logged_in,
      title: "Your Dashboard" 
    });
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

