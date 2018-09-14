const express = require('express');
const md5 = require('md5');
const router = express.Router();
var User=require('../Models/user.js'); //including model
// var UserBooks=require('../Models/user-book.js'); //including model
var jwt = require('jsonwebtoken');
var mv = require('mv');  //its for chokidar
var path= require('path');
var async = require("async");
var datetime = require('node-datetime');
const maindata=require('../test.json');
var base64ToImage = require('base64-to-image');

//for api
router.post('/login',function(req,res){
     var query=User.findOne({ email:req.body.username,password:md5(req.body.password) });
     query.exec().then((userdata)=>{

      if (!userdata) {
        res.status(201).json({ auth:false,result: userdata });
      }
      else
      {
         var token = jwt.sign({ id: userdata._id },'supersecret', {
          expiresIn: 86400 // expires in 24 hours
        });
         var obj={};
         obj._id=userdata._id;
         obj.Name=userdata.Name;
         obj.email=userdata.email;
         obj.profileurl=userdata.profileurl;
         res.status(200).json({ auth:true,result:obj ,token:token, token_expire_on:'86400' });
      }

     }).catch((err)=>{

      res.status(400).json({ error: err });

     });
    
});

router.post('/genratetoken',function(req,res){

  var userid=req.body.userid;
  if(userid)
  {
    var token = jwt.sign({ id: userid },'supersecret', {
          expiresIn: 86400 // expires in 24 hours
        });
         res.status(200).json({ status:true,token:token, token_expire_on:'86400' });
  }
  else
  {
      res.status(201).json({ status:false,token:'' });
  }

});

router.post('/register',function(req,res){
  console.log(req.body);

  //var profilepic=req.files.profilepic;
  var name=req.body.name;
  var email=req.body.email;
  var pwd=req.body.password;
//  var destination=path.join('public/uploads/'+req.files.profilepic.name);
//   profilepic.mv(destination, function(err) {
//     if (err)
//       return  res.status(500).json({ status:false,data:err});
      var newuser=new User();
      newuser.Name=req.body.name;
      newuser.email=req.body.email;
      newuser.password=md5(req.body.password);
      //newuser.profileurl=req.files.profilepic.name;
      newuser.save().then((results)=>{
          res.status(200).json({ status:true,data:results });  
        }).catch((err)=>{
          res.status(201).json({ status:false,data:err });
        });
 // });

});

/*single file upload*/
router.post('/fileupload',function(req,res){
  var profilepic=req.files.profilepic;
 
 var destination=path.join('public/uploads/'+req.files.profilepic.name);
  profilepic.mv(destination, function(err) {
    if (err)
      return  res.status(500).json({ status:false,data:err});
      
          res.status(200).json({ status:true,data:'' });  
       
  });

});

/* get profile image file*/
router.get('/profilepicture', function(req, res){
    res.sendFile(req.query.profilepic, {
        root: path.join('public/uploads/'),
        headers: {'Content-Type': 'image/*'}
    }, function (err) {
        if (err) {
            console.log(err);
        }
    });
});

/* Update profile picture base64 to image conversion */
router.post('/fileupdate', function(req, res){
  var userid=req.body.userid;
  var base64Str = req.body.profilepic;
  var path1 =path.join('public/uploads/');
  //var optionalObj = {'fileName': 'imageFileName', 'type':'png'};  
  var imageInfo = base64ToImage(base64Str,path1); 
  //console.log(imageInfo);
  //output=> {imageType: "png", fileName: "img-1524813918206.png"}
  var query = User.findOneAndUpdate({_id:userid},{$set: {profileurl:imageInfo.fileName}},{new: true});
   query.exec().then((results)=> {

     res.status(200).json({ status:true,data:results}); 
    }).catch((err)=>{

     res.status(201).json({ status:false,data:''}); 
    });

  
});


router.get('/myjson',function(req,res){
    var arr1=[];
    async.forEachOf(maindata, function (value, key, callback) {
             var configs=[];
                console.log(value);
                console.log(key);
                var pastDateTime = datetime.create(value.timestamp);
                 configs.push(pastDateTime.now());
                 configs.push(value.qty);
                 configs.push(value.price);
              
                arr1.push(configs);

                callback(null);

          }, function (err) {
              if (err){
                 res.status(201).json({ status:false,data:err }); 
              }
              else
              {   

                  res.status(200).json(arr1); 
              }
          });
});

module.exports = router;
