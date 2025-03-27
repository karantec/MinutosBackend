const mongoose = require('mongoose');

const aboutUsSchema = new mongoose.Schema({
    title: { type: String, required: true },         // For "DATA DRIVEN"
    description: { type: String, required: true },   // Main body content
    image: { type: String, required: true } ,
    linkedin:{type:String, required:true},
    facebook:{type:String,required:true} ,
    Instagram:{type:String,required:true},
    twitter:{type:String,required:true},
    
    whatsapp:{type:String,required:true},
}, { timestamps: true });

module.exports = mongoose.model('AboutUs', aboutUsSchema);
