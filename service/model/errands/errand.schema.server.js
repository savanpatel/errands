
module.exports = function (app, mongoose, logger) {

    var q = require('q');
    var ErrandSchema = require('./errand.schema.server')(app, mongoose);
    var ErrandModel = mongoose.model('Errand', ErrandSchema);

    var api = {
        createErrand: createErrand,
        updateErrand: updateErrand,
        findErrandById: findErrandById,
        findErrandByUserId:findErrandByUserId,
        findErrandByServiceManId:findErrandByServiceManId,
        findErrandByStatus:findErrandByStatus,
        findErrandByZip:findErrandByZip
    };

    return api;

    function createErrand(errand) {

        var deferred = q.defer();

        ErrandModel.create(errand, function (err, dbErrand) {

            if (err) {
                logger.error('Unable to create errand.');
                deferred.reject(err);
            } else {
                deferred.resolve(dbErrand);
            }
        });

        return deferred.promise;
    }

    function updateErrand(errandId, errand) {

        var deferred = q.defer();
        ErrandModel.findById(userId, function (err, dbErrand) {

            if (err) {
                logger.error('Unable to find errand.' + err);
                deferred.reject(err);
            } else {
                user.password = dbUser.password;
                ErrandModel.update({_id:userId},{$set:user}, function (err, dbErrand) {
                    if(err) {
                        logger.error("Can not update errand with id " + errandId  + " Error: " + err);
                        deferred.reject(err);
                    }
                    else {
                        deferred.resolve(dbErrand);
                    }
                });
            }
        });


        return deferred.promise;
    }

    function findErrandById(errandId) {

        var deferred = q.defer();

        ErrandModel.findById(errandId, function (err, dbErrand) {

            if(err){
                logger.error('Unable to find errand.' + err);
                deferred.reject(err);
            } else {
                deferred.resolve(dbErrand);
            }
        });

        return deferred.promise;
    }

    function findErrandByUserId(userId) {

        var deferred = q.defer();

        ErrandModel.find({"userId":userId}, function (err, dbErrand) {

            if(err){
                logger.error('Unable to find errand.' + err);
                deferred.reject(err);
            } else {
                deferred.resolve(dbErrand);
            }
        });

        return deferred.promise;
    }

    function findErrandByServiceManId(serviceManId) {
        var deferred = q.defer();

        ErrandModel.find({"serviceManId":serviceManId}, function (err, dbErrand) {

            if(err){
                logger.error('Unable to find errand.' + err);
                deferred.reject(err);
            } else {
                deferred.resolve(dbErrand);
            }
        });

        return deferred.promise;
    }

    function findErrandByStatus(status) {
        var deferred = q.defer();

        ErrandModel.find({"status":status}, function (err, dbErrand) {

            if(err){
                logger.error('Unable to find errand.' + err);
                deferred.reject(err);
            } else {
                deferred.resolve(dbErrand);
            }
        });

        return deferred.promise;
    }

    function findErrandByZip(zip) {
        var deferred = q.defer();

        ErrandModel.find({"zip":zip}, function (err, dbErrand) {

            if(err){
                logger.error('Unable to find errand.' + err);
                deferred.reject(err);
            } else {
                deferred.resolve(dbErrand);
            }
        });

        return deferred.promise;
    }
};