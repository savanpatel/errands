module.exports = function (app, mongoose) {

    var UserSchema = mongoose.Schema({

        username:{type:String, required:true},

        password:{type:String},

        firstName:{type:String, required:true},

        lastName:{type:String},

        email:{type:String, required:true},

        is_deleted:{type:Boolean,required:true,default:false},

        address:{type:String},

        contact:{type:Number},

        zip: {type:Number}
    });

    return UserSchema;
};