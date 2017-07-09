module.exports = function (app, mongoose) {

    var ErrandSchema = mongoose.Schema({

        title:{type:String, required:true},

        notes:{type:String},

        price:{type:Number, required:true},

        date:{type:String},

        userId:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},

        serviceManId:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},

        status:{type:String, enum:["NEW", "INPROGRESS", "DONE"], default:"NEW"}
    });

    return ErrandSchema;
};