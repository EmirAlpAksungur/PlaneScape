const express = require('express');
const request = require('request');
const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use('/api', (req, res) => {
    console.log(req.url);

    const url = `https://api.schiphol.nl${req.url}`;
    const options = {
        url: url,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Accept": "application/json",
            "ResourceVersion": "v4",
            "app_id": "0592c843",
            "app_key": "006aaf41b41be4b0ab80cfa905bb5748",
        },
    };
    request(options, (error, response, body) => {
        console.log("girdi");

        if (error) {
            return res.status(500).json({ error: 'Something went wrong!' });
        }

        return res.status(response.statusCode).send(body);
    });
});

const PORT = 5001;
app.listen(PORT, () => {
    console.log(`Proxy server is running on http://localhost:${PORT}`);
});