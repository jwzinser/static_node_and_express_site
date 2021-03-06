const express = require('express');
const router = express.Router();

const app = express();

const { projects } = require('../data.json');


// Project id paths
router.get('/:id', (req, res, next) => {
    console.log(req.params.id);
    const projectId = +req.params.id;

    // Pass the error to the middleware
    if(!(projects[projectId])) {
        const error = new Error('Project ID not found');
        error.status = 404;
        console.error(`Error on route ${req.originalUrl} with message: ${error.message} and status: ${error.status}`);
        next(error);
    } else {
        const project = projects.find( ({ id }) => id === +projectId );
        res.render('project', {project});
    }

});

module.exports = router;