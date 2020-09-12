const express=require('express');
const app=express();
const port=8000;

//use espress router
app.use('/',require('./routes'));

//setting up ejs
app.set('view engine','ejs');
app.set('views','.\views');

app.listen(port,function(err){
    if(err)
    {
        console.log(`Error in running server: ${err}`);
    }
    console.log(`server is running on port: ${port}`);
});