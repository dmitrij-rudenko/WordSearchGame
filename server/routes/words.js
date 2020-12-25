const express = require('express');
const router = express.Router();
const fakeData = require('../utils/fakeData')

function getWord(req, res, next) {
  const result = fakeData[Math.floor(Math.random()*fakeData.length)];
  res.status(200).json({
    status: 'success',
    ...result
  })
}

router.get('/word', getWord);
module.exports = router;
