const PORT = process.env.PORT || 3000;
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Schema = require("./model/schema");

mongoose.connect("mongodb+srv://rest:rest@cluster0.6sb1e.mongodb.net/<dbname>?retryWrites=true&w=majority",
{ useUnifiedTopology: true , useNewUrlParser: true  },()=>{
  console.log("connected to MongoDb successfully");
});

app
  .set("view engine", "ejs")
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json({}))
  .get("/", (req, res) => {
    res.status(200).render("home.ejs");
  })
  .get("/save", (req, res) => {
    res.status(200).render("save.ejs");
  })
  .get("/search", (req, res) => {
    res.status(200).render("search.ejs");
  })
  .post("/submit", (req, res) => {
    Schema
    .create(req.body)
    .then(r =>{
      console.log(`success` + r);
      res.status(200).send(`<p><b>Successfull</b></p><a href="/"><button>Go Back</button></a>`);
    })
    .catch(e =>{
      console.log(`error` + e);
      res.status(200).send(`<p><b>Error</b> + ${e} </p><a href="/save"><button>Try Again</button></a>`);
    })
  })
  .post("/search",(req,res)=>{
    console.log(req.body);
    Schema
    .find(req.body)
    .select("username password")
    .then(r =>{
      console.log(`found` + r);
      console.log(r)
      res.status(200).send(`<p><b>Found</b></p><p>Username : ${r[0].username}</p><p>Password : ${r[0].password}</p><a href="/"><button>Go Back</button></a>`);
    })
    .catch(e =>{
      console.log(`error` + e);
      res.status(200).send(`<p><b>Error</b> + ${e} </p><a href="/save"><button>Try Again</button></a>`);
    })
  })
  .listen(PORT, () => {
    console.log(`server started on the port : ${PORT}`);
  });
