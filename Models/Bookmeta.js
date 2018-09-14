var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var BookmetaSchema=new Schema({
    bookcover1:{type: String ,index: true},
    bookcover2:{type: String, index: true},
    description:{type: String, index: true},
   	createdAt: {type: Date, index: true,default: Date.now}
});

module.exports=mongoose.model('Bookmeta',BookmetaSchema);
