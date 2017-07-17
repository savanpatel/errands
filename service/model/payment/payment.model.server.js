module.exports = function (app, mongoose) {

    var PaymentSchema = mongoose.Schema({

        errandId:{type: mongoose.Schema.Types.ObjectId, ref: 'Errand'},

        value:{type: Number},

        currency:{type:String},

        userId:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},

        serviceManId:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},

        status:{type:String, enum:["PAID", "UNPAID"], default:"PAID"},

        paymentMode: {type:String, enum:["VENMO", "CASH"]},

        creationDate: {type:Date, default:now}
    });

    return PaymentSchema;
};