const express= require('express');
var passport = require('passport');
const routerRegister = express.Router();
const Details = require('../models/details');
const Customer = require('../models/Customer');
const Employee = require('../models/Employees');
var ObjectID = require('mongoose').Types.ObjectId;
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

module.exports.customerreg=(req,res,next) =>{
    jwt.verify(req.headers['authorization'].split(' ')[1], 'secretkey', (err, authorizedData) => {
        if(err){
            console.log('ERROR: Could not connect to the protected route');
            res.send({success:false,msg:'please log again'});
        } else {
            Customer.findOne({
                email:req.body.email
            },function(err,infor){
                if(infor){
                    return res.json({suceess:false,msg:'email already taken!'})
                }else{
                    Customer.findOne({
                        accountNumber:req.body.accountNumber
                    },function(err,infor){
                        if(infor){
                            return res.json({suceess:false,msg:'account number already taken!!'})
                        }else{
                            Customer.findOne({
                                Id:req.body.id
                            },function(err,infor){
                                if(infor){
                                    return res.json({suceess:false,msg:'id already taken!!'})
                                }else{
                                    var customer = new Customer({
                                        firstname: req.body.fname,
                                        lastname: req.body.lname,
                                        email:req.body.email,
                                        address:req.body.address,
                                        Id:req.body.id,
                                        Tp:req.body.Tp,
                                        address:{
                                            laneone:req.body.laneone,
                                            lanetwo:req.body.lanetwo,
                                            city:req.body.city,
                                            postalcode:parseInt(req.body.postalcode),
                                        },
                                        subarea:req.body.subarea,
                                        accountNumber:req.body.accountNumber,
                                        deviceOne:req.body.deviceOne,
                                        deviceTwo:req.body.deviceTwo,
                                        deviceThird:req.body.deviceThird
                                       
                                    });
                                    customer.save((err,doc)=>{
                                        //console.log(err)
                                        if(!err){
                                          return  res.json({success:true,msg:'successfully inserted'});
                                        }else{
                                            return  res.json({success:false,msg:'ERROR!'});
                                        }
                                    }); 
                                }
                            });
                        }
                    });
                }
            });
             }
        });
 
} 
module.exports.employeereg=(req,res,next)=>{
    jwt.verify(req.headers['authorization'].split(' ')[1], 'secretkey', (err, authorizedData) => {
        if(err){
            console.log('ERROR: Could not connect to the protected route');
            res.send({success:false,msg:'please log again'});
        } else {
            Employee.findOne({
                email:req.body.email
            }).then(function(data){
                if(data){
                    return res.json({success:false,msg:'email already taken'})
                }else{
                    console.log(req.body)
                    Employee.findOne({
                        Id:req.body.Id
                    }).then(function(data){
                        if(data){
                            return res.json({success:false,msg:'Id already taken'})
                        }else{
                            var employee = new Employee({
                                firstname: req.body.firstname,
                                lastname: req.body.lastname,
                                email:req.body.email,
                                Id:req.body.Id,
                                Tp:req.body.Tp,
                                subarea:req.body.subarea,   
                            });
                            employee.save((err,doc)=>{
                                console.log(err)
                                if(!err){
                                   return res.json({success:true ,msg:'successfully inserted'});
                                }
                                else{
                                   return res.json({success:false,msg:'error!'});
                                }
                            });
                        }
                    });
                }
            });
             }
        });
  
} 

module.exports.newadmin=(req,res,next)=>{
    jwt.verify(req.headers['authorization'].split(' ')[1], 'secretkey', (err, authorizedData) => {
        if(err){
            console.log('ERROR: Could not connect to the protected route');
            res.send({success:false,msg:'please log again'});
        } else {
            if(!req.body.lname ||!req.body.fname || !req.body.password || !req.body.email){
                res.json({success:false,msg:'plz pass valid inputs'})
            }else{
                Details.findOne({
                    email:req.body.email
                }).then(function(data){
                    if(data){
                        return res.json({success:false , msg:'email already exists'})
                    }else{
                        var salt = bcrypt.genSaltSync(10);
                        var hash = bcrypt.hashSync(req.body.password, salt);
                        var det = new Details({
                            fname: req.body.fname,
                            lname: req.body.lname,
                            email:req.body.email,
                            password:hash
                           
                        });
                        det.save((err,doc)=>{
                            if(!err){
                               return res.json({success: true , msg :"successfully registerd!"});
                            }
                            else{
                                res.json({success:false,msg:'ERROR!'});
                            }
                        });
                    }
                })
            }  
             }
        });
   
}
module.exports.customerdata=(req,res,next)=>{
    jwt.verify(req.headers['authorization'].split(' ')[1], 'secretkey', (err, authorizedData) => {
        if(err){
            console.log('ERROR: Could not connect to the protected route');
            res.send({success:false , msg:'please log again'});
        } else {
            Customer.find().then(function(details) {
               console.log(details)
                if(!details){
                    return res.json({success:false ,msg:'no customers to display'})
                }else{
                    return res.json({success:true , data:details})
                }
            })
           
             }
        });
  
} 
module.exports.employeedata=(req,res,next)=>{
    jwt.verify(req.headers['authorization'].split(' ')[1], 'secretkey', (err, authorizedData) => {
        if(err){
            console.log('ERROR: Could not connect to the protected route');
            res.send({success:false , msg:'please log again'});
        } else {
            Employee.find().then(function(details) {
                //console.log(details)
                if(!details){
                    return res.json({success:false ,msg:'no employees to display'})
                }else{
                    return res.json({success:true , data:details})
                }
            })
           
             }
        });
  
} //register.removeemployee
module.exports.removeemployee=(req,res,next)=>{
    jwt.verify(req.headers['authorization'].split(' ')[1], 'secretkey', (err, authorizedData) => {
        if(err){
            console.log('ERROR: Could not connect to the protected route');
            res.send({success:false , msg:'please log again'});
        } else {
            Employee.findOneAndDelete({_id:req.params.id}).then(function (err) {
                if(!err){
                    res.send({ success: false, msg: 'not success' });
                }else{
                    res.send({ success: true, msg: 'delete successfully' });
                }
            })
           
             }
        });
  
} //register.removeemployee
module.exports.removecustomer=(req,res,next)=>{
    jwt.verify(req.headers['authorization'].split(' ')[1], 'secretkey', (err, authorizedData) => {
        if(err){
            console.log('ERROR: Could not connect to the protected route');
            res.send({success:false , msg:'please log again'});
        } else {
            Customer.findOneAndDelete({_id:req.params.id}).then(function (err) {
                //console.log(err)
                if(!err){
                    res.send({ success: false, msg: 'not success' });
                }else{
                    res.send({ success: true, msg: 'delete successfully' });
                }
            })
           
             }
        });
  
}//editcustomer
module.exports.editcustomer=(req,res,next)=>{
    jwt.verify(req.headers['authorization'].split(' ')[1], 'secretkey', (err, authorizedData) => {
        if(err){
            console.log('ERROR: Could not connect to the protected route');
            res.send({success:false , msg:'please log again'});
        } else {
            Customer.findOne({_id:req.params.id}).then(function (details) {
                //console.log(details)
                if(!details){
                    res.send({ success: false, msg: 'not success' });
                }else{
                    res.send(details );
                }
            })
           
             }
        });
  
}//editcustomer
module.exports.updatecustomer=(req,res,next)=>{
    jwt.verify(req.headers['authorization'].split(' ')[1], 'secretkey', (err, authorizedData) => {
        if(err){
            console.log('ERROR: Could not connect to the protected route');
            res.send({success:false , msg:'please log again'});
        } else {
            var condition = {_id:req.params.id}
           console.log(req.body)
           Customer.updateOne(condition,req.body).then(doc =>{    
            if(doc){
              return res.json({ success: true, msg:'successfully updated!' });
            }else{
              return res.json({ success: false, msg:'cannot finish your request!!' }); 
            }
        }) 
           
             }
        });
  
}//editcustomer
module.exports.editemployee=(req,res,next)=>{
    jwt.verify(req.headers['authorization'].split(' ')[1], 'secretkey', (err, authorizedData) => {
        if(err){
            console.log('ERROR: Could not connect to the protected route');
            res.send({success:false , msg:'please log again'});
        } else {
            Employee.findOne({_id:req.params.id}).then(function (details) {
                console.log(details)
                if(!details){
                    res.send({ success: false, msg: 'not success' });
                }else{
                    res.send(details);
                }
            })
           
             }
        });
  
}//updateemployee
module.exports.updateemployee=(req,res,next)=>{
    jwt.verify(req.headers['authorization'].split(' ')[1], 'secretkey', (err, authorizedData) => {
        if(err){
            console.log('ERROR: Could not connect to the protected route');
            res.send({success:false , msg:'please log again'});
        } else {
            var condition = {_id:req.params.id}
            Employee.updateOne(condition,req.body).then(doc =>{    
                if(doc){
                  return res.json({ success: true, msg:'successfully updated!' });
                }else{
                  return res.json({ success: false, msg:'cannot finish your request!!' }); 
                }
            })
           
             }
        });
  
}//updateemployee