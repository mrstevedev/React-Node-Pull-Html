const http = require('http');
const path = require('path');
const fs = require('fs');
const rp = require('request-promise');
const qs = require('querystring');
const express = require('express');
const app = express(); 

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(express.static(path.join(__dirname, 'public')));

// Homepage Route
app.get('/', (req, res) => {
    res.send('Access the Api at /api');
});

// API route
app.use('/api', (req, res) => {
    const urls = [
        'https://dribbble.com/',
        'https://www.discogs.com/',
        'https://www.behance.net/',
        'https://reactpatterns.com/',
        'https://reactjs.org/',
        'https://angular.io/',
        'https://vuejs.org/',
        'https://jsonplaceholder.typicode.com/',
        'https://hub.docker.com/',
        'https://nodejs.org/en/',
        'https://www.linkedin.com/',
        'https://yarnpkg.com/en/',
        'https://www.npmjs.com/',
    ];
    res.send(urls);
});

app.post('/submit', (req, res) => {
    const newUrls = req.body.addedUrls;

    newUrls.map((url, index) => {
            rp(url)
            .then((html) => {
                // Create new file and append html to each file
                fs.appendFile(`urlHtml_${index}.html`, html, (err) => {
                    if(err) throw err;         
                    console.log('Saved!');
                });
                // console.log(html);
            })
            .catch(function(err){
                //handle error
            });
        });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`server started on port ${PORT}`))