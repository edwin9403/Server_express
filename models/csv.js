const mongoose  =  require('mongoose');

const Schema = new mongoose.Schema({
    nombre:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
});

module.exports = mongoose.model('users',Schema);
