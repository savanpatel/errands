module.exports = function (app, mongoose) {

    var MessageSchema = mongoose.Schema({

        text:{type:String, required:true},

        senderId:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},

        receiverId:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},

        errandId:{type: mongoose.Schema.Types.ObjectId, ref: 'Errand'},

        creationDate: {type:Date, default:now}
    });

    return MessageSchema;
};