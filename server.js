const express = require("express");
const axios = require("axios");

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set("view engine", 'ejs')

app.get("/", (req, res) => {
  res.render("index")
});

let namelist = [];

app.get("/users", async (req, res) => {
  try {
    const response = await axios.get("https://jsonplaceholder.typicode.com/users")
    for (let user of response.data) {
      namelist.push(user.name)
    }
    res.render('users', { namelist })
  } catch (err) {
    console.log(err)
  }
});

app.get("/notes", (req, res) => {
  res.render('notes')
});

app.post("/noteadded", (req, res) => {
  res.render("displaynotes", { note: req.body.note })
});

app.listen(3000)