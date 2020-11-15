const express = require("express");
const router = express.Router();
const { Log } = require("../models");


/* CREATE */
router.post('/create', async (req, res) => {
    try {
        const { description, definition, result } = req.body;
        
        let newLog = await Log.create({description, definition, result, owner: req.user.id});
        res.status(200).json({
            log: newLog,
            message: 'Workout Logged!'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Workout Log Failed.'
        });
    }
});

/* GET ALL LOGS FOR USER*/
router.get("/mine", (req, res) => {
    let userid = req.user.id
    Log.findAll({
        where: { owner: userid }
    })
    .then((log) => res.status(200).json(log))
    .catch((err) => 
        res.status(500).json({
            error: err,
        })
    );
});

/* GET LOGS BY ID */
// router.put("/:id")

module.exports = router;