const express = require('express');
const router = express.Router();
var jwt = require('jsonwebtoken');
const jwtHelper = require('../config/jwtHelper');
const user = require('../controllers/user');
const register = require('../controllers/register');
const complain = require('../controllers/complains');
const purch = require('../controllers/purchases');
const store = require('../controllers/stores');
const reports = require('../controllers/reports');
const items = require('../controllers/itemtypes');
const stock = require('../controllers/stock');



router.post('/log',user.log);
router.post('/editprofile',jwtHelper.verifyJwtToken,user.editdetail);
router.post('/getpwd',user.getpwd);
router.put('/resetpwd/:id/:password',user.resetpwd);
router.post('/forgetpwd',user.mailverify);
router.put('/newid',jwtHelper.verifyJwtToken,user.updateuser);

router.post('/Customerreg',jwtHelper.verifyJwtToken, register.customerreg);
router.post('/Employeereg' ,jwtHelper.verifyJwtToken, register.employeereg);
router.post('/getiddetails' ,jwtHelper.verifyJwtToken, register.customerdata);
router.post('/geteiddetails' ,jwtHelper.verifyJwtToken, register.employeedata);
router.delete('/removeemployee/:id' ,jwtHelper.verifyJwtToken, register.removeemployee);
router.get('/editcustomer/:id' ,jwtHelper.verifyJwtToken, register.editcustomer);
router.get('/editemployee/:id' ,jwtHelper.verifyJwtToken, register.editemployee);
router.delete('/removecustomer/:id' ,jwtHelper.verifyJwtToken, register.removecustomer);
router.put('/updatecustomer/:id' ,jwtHelper.verifyJwtToken, register.updatecustomer);
router.put('/updateemployee/:id' ,jwtHelper.verifyJwtToken, register.updateemployee);
router.post('/newid' ,jwtHelper.verifyJwtToken, register.newadmin);


router.post('/comp',jwtHelper.verifyJwtToken,complain.view);
router.post('/complains',complain.addcomplain);
router.delete('/del/:id' ,jwtHelper.verifyJwtToken, complain.removecomplain);
router.get('/Complainview/:id' , jwtHelper.verifyJwtToken,complain.viewcomplain);
router.get('/Status/:status/:subarea' ,jwtHelper.verifyJwtToken,complain.substatcomplains);
router.get('/Subarea/:subarea' , jwtHelper.verifyJwtToken,complain.subcomplains);

router.post('/newitem',jwtHelper.verifyJwtToken,store.addnewItem);
router.get('/getitems/:item',jwtHelper.verifyJwtToken,store.showbyitem);
router.post('/newdetails',jwtHelper.verifyJwtToken,store.addnewDetail);
router.post('/onlinestore',jwtHelper.verifyJwtToken,store.viewitems);
router.get('/getitemdetails/:id',jwtHelper.verifyJwtToken,store.getitemdetails);
router.get('/edititemdetails/:id',jwtHelper.verifyJwtToken,store.editdetails);
router.put('/edititem/:id',jwtHelper.verifyJwtToken,store.updatedetails); 
router.put('/imageupload/:id',jwtHelper.verifyJwtToken,store.imageupload);
router.delete('/removeitem/:id',jwtHelper.verifyJwtToken,store.deleteitem);

router.post('/newstock',jwtHelper.verifyJwtToken,stock.addnewDetail);
router.post('/estock',jwtHelper.verifyJwtToken,stock.viewitems);
router.delete('/removestock/:id',jwtHelper.verifyJwtToken,stock.deleteitem);
router.get('/getitem/:id',jwtHelper.verifyJwtToken,stock.getitem);
router.get('/editstockitem/:id',jwtHelper.verifyJwtToken,stock.editdetails);
router.put('/updateitem/:id',jwtHelper.verifyJwtToken,stock.updatedetails);
router.post('/items',jwtHelper.verifyJwtToken,stock.items);
router.put('/sold/:id',jwtHelper.verifyJwtToken,stock.sold);

router.post('/viewpurch',jwtHelper.verifyJwtToken,purch.viewpurch);
router.put('/deliver/:id',jwtHelper.verifyJwtToken,purch.update);
router.put('/up/:id',jwtHelper.verifyJwtToken,purch.purchaseupdate);
router.post('/show',jwtHelper.verifyJwtToken,purch.purchases);
router.get('/getpurch/:id',jwtHelper.verifyJwtToken,purch.getpurch);
router.get('/getpurchase/:item',jwtHelper.verifyJwtToken,purch.item);
router.delete('/removepurch/:id',jwtHelper.verifyJwtToken,purch.deletepurch);

router.post('/complainreports',jwtHelper.verifyJwtToken,reports.complainreport);
router.post('/totalqty',jwtHelper.verifyJwtToken,reports.soldqty);
router.post('/salesreports',jwtHelper.verifyJwtToken,reports.salesreport);
router.get('/manualreports/:year/:month',jwtHelper.verifyJwtToken,reports.manualreports);
router.get('/manualreports/:subarea',jwtHelper.verifyJwtToken,reports.manualsubareareports);//totalqty

router.post('/additemtype',jwtHelper.verifyJwtToken,items.additemtype);
router.post('/showitems',jwtHelper.verifyJwtToken,items.itemtypes);
router.delete('/removeitems/:id',jwtHelper.verifyJwtToken,items.removeitemtypes);



module.exports=router;