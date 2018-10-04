var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var UserPaymentSchema=new Schema({
    Transaction_id:{type: String ,unique: true,index: true},
    ReceivedAmount:{type: String, index: true},
    Receiver_msisdn:{type: String, index: true},
    createdAt: {type: Date, index: true,default: Date.now},   
});

module.exports=mongoose.model('UserPayment',UserPaymentSchema);