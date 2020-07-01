const express = require('express');
const router = express.Router();

const app = express();

// Use ES6 object destructering to get the right data
const { projects } = require('../data.json');

router.get('/:id', (req, res, next) => {
    
    const projectId = +req.params.id;
    // If there is no matching ID in projects array throw an error
    // Pass the error to the middleware
    if(!(projects[projectId])) {
        const error = new Error('ID is missing or not found');
        error.status = 404;
        console.error(`An error occured on route ${req.originalUrl} with message: ${error.message} and status: ${error.status}`);
        next(error);
    } else {
        const project = projects.find( ({ id }) => id === +projectId );
        res.render('project', {project});
    }

});

module.exports = router;