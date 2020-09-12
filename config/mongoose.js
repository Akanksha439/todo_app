const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/todoapp_development');
const db=mongoose.connection;
db.on('error',console.error.bind(console,"error connectinf to mongodb"));
db.once('open', function(){
  console.log("connected to database::mongodb");
});
module.exports=db;