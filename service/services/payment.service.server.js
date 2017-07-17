module.exports = function (app, mongooseAPI, passport) {

    //TODO: integrate auth later.
    var auth = authorized;

    app.post("/api/payment", createPayment);
    app.get("/api/payment/:paymentId", findPaymentById);
    app.get("/api/payment/user/:userId", findPaymentByUserId);
    app.get("/api/payment/errand/:errandId", findPaymentByErrandId);
    app.get("/api/payment/serviceMan/:serviceManId", findPaymentByServiceManId);
    app.get("/api/payment/status", findPaymentByStatus);
    
    var PaymentModel = mongooseAPI.paymentModelAPI;
    
    /*Passport related functions*/

    function authorized (req, res, next) {

        if (!req.isAuthenticated()) {
            res.sendStatus(401);
        } else {
            next();
        }
    }

    function createPayment(req, res) {

        var payment = req.body;

        if(null == payment){
            req.sendStatus(500).send("null/empty payment");
            return;
        }

        PaymentModel.createPayment(payment)
            .then(function (dbPayment) {
                if (!dbPayment) {
                    res.send(dbPayment);
                }
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function findPaymentById(req, res) {

        var paymentId = req.params.paymentId;

        if(paymentId == null){
            res.sendStatus(500).send("null payment id.");
            return;
        }

        PaymentModel.findPaymentById(paymentId)
            .then(function (payment) {

                if(null == payment){
                    res.send(404);
                }else {
                    res.send(payment);
                }
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function findPaymentByUserId(req, res) {
        var userId = req.params.userId;

        if (!userId) {
            res.sendStatus(500).send("null user id.");
            return;
        }

        PaymentModel.findPaymentByUserId(userId)
            .then(function (payment) {
                if(!payment) {
                    res.sendStatus(404);
                } else {
                    res.send(payment);
                }
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function findPaymentByServiceManId(req, res) {
        var serviceManId = req.params.serviceManId;

        if (!serviceManId) {
            res.sendStatus(500).send("null serviceMan id.");
            return;
        }

        PaymentModel.findPaymentByServiceManId(serviceManId)
            .then(function (payment) {
                if(!payment) {
                    res.sendStatus(404);
                } else {
                    res.send(payment);
                }
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function findPaymentByErrandId(req, res) {
        var errandId = req.params.errandId;

        if (!errandId) {
            res.sendStatus(500).send("null errand id.");
            return;
        }

        PaymentModel.findPaymentByErrandIdId(errandId)
            .then(function (payment) {
                if(!payment) {
                    res.sendStatus(404);
                } else {
                    res.send(payment);
                }
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function findPaymentByStatus(req, res) {
        var queryParams = req.query;
        var status = queryParams.status;

        if (!status) {
            res.sendStatus(500).send("null status");
        }

        PaymentModel.findPaymentByStatus(status)
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