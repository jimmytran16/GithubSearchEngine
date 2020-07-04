const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/',(request,response)=>{response.render(path.join(__dirname,"../views","index"),{"page_type":"index"})});

module.exports = router; /* export the router to be used in the main app file (index.js) */
