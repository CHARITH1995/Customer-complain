const mongoose = require('mongoose');
const schema = mongoose.Schema;

const Employees = new schema({
    firstname:{
        type:String,
        require:[true,'first Name field is required']
    },
    lastname:{
        type:String,
        require:[true,'last Name field is required']
    },
    email:{
        type:String,
        unique:true,
        require:[true,'email field is required']
    },
    
    subarea:{
        type:String,
        require:[true,'subarea field is required']
    },
   
    Id:{
        type:String,
        unique:true,
        require:[true,'Id field is require']
    }
    

});

const Employeedetails = mongoose.model('Employees',Employees);//'details' is mongodb name Details is the schema name;
module.exports=Employeedetails;