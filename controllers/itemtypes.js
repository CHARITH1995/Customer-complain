const express = require('express');
var passport = require('passport');
const routerComplain = express.Router();
var ObjectID = require('mongoose').Types.ObjectId;
const Stores = require('../models/stores');
const Items = require('../models/itemtypes');
const Stock = require('../models/stock');
var jwt = require('jsonwebtoken');


module.exports.additemtype = (req, res, next) => {
    jwt.verify(req.headers['authorization'].split(' ')[1], 'secretkey', (err, authorizedData) => {
        if (err) {
            console.log('ERROR: Could not connect to the protected route');
            res.send({ success: false, msg: 'please log again' });
        } else {
            Items.findOne({
                name: req.body.name
            }).then(function (doc) {
                if (doc) {
                    return res.json({success: false, msg: 'Item type already exists!' })
                } else {
                    Items.findOne({
                        identifier: req.body.identifier
                    }).then(function (doc) {
                        if (doc) {
                            return res.json({ success: false, msg: 'Please select another color!' })
                        } else {
                            var det = new Items({
                                name: req.body.name,
                                identifier: req.body.identifier,
                                date: Date.now()
                            });
                            det.save((err, doc) => {
                                if (!err) {
                                    return res.json({ success: true, msg: 'new Item type inserted!!' })
                                }
                                else {
                                    return res.json({ success: false, msg: 'ERROR!!' })
                                }
                            })
                        }

                    })
                }
            })
        }
    });
}
module.exports.itemtypes = (req, res, next) => {    // show item types 
    jwt.verify(req.headers['authorization'].split(' ')[1], 'secretkey', (err, authorizedData) => {
        if (err) {
            console.log('ERROR: Could not connect to the protected route');
            res.send({ success: false, msg: 'please log again' });
        } else {
            Items.find().then(function (details) {
                if (details.length == 0) {
                    res.send({ success: false, msg: 'no Items Types' });
                } else {
                    res.send({ success: true, data:details });
                }
            })

        }
    });
}
module.exports.removeitemtypes = (req, res, next) => {
    jwt.verify(req.headers['authorization'].split(' ')[1], 'secretkey', (err, authorizedData) => {
        if (err) {
            console.log('ERROR: Could not connect to the protected route');
            res.send({ success: false, msg: 'please log again' });
        } else {
            Items.findOne({
                _id:req.params.id
            }).then(data=>{
                Stores.findOne({
                    item:data.name
                }).then(docs=>{
                    if(docs == null){                   
                        Items.findOneAndDelete({ _id: req.params.id }).then(function (err) {
                            if (!err) {
                                res.send({ success: false, msg: 'not success' });
                            } else {
                                Stock.find({
                                    item:data.name
                                }).then(function(detail){
                                    if(detail.length >0){
                                        detail.map(d=>{
                                            Stock.findOneAndDelete({item:d.item}).then(function(dt){
                                                if(dt){    
                                                   return  res.send({ success: true, msg: 'delete successfully' });
                                                }else{
                                                    return res.json({success:false,msg:'delete not complete'})
                                                }
                                            })
                                        })
                                    }else{
                                        return  res.send({ success: true, msg: 'delete successfully' });
                                    }
                                })
                            }
                        })
                    }else{
                        return res.json({success:false , msg:'This item already in store'})
                    }
                })
            })
        }
    });

}