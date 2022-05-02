import express from 'express';
import cors from 'cors';
import diagnosesRouter from './routes/diagnoses';
import patientsRouter from './routes/patients';

require('dotenv').config();
//const http = require('http');
const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3002;

app.get('/api/ping', (_req, res) => {
    res.send('pong!');
});

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    // issues ping to server to prevent Heroku dynos from sleeping.
    // setInterval(() => {
    //     http.get(process.env.APP_URL);
    //     console.log(`Pinging ${process.env.APP_URL}`);
    // }, 600000);
})
