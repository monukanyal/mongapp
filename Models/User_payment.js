var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var UserPaymentSchema=new Schema({
    Transaction_id:{type: String ,index: true},
    ReceivedAmount:{type: String, index: true},
    createdAt: {type: Date, index: true,default: Date.now},   
});

module.exports=mongoose.model('UserPayment',UserPaymentSchema);