const router = require('express').Router();
const { Userinfo } = require('../models');
const { User } = require('../models');

User.hasOne(Userinfo);
Userinfo.belongsTo(User);

router.post('/', function (req, res){
    Userinfo.create({
        dateOfBirth: req.body,
        age: req.body,
        heightInInches: req.body,
        weightInPounds: req.body,
        goal: req.body
    })
});

router.delete("/", (req, res) => {
    const query = {where: {id: req.params.id, owner: req.user.id}};
    Userinfo.destroy(query)
        .then((userinfo) => res.status(200).json({
            userinfo: userinfo,
        }))
        .catch((err) => res.json({error: err}));
})

module.exports = router;