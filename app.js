const express = require("express");
const app = express();
const {projects} = require("./data.json");
const port = 3001;

app.set("view engine", "pug");

app.use("/static", express.static("public"));



app.get('/hola', function (req, res) {
  res.render('index2', { title: 'Hey', message: 'Hello there!' })
})


//------Middlewares-----

app.use((req, res, next) => {
  if (!projects) {
    const err = new Error("No data");
    err.status = 500;
    console.error(err.message);
    return next(err);
  }
  next();
});

app.use("/project/:id", (req, res, next) => {
  const regEx = /^[0-4]$/;
  if (!regEx.test(req.params.id)) {
    const err = new Error("project not found");
    err.status = 404;
    return next(err);
  }
  next();
});


// -------Routes-------

app.get("/", (req, res) => {
  res.render("index", {projects});
});

app.get("/about", (req, res) => {
  res.render("about");
});


//Dynamic projects route
app.get('/project/:id', (req, res, next)=> {
  const projectId = +req.params.id;
  console.log('this is the project id ' + projectId);
  const project = projects.find( ({ id }) => id === +projectId );
  console.log(project);

} );



app.get("/twitter", (req, res) => {
  res.render("twitter");
});

app.use((req, res, next) => {
  const err = new Error("page not found");
  err.status = 404;
  next(err);
});


//----Error middleware----

app.use((err, req, res, next) => {
  console.log(err.message);
  console.log(`status code ${err.status}`);
  res.status(err.status);
  res.render("error", { err });
});


//----Port selection and running message

app.listen(port, () => console.log(`application running on port ${port}`));



