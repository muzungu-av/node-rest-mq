const express = require("express");
const jsonBodyParser = require("body-parser");
const xmlparser = require('express-xml-bodyparser');
const { connectQueue, sendData } = require("./MqBroker");

const app = express();

app.use(xmlparser());
app.use(jsonBodyParser.urlencoded({ extended: true }));
app.use(jsonBodyParser.json());

/* Json запрос и ответ */
app.post("/json", (req, res, next) => {
    var body = req.body;
    process.stdout.write(`Raw JSON: `); console.log(body); //в строку
    console.log(`Parsed JSON: ` + JSON.stringify(body));

    connectQueue()
        .then(async () => {
            const result = await sendData(body);
            return result;
        })
        .then((result) => {
            const result_msg = "Result of Message sending: " + result;
            console.log(result_msg);
            res.header("Content-Type", "application/json");
            res.status(200).send({ answer: result_msg });
        });
});

/* Xml запрос и ответ */
app.post("/xml", (req, res, next) => {
    var body = req.body;
    console.log('Raw XML: ' + req.rawBody);
    console.log('Parsed XML: ' + JSON.stringify(req.body));

    let data = '<?xml version="1.0" encoding="UTF-8"?>';
    data += '<answer>';
    data += `I'm worked`;
    data += '</answer>';
    res.header("Content-Type", "application/xml");
    res.status(200).send(data);
});

/* обработка ошибок */
app.use((error, req, res, next) => {
    res.status(400);
    res.json({ message: "ОШИБКА: " + error.message });
})

app.listen(8080);
