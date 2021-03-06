
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();


app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.set('view engine', 'ejs');
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true});

const itemsSchema = {
    name: String
};

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
    name: "Welcome to your todolist"
});

const item2 = new Item({
    name: "Hit the + button to add a new item."
});

const item3 = new Item({
    name: "<-- Hit this to delete an item"
});

const defaultItems = [item1, item2, item3];


app.get("/", function(req, res){

    
    Item.find({}, function(err, foundItems){
        if( foundItems.length === 0){
            Item.insertMany(defaultItems, function(err){
                if(err){
                    console.log(err);
                }
                else{
                    console.log("Successfully added default items to database");
                }
            });
            res.redirect("/");
        }else{

        }
        res.render('list', {listType:"Today", newItems: foundItems});
    })
    
    
});

app.get("/work", function(req,res){
    res.render("list", {listType: "Work List", newItems: workItems});
});

app.post('/', function(req,res){
    const itemName = req.body.newItem;
    const item = new Item({
        name: itemName
    });
    item.save();

    res.redirect("/");
    
    
});

app.post('/delete', function(req, res){
   const checkedItemId = req.body.checkbox;
   Item.findByIdAndRemove(checkedItemId, function(err){
       if(!err){
            console.log("Succeefully deleted.")
       }
   });
   res.redirect("/");
})

app.get('/contact', function(req, res){
    res.send("Thank you for contacting");
});

app.get('/about', function(req, res){
    res.send("About Page");
});
app.listen(3000);
