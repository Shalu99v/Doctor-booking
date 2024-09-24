const mongoose=require('mongoose');

const departmentSchema=mongoose.Schema({
name: {
    type:String,
    required:true,
    trim:true
},
image:{
    type:String,
    required:true,
    trim:true
},
doctors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' }],
hospitals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hospital' }]
},
{
    timestamps:true
})

const Department=mongoose.model('Department',departmentSchema);
module.exports=Department;