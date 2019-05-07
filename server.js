const http = require('http');
const path = require('path');
const fs = require('fs');
const rp = require('request-promise');

const server = http.createServer((req, res) => {
    if(req.url === '/') {
        fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, content) => {
            if(err) throw err;
             // Adds a content-type headeer in the Response Header
             res.writeHead(200, { 'Content-Type': 'text/html' });
             // res.end('<h1>Homepage</h1>');
             res.end(content);
        });
    }
    // Create RESTful api of urls at /urls
    if(req.url === '/api') {
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
        // urls.map((url, index) => {
        //     rp(url)
        //     .then((html) => {
        //         // Create new file and append html to each file
        //         fs.appendFile(`urlHtml_${index}.html`, html, (err) => {
        //             if(err) throw err;         
        //             console.log('Saved!');
        //         });
        //         // console.log(html);
        //     })
        //     .catch(function(err){
        //         //handle error
        //     });
        // });
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(urls));
    }
});

const PORT = process.env.PORT || 5001;

server.listen(PORT, () => console.log(`server started on port ${PORT}`))