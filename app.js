const express = require('express');
const app = express();

const port = process.env.PORT || 5000;
app.use('/static', express.static('public'));

app.set('view engine', 'pug');


// Index and Project routes
const mainRoutes = require('./routes');
const projectRoutes = require('./routes/project');
app.use(mainRoutes);
app.use('/project', projectRoutes);

// Middleware
app.use(function(req, res, next)  {
    const error = new Error("Page is Not Found");
    error.status = 404;
    console.error(`An error occured on route ${req.originalUrl} with message: ${error.message} and status: ${error.status}`);
    next(error);
});

// Error page
app.use((error, req, res, next) => {
    res.locals.error = error;
    res.status(error.status || 500);
    res.render('error', {error});
});

// Tell our application that it is running on port {X}. 
app.listen(port, () => {
    console.log(`The application is running on localhost:${port}`);
});
