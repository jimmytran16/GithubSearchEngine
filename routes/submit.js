const express = require('express');
const router = express.Router();
const path = require('path');
const axios = require('axios');
const date = require('../dateutils/Date');

router.get('/',(req,res)=>{
    const username =  req.param('username');
    console.log(username);
    url = `https://api.github.com/users/${username}/repos`;
    axios.get(url) /* calls the githubs API using the endpoint url ..*/
    .then(response => {
        console.log(typeof(response.data));
        //make a function to get a list of url links to the repos
        list_of_repos = getListOfRepos(response.data);
        res.render(path.join(__dirname,'../views','subpage.ejs'), {'repos':list_of_repos,'user':username,'length':list_of_repos.length});
    })
    .catch(error => {
        console.log(error);
        res.render(path.join(__dirname,"../views","index"),{"error":'The user does not exist on Github!'});
    });
    // response.render(path.join(__dirname,"views","subpage"),{"page_type":"subpage"})
});

/* This function will extract from the data object and create its content, and returns a list of repos' content */
function getListOfRepos(data){
    var list = [];
    data.forEach(function(d){ //go through the list of the repo objects
        var description = '';
        if(d['description'] == null){
            description = 'Repository has no description.' //check if repo has no description, then set a default description
        }
        else{
            description = d['description']; //if has description, then give var description that value
        }
        var content = { //objects of content will be passed onto the list
            'fullname':d['full_name'],
            'url':d['html_url'],
            'update':date.formatDate(d['updated_at'].split("T")[0]),
            'des':description
        };
        list.push(content);
    });
    return date.sortByDate(list); /* returns the list sorted by the date */
}

module.exports = router; /* export the router to be used in the main app file (index.js) */
