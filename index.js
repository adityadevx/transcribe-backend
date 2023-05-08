const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// const check = require('./check');

// console.log(check)

const app = express();
const port = 8000;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api/login', require('./routes/login'));
app.use('/api/validateuser', require('./routes/validateuser'));
app.use('/api/upload', require('./routes/upload'));
app.use('/api/transcode', require('./routes/transcribe'));


// single file download
// app.use('/api/download', require('./routes/download'));

// zip file download
app.use('/api/zip', require('./routes/zip'));

app.use('/api/downloadlist', require('./routes/downloadlist'));
app.use('/api/delete', require('./routes/deletefiles'));


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
