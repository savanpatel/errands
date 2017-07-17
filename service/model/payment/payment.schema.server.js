
module.exports = function (app, mongoose, logger) {

    var q = require('q');
    var PaymentSchema = require('./payment.schema.server')(app, mongoose);
    var PaymentModel = mongoose.model('Payment', PaymentSchema);

    var api = {
        createPayment: createPayment,
        updatePayment: updatePayment,
        findPaymentById: findPaymentById,
        findPaymentByErrandId: findPaymentByErrandId,
        findPaymentByUserId: findPaymentByUserId,
        findPaymentByStatus: findPaymentByStatus,
        findPaymentByServiceManId: findPaymentByServiceManId
    };

    return api;

    function createPayment(payment) {

        var deferred = q.defer();

        PaymentModel.create(payment, function (err, dbPayment) {

            if (err) {
                logger.error('Unable to create payment.');
                deferred.reject(err);
            } else {
                deferred.resolve(dbPayment);
            }
        });

        return deferred.promise;
    }

    function updatePayment(paymentId,  payment) {
        var deferred = q.defer();
        PaymentModel.findById(paymentId, function (err, dbPayment) {

            if (err) {
                logger.error('Unable to find  payment.' + err);
                deferred.reject(err);
            } else {
                PaymentModel.update({_id:paymentId},{$set:payment}, function (err, dbPayment) {
                    if(err) {
                        logger.error("Can not update  payment with id " +  paymentId  + " Error: " + err);
                        deferred.reject(err);
                    }
                    else {
                        deferred.resolve(dbPayment);
                    }
                });
            }
        });

        return deferred.promise;
    }

    function findPaymentById(paymentId) {
        var deferred = q.defer();
        PaymentModel.findById(paymentId, function (err, dbPayment) {
            if(err){
                logger.error('Unable to find  payment.' + err);
                deferred.reject(err);
            } else {
                deferred.resolve(dbPayment);
            }
        });

        return deferred.promise;
    }

    function findPaymentByUserId(userId) {

        var deferred = q.defer();

        PaymentModel.find({"userId":userId}, function (err, dbPayment) {

            if(err) {
                logger.error('Unable to find  payment.' + err);
                deferred.reject(err);
            } else {
                deferred.resolve(dbPayment);
            }
        });

        return deferred.promise;
    }

    function findPaymentByServiceManId(serviceManId) {
        var deferred = q.defer();

        PaymentModel.find({"serviceManId":serviceManId}, function (err, dbPayment) {
            if(err){
                logger.error('Unable to find  payment.' + err);
                deferred.reject(err);
            } else {
                deferred.resolve(dbPayment);
            }
        });

        return deferred.promise;
    }

    function findPaymentByErrandId(errandId) {
        var deferred = q.defer();

        PaymentModel.find({"errandId":errandId}, function (err, dbPayment) {

            if(err){
                logger.error('Unable to find  payment.' + err);
                deferred.reject(err);
            } else {
                deferred.resolve(dbPayment);
            }
        });

        return deferred.promise;
    }

    function findPaymentByStatus(status) {
        var deferred = q.defer();

        PaymentModel.fin({"status": status}, function (err, dbPayment) {
            if (err) {
                logger.error('Unable to find payment for status.' + err);
                deferred.reject(err);
            } else {
                deferred.resolve(dbPayment);
            }
        });
    }
};