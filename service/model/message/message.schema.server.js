
module.exports = function (app, mongoose, logger) {

    var q = require('q');
    var MessageSchema = require('./ message.schema.server')(app, mongoose);
    var MessageModel = mongoose.model('Message', MessageSchema);

    var api = {
        createMessage: createMessage,
        updateMessage: updateMessage,
        findMessageById: findMessageById,
        findMessageBySenderId:findMessageBySenderId,
        findMessageByReceiverId:findMessageByReceiverId,
        findMessageByErrandId:findMessageByErrandId
    };

    return api;

    function createMessage(message) {

        var deferred = q.defer();

        MessageModel.create(message, function (err, dbMessage) {

            if (err) {
                logger.error('Unable to create message.');
                deferred.reject(err);
            } else {
                deferred.resolve(dbMessage);
            }
        });

        return deferred.promise;
    }

    function updateMessage(messageId,  message) {
        var deferred = q.defer();
        MessageModel.findById(messageId, function (err, dbMessage) {

            if (err) {
                logger.error('Unable to find  message.' + err);
                deferred.reject(err);
            } else {
                MessageModel.update({_id:messageId},{$set:message}, function (err, dbMessage) {
                    if(err) {
                        logger.error("Can not update  message with id " +  messageId  + " Error: " + err);
                        deferred.reject(err);
                    }
                    else {
                        deferred.resolve(dbMessage);
                    }
                });
            }
        });

        return deferred.promise;
    }

    function findMessageById(messageId) {
        var deferred = q.defer();
        MessageModel.findById(messageId, function (err, dbMessage) {

            if(err){
                logger.error('Unable to find  message.' + err);
                deferred.reject(err);
            } else {
                deferred.resolve(dbMessage);
            }
        });

        return deferred.promise;
    }

    function findMessageBySenderId(senderId) {

        var deferred = q.defer();

        MessageModel.find({"senderId":senderId}, function (err, dbMessage) {

            if(err){
                logger.error('Unable to find  message.' + err);
                deferred.reject(err);
            } else {
                deferred.resolve(dbMessage);
            }
        });

        return deferred.promise;
    }

    function findMessageByReceiverId(receiverId) {
        var deferred = q.defer();

        MessageModel.find({"receiverId":receiverId}, function (err, dbMessage) {

            if(err){
                logger.error('Unable to find  message.' + err);
                deferred.reject(err);
            } else {
                deferred.resolve(dbMessage);
            }
        });

        return deferred.promise;
    }

    function findMessageByErrandId(errandId) {
        var deferred = q.defer();

        MessageModel.find({"errandId":errandId}, function (err, dbMessage) {

            if(err){
                logger.error('Unable to find  message.' + err);
                deferred.reject(err);
            } else {
                deferred.resolve(dbMessage);
            }
        });

        return deferred.promise;
    }
};