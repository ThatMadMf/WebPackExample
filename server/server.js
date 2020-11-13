const http = require('http');
const fs = require('fs');
const yaml = require('js-yaml');

const hostname = '127.0.0.1';
const port = 3000;

const file = process.env.LOG_FILE_PATH || '../logs.txt'
const format = process.env.FORMAT || 'text'

const server = http.createServer((req, res) => {
    logToFile(req);

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Your request has been saved!\n');
});

const logToFile = (req) => {
    headers = req.headers;
    const logInstance = { date: new Date(), host: headers.host, url: req.url, agent: headers['user-agent'] }
    switch (format.toLowerCase()) {
        case 'text': {
            logPlainText(logInstance);
            break;
        }
        case 'json': {
            logJSON(logInstance);
            break;
        }
        case 'yaml': {
            logYaml(logInstance);
            break;
        }
        default: {
            console.error('Format is not supported');
        }
    }
}

const logPlainText = (item) => {
    const formattedOutput = `${item.date}: ${item.host} to ${item.url} via ${item.agent} \n`
    fs.appendFile(file, formattedOutput, handleError);
}

const logJSON = (item) => {
    fs.appendFile(file, JSON.stringify(item), handleError);
}

const logYaml = (item) => {
    fs.appendFile(file, yaml.safeDump(item), handleError);
}

const handleError = (err) => {
    if (err) {
        return console.error("FAILED TO WRITE TO FILE", err)
    }
}

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});