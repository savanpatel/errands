module.exports = function (app, mongooseAPI, passport) {

    //TODO: integrate auth later.
    var auth = authorized;

    app.post("/api/errand", createErrand);
    app.get("/api/errand/:errandId", findErrandById);
    app.get("/api/errand/user/:userId", findErrandByUserId);
    app.get("/api/errand/serviceman/:serviceManId", findErrandByServiceManId);
    app.get("/api/errand/zip/:zipId", findErrandByZip);
    app.get("/api/errand/status/", findErrandByStatus);

    var ErrandModel = mongooseAPI.errandModelAPI;

    /*Passport related functions*/

    function authorized (req, res, next) {

        if (!req.isAuthenticated()) {
            res.sendStatus(401);
        } else {
            next();
        }
    }

    function createErrand(req, res) {

        var errand = req.body;
        if (null == errand) {
            req.sendStatus(500).send("null/empty user");
            return;
        }

        ErrandModel.createErrand(errand)
            .then(function (dbErrand) {
                if (!dbErrand) {
                    res.send(dbErrand);
                }
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function findErrandById(req, res) {

        var errandId = req.params.errandId;
        if (errandId == null) {
            res.sendStatus(500).send("null errandId.");
            return;
        }

        ErrandModel.findErrandById(errandId)
            .then(function (errand) {
                if(null == errand){
                    res.sendStatus(404);
                }else {
                    res.send(errand);
                }
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function findErrandByUserId(req, res) {
        var userId = req.params.userId;
        if (!userId) {
            res.sendStatus(500).send("null user id.");
            return;
        }

        ErrandModel.findErrandByUserId(userId)
            .then(function (errand) {
                if(!errand) {
                    res.sendStatus(404);
                } else {
                    res.send(errand);
                }
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function findErrandByServiceManId(req, res) {
        var serviceManId = req.params.serviceManId;

        if (!serviceManId) {
            res.sendStatus(500).send("null service man id.");
            return;
        }

        ErrandModel.findErrandByServiceManId(serviceManId)
            .then(function (errand) {
                if(!errand) {
                    res.sendStatus(404);
                } else {
                    res.send(errand);
                }
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function findErrandByZip(req, res) {
        var zip = req.params.zip;

        if (!zip) {
            res.sendStatus(500).send("null zip.");
            return;
        }

        ErrandModel.findErrandByZip(zip)
            .then(function (errand) {
                if(!errand) {
                    res.sendStatus(404);
                } else {
                    res.send(errand);
                }
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function findErrandByStatus(req, res) {
        var queryParams = req.query;
        var status = queryParams.status;

        if (!status) {
            res.sendStatus(500).send("null status");
        }

        ErrandModel.findErrandByStatus(status)
            .then(function (errand) {
                if (!errand) {
                    res.sendStatus(404);
                } else {
                    res.send(errand)
                }
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }
};