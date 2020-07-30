const PORT = process.env.PORT || 3000;
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Schema = require("./model/schema");

const url = `mongodb+srv://rest:rest@cluster0.6sb1e.mongodb.net/<dbname>?retryWrites=true&w=majority`;
mongoose.connect(
  url,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => {
    console.log("connected to MongoDb successfully");
  }
);

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
    Schema.create(req.body)
      .then((r) => {
        res.status(200).render("sucess.ejs");
      })
      .catch((e) => {
        res.status(200).render("error.ejs",{message:e});
      });
  })
  .post("/search", (req, res) => {
    console.log(req.body);
    Schema.find(req.body)
      .select("username password")
      .then((r) => {
        res.status(200).render("result.ejs",{data:r});
      })
      .catch((e) => {
        res.status(200).render("error.ejs",{message:e});
      });
  })
  .listen(PORT, () => {
    console.log(`server started on the port : ${PORT}`);
  });
