const router = require('express').Router();
const User = require('../model/User');
const verify = require ('./verifyToken');

router.get('/', verify, (req, res) => {
    res.send(req.user);
//     res.json({
//         posts: {
//             title: 'first post',
//             description: 'random data you should not access'
//         }
//     })
});

module.exports = router;