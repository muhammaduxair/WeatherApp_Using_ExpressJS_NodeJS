const path = require("path");
const express = require("express");
const app = express();
const hbs = require("hbs");

// using static middleware for using stylessheet and other file
const staticPath = path.join(__dirname, "../public");
app.use(express.static(staticPath));

// setting path
app.set("view engine", "hbs");
const viewPath = path.join(__dirname, "../templates/views");
app.set("views", viewPath);
const partialsPath = path.join(__dirname, "../templates/partials");
hbs.registerPartials(partialsPath);

//
// routing and working
app.get("/", (req, res) => {
  res.render("home");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/weather", (req, res) => {
  res.render("weather");
});

app.get("*", (req, res) => {
  res.render("error", {
    errorMsg: "oops! page could't found",
  });
});

// listening port
const port = process.env.PORT || 8000;
app.listen(port, () =>
  console.log(`Your Server is Running on http://localhost:${port}`)
);
