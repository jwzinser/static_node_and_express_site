

// Tell our application to use express
const express = require('express');
const app = express();

// Looks if port exists, or use port 5000
const port = process.env.PORT || 5000;
// Tell our application to use a static folder for the client.
app.use('/static', express.static('public'));

// Tell our application to use the pug templating engine
app.set('view engine', 'pug');


// Define our main routes
const mainRoutes = require('./routes');
const projectRoutes = require('./routes/project');

// Tell our application to use the routes we just defined
app.use(mainRoutes);
app.use('/project', projectRoutes);

// Tell our application we want to throw an error if a page or route is not found.
app.use(function(req, res, next)  {
    const error = new Error("Page is Not Found");
    error.status = 302;
    console.error(`An error occured on route ${req.originalUrl} with message: ${error.message} and status: ${error.status}`);
    next(error);
});

// Tell our application we want to display an error page if an error occurs
app.use((error, req, res, next) => {
    res.locals.error = error;
    res.status(error.status || 500);
    res.render('error', {error});
});

// Tell our application that it is running on port {X}. 
app.listen(port, () => {
    console.log(`The application is running on localhost:${port}`);
});
