import express from 'express';
import jsonBodyParser from 'body-parser';
import xmlparser from 'express-xml-bodyparser';
import dotenv from 'dotenv';
import path from 'path';
import * as Broker from './MqBroker.js';
import {getDescriptionAboutSystem} from './middleware.js';

const __dirname = path.resolve();
const HTTP_PORT = `${process.env.HTTP_PORT}`;
const app = express();

app.use(xmlparser());
app.use(jsonBodyParser.urlencoded({ extended: true }));
app.use(jsonBodyParser.json());

/* GET */
app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, 'static', 'index.html'));
})

/* our middleware - get info about System */
app.use(getDescriptionAboutSystem);
app.get("/about", (req, res) => {
    res.send(req.description);
})

/* Json запрос и ответ */
app.post("/json", (req, res, next) => {
    var body = req.body;
    process.stdout.write(`Raw JSON: `);

    Broker.connectQueue()
        .then(async () => {
            const result = await Broker.sendData(body);
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

app.listen(`${HTTP_PORT}`); 