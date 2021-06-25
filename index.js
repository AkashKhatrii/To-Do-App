
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

var items = []
var workItems = []
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.set('view engine', 'ejs');
app.use(express.static("public"));

app.get("/", function(req, res){
    var today = new Date();
    var options = {
        weekday : "long",
        day : "numeric",
        month : "long"
    }

    var day = today.toLocaleDateString("en-US", options);
    res.render('list', {listType:day, newItems: items});
    
});

app.get("/work", function(req,res){
    res.render("list", {listType: "Work List", newItems: workItems});
});

app.post('/', function(req,res){
    var item = req.body.newItem;
    console.log(req.body);
    if(req.body.list === "Work"){
        workItems.push(item);
        res.redirect("/work");
    }
    else{
        items.push(item);
        res.redirect("/");
    }
    
});

app.get('/contact', function(req, res){
    res.send("Thank you for contacting");
});

app.get('/about', function(req, res){
    res.send("About Page");
});
app.listen(3000);
