module.exports = function (app, mongooseAPI, passport) {

    //TODO: integrate auth later.
    var auth = authorized;

    app.post("/api/message", createMessage);
    app.get("/api/message/:messageId", findMessageById);
    app.get("/api/message/sender/:senderId", findMessageBySenderId);
    app.get("/api/message/receiver/:receiverId", findMessageByReceiverId);
    app.get("/api/message/errand/:errandId", findMessageByErrandId);

    var MessageModel = mongooseAPI.messageModelAPI;


    /*Passport related functions*/

    function authorized (req, res, next) {

        if (!req.isAuthenticated()) {
            res.sendStatus(401);
        } else {
            next();
        }
    }

    function createMessage(req, res) {

        var message = req.body;

        if(null == message){
            req.sendStatus(500).send("null/empty message");
            return;
        }

        MessageModel.createMessage(message)
            .then(function (dbMessage) {
                if (!dbMessage) {
                    res.send(dbMessage);
                }
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function findMessageById(req, res) {

        var messageId = req.params.messageId;

        if(messageId == null){
            res.sendStatus(500).send("null messageId.");
            return;
        }

        MessageModel.findMessageById(messageId)
            .then(function (message) {

                if(null == message){
                    res.send(404);
                }else {
                    res.send(message);
                }
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function findMessageBySenderId(req, res) {
        var senderId = req.params.senderId;

        if (!senderId) {
            res.sendStatus(500).send("null sender id.");
            return;
        }

        MessageModel.findMessageBySenderId(senderId)
            .then(function (message) {
                if(!message) {
                    res.sendStatus(404);
                } else {
                    res.send(message);
                }
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function findMessageByReceiverId(req, res) {
        var receiverId = req.params.receiverId;

        if (!receiverId) {
            res.sendStatus(500).send("null receiver id.");
            return;
        }

        MessageModel.findMessageByReceiverIdId(receiverId)
            .then(function (message) {
                if(!message) {
                    res.sendStatus(404);
                } else {
                    res.send(message);
                }
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function findMessageByErrandId(req, res) {
        var errandId = req.params.errandId;

        if (!errandId) {
            res.sendStatus(500).send("null errand id.");
            return;
        }

        MessageModel.findMessageByErrandIdId(errandId)
            .then(function (message) {
                if(!message) {
                    res.sendStatus(404);
                } else {
                    res.send(message);
                }
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

};