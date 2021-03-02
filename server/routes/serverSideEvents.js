const express = require('express');
var app = module.exports = express();
// const app = (module.exports = express());


// create helper middleware so we can reuse server-sent events
const useServerSentEventsMiddleware = (req, res, next) => {
    console.log(req)
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    // res.setHeader('Connection: keep-alive');
    // res.setHeader('X-Accel-Buffering: no');

    // only if you want anyone to access this endpoint
    res.setHeader('Access-Control-Allow-Origin', '*');

    res.flushHeaders();

    const sendEventStreamData = (data) => {
        const sseFormattedResponse = `data: ${JSON.stringify(data)}\n\n`;
        res.write(sseFormattedResponse);
    }

    // we are attaching sendEventStreamData to res, so we can use it later
    Object.assign(res, {
        sendEventStreamData
    });

    next();
}

const streamRandomNumbers = (req, res) => {
    // We are sending anyone who connects to /stream-random-numbers
    // a random number that's encapsulated in an object
    let interval = setInterval(function generateAndSendRandomNumber(){
        const data = {
            value: Math.random(),
        };
        // console.log('data', data)
        res.sendEventStreamData(data);
    }, 1000);

    // close
    res.on('close', () => {
        clearInterval(interval);
        res.end();
    });
}

app.get('/stream-random-numbers', useServerSentEventsMiddleware, 
    streamRandomNumbers)