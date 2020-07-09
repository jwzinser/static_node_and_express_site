const express = require('express');
const router = express.Router();
const path = require('path');
const app = express();

// Use ES6 object destructering to get the right data
const { projects } = require('../data.json');
// Set static folder:
app.use(express.static(path.join(__dirname, 'public')));

// Root path
router.get('/', (req, res) => {
    res.render('index', {projects});
})

router.get('/about', (req, res) => {
    res.render('about');
});

module.exports = router;