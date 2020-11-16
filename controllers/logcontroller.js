const express = require("express");
const router = express.Router();
const { Log } = require("../models");



/* CREATE */
router.post('/', async (req, res) => {
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
router.get("/", (req, res) => {
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

/* GET USER LOGS BY LOG ID FOR LOGGED IN USER */
router.get("/:id", (req, res) => {
    const userid = req.user.id
    const logId = req.params.id

    Log.findOne({ where: { owner: userid, id: logId }
    })
        .then((log) => res.status(200).json({
            specificLog: log
        }))
        .catch((err) => res.status(500).json({ 
            error: err,
            message: "These Aint Yours!"
        }));
   
});

/* UPDATE LOGS BY USER ID */
router.put("/:id", (req, res) => {
   const query = {where: {id: req.params.id, owner: req.user.id}};

    Log.update(req.body, query)
        .then((logUpdated) => {
            Log.findOne(query)
                .then((locatedUpdatedLog) => {
                    res.status(200).json({
                        log: locatedUpdatedLog,
                        logChanged: logUpdated,
                    });
                });
        })
        .catch((err) => res.json(err));
});

/* DELETE */
router.delete("/:id", (req, res) => {
    const query = {where: {id: req.params.id, owner: req.user.id}};
    Log.destroy(query)
        .then((log) => res.status(200).json({
            log: log,
        }))
        .catch((err) => res.json({error: err}));
});

module.exports = router;