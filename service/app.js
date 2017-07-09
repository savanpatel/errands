
/**
 * Created by savan on 21/2/17.
 */
module.exports = function(app, mongooseAPI, passport) {
    require("./services/user.service.server.js")(app, mongooseAPI, passport);
};