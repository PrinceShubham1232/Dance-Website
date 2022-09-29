const express=require("express")
const path=require("path");
// const fs=require("fs");
const app=express();
const mongoose = require('mongoose');
const bodyparser=require("body-parser")

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/contactDance');
  
  // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}
const port=80;

//Define mongoose Schema
const contactSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  address: String,
  concern: String
});

const Contact = mongoose.model('Contact', contactSchema);

//EXPRESS SPECIFIC STUFF
app.use('/static',express.static('static'));//for serving static files
app.use(express.urlencoded())

//PUG SPECIFIC STUFF
app.set('view engine', 'pug')//set the template engine as pug
app.set('views',path.join(__dirname,'views'))//set the views directory


//ENDPOINTS
app.get('/', (req, res) => {
    const params={ }
    res.status(200).render('home.pug',params);
  })

//ENDPOINTS
app.get('/contact', (req, res) => {
    const params={ }
    res.status(200).render('contact.pug',params);
  })

app.post('/contact', (req, res) => {
    var myData=new Contact(req.body);
    myData.save().then(()=>{
      res.send("This item has been saved to the database")
    }).catch(()=>{
      res.status(400).send("Item was not saved to the data base")
    });

    //res.status(200).render('contact.pug');
  })

  
//START THE SERVER
app.listen(port,()=>{
    console.log(`The application successfully started on port ${port}`);
})