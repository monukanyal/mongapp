var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var BookSchema=new Schema({
    Title:{type: String, unique: true,index: true},
    Author:{type: String ,index: true},
    Category:{type: String, index: true},
    createdAt: {type: Date, index: true,default: Date.now},
    Bookmeta:{type:Schema.Types.ObjectId, ref: 'Bookmeta'},
    User:{type:Schema.Types.ObjectId, ref: 'User'}
       
});

module.exports=mongoose.model('Book',BookSchema);
