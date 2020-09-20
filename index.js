const express=require('express');
//connecting mongoose,write above express
const db=require('./config/mongoose');
const Todo=require('./models/todolist');
const app=express();
const port=8000;

//setting up ejs
app.set('view engine','ejs');
app.set('views','./views');
app.use(express.static('assets'));

//middleware
app.use(express.urlencoded());

//returns response to home page
app.get('/', function(req,res){
   Todo.find({},function(err,todos){
    if(err)
    { 
        console.log('Error in fetching tasks from db');
        return;
    }
    return res.render('home',{
        title:"TODO_APP",
        todo_list:todos

    });
   });
});

//insert task
app.post('/create-list', function(req,res){
     Todo.create({
         description:req.body.description,
         category:req.body.category,
         duedate:req.body.duedate
     },function(err,newTodo){
         if(err){
             console.log('error in creating todolist');
             return;
         }
         return res.redirect('back');
     });
});

//delete task
app.get('/delete-task',function(req,res){
    //get the id from query in the url
    let id=req.query.id;

    //find the contact in db using id & delete
    Todo.findByIdAndDelete(id,function(err){
       if(err){
           console.log('error in deleting an object from db');
       }
       return res.redirect('back');
    });
    
});

app.listen(port,function(err){
    if(err)
    {
        console.log(`Error in running server: ${err}`);
    }
    console.log(`server is running on port: ${port}`);
});