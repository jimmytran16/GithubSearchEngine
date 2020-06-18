const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const axios = require('axios');
const bodyParser = require('body-parser');

app.set('views',path.join(__dirname,"views")); //set the views directory
app.use(express.static('public')); //set the static folder to be under 'public'
app.set('view engine','ejs') //set the app to use the ejs view template engine

// for parsing application/json
app.use(bodyParser.json()); 

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded

app.get('/',(request,response)=>{response.render(path.join(__dirname,"views","index"),{"page_type":"index"})});
app.get('/submit',(req,res)=>{
    const username =  req.param('username');
    console.log(username);
    url = `https://api.github.com/users/${username}/repos`;
    console.log(url)
    axios.get(url)
    .then(response => {
        console.log(typeof(response.data));
        //make a function to get a list of url links to the repos
        list_of_repos = getListOfRepos(response.data);            
        res.render(path.join(__dirname,'views','subpage.ejs'), {'repos':list_of_repos,'user':username});
    })
    .catch(error => { /* When there is an */
        console.log(error);
        res.render(path.join(__dirname,"views","index"),{"error":'The user does not exist on Github!'});
    });
    // response.render(path.join(__dirname,"views","subpage"),{"page_type":"subpage"})

});

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
            'update':formatDate(d['updated_at'].split("T")[0]),
            'des':description
        };
        list.push(content);
    });
    return sortByDate(list);
}
/* function to sort the date in descending order */
function sortByDate(list){ 
    list.sort(function(a, b){ /* This function will sort out the list based on the given dates in ascending order */
        var aa = a['update'].split('/').reverse().join(),
            bb = b['update'].split('/').reverse().join();
        return aa < bb ? -1 : (aa > bb ? 1 : 0);
    });
    return list.reverse() /* reverse the list so that it can be in descending order */
}

function formatDate(date){ /* This function is to format the date into MM/DD/YYYY display */
    const date_split = date.split("-");
    return date_split[1] + '/' + date_split[2] + '/' + date_split[0];
}

app.listen(PORT, ()=>{console.log(`Connection to PORT ${ PORT } http://localhost:${ PORT }`)});
