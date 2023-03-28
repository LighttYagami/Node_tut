const mongoose = require('mongoose');

mongoose.connect('mongodb://0.0.0.0:27017/project',{
    useNewUrlParser: true
})

const db = mongoose.connection;

db.on('error',(error)=>{
    console.log(error);
});
db.once('open',()=>{
    console.log("Connected to database");
});