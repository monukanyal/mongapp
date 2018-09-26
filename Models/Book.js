var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var BookSchema=new Schema({
    Title:{type: String, unique: true,index: true},
    Author:{type: String ,index: true},
    Category:{type: String, index: true},
    Description:{type:String,index:true},
    Bookmeta:{type:Schema.Types.ObjectId, ref: 'Bookmeta'},
    createdAt: {type: Date, index: true,default: Date.now},   
});

module.exports=mongoose.model('Book',BookSchema);
