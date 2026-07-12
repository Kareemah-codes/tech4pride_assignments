const router = require('express').Router();

router.get('/', (req, res) => {
  res.status(200).json({
    status: true,
    message: 'Here are all of the admin users!'
  });
});

module.exports = router
