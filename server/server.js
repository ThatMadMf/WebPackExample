const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    logToFile(req);

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Your request has been saved!\n');
});

const logToFile = (req) => {
    headers = req.headers; 
    const logInstance = `${new Date()}: ${headers.host} to ${req.url} via ${headers['user-agent']} \n`
    fs.appendFile('logs.txt', logInstance, function (err) {
        if(err) {
            return console.error("FAILED TO WRITE TO FILE", err)
        }
        console.log(logInstance);
    });
}

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});