module.exports = function (app) {


    var connectionString = 'mongodb://127.0.0.1:27017/test';

    var mongoose = require("mongoose");
    mongoose.connect(connectionString);

    var logger = require('../logger/logger.server')(app);

    require('./user/user.schema.server')(app, mongoose);
    var userModelAPI = require('./user/user.model.server')(app, mongoose, logger);

    require('./message/message.schema.server')(app, mongoose);
    var messageModelAPI = require('./message/message.model.server')(app, mongoose, logger);

    require('./errands/errand.schema.server')(app, mongoose);
    var errandModelAPI = require('./errands/errand.model.server')(app, mongoose, logger);

    var api = {
        userModelAPI : userModelAPI,
        messageModelAPI: messageModelAPI,
        errandModelAPI:errandModelAPI
    };
    return api;
};