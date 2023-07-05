const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 1000;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api/login', require('./routes/login'));
app.use('/api/validateuser', require('./routes/validateuser'));
app.use('/api/upload', require('./routes/upload'));
app.use('/api/transcode', require('./routes/transcribe'));

// zip file download
app.use('/api/zip', require('./routes/zip'));

// single file download
app.use('/api/singlefile', require(path.join(__dirname, './routes/singlefile')));

app.use('/api/downloadlist', require('./routes/downloadlist'));
app.use('/api/delete', require('./routes/deletefiles'));
app.use('/api/resetpass', require('./routes/resetpass'));
app.use('/api/keyreset', require('./routes/keyreset'));
app.use('/api/sendapikey', require('./routes/sendApiKey'));

app.use('/api/audiolist', require('./routes/audiolist'));
app.use('/api/deleteaudio', require('./routes/deleteaudio'));


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
