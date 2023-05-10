const router = require('express').Router();
require('dotenv').config();
const fs = require('fs');
const fetch = require('node-fetch').default;
const FormData = require('form-data');
const path = require('path');

if (!fs.existsSync(path.join(__dirname, '..', '/uploads/'))) {
    fs.mkdirSync(path.join(__dirname, '..', '/uploads/'));
}

const audioFolder = path.join(__dirname, '..', '/uploads/');
const API_KEY = process.env.API_KEY;

const transcodeAudio = async (outputLocale, diarization, accuracy) => {
    const files = await fs.promises.readdir(audioFolder);
    const promises = files.map(async (file) => {
        const PATH_TO_FILE = `${audioFolder}${file}`.toString();
        const fileStream = fs.createReadStream(PATH_TO_FILE);
        const formData = new FormData();
        formData.append("data_file", fileStream, PATH_TO_FILE);
        formData.append(
            "config",
            JSON.stringify({
                type: "transcription",
                transcription_config: {
                    language: 'en',
                    "operating_point": accuracy,
                    "diarization": diarization,
                    "output_locale": outputLocale,
                },
            })
        );

        const API_KEY = JSON.parse(await fs.promises.readFile(path.join(__dirname, '/key.json'), 'utf8')).key

        const response = await fetch("https://asr.api.speechmatics.com/v2/jobs/", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${API_KEY}`,
                "Content-Type": `multipart/form-data; boundary=${formData._boundary}`
            },
            body: formData
        });
        const result = await response.json();
        console.log(result);
        return {
            "job_id": result.id,
            "file_name": file,
        };
    });
    const results = await Promise.all(promises);

    return results;
};

router.post('/', async (req, res) => {
    try {
        const { accuracy, diarization, outputLocale } = req.body;
        console.log(req.body)
        const results = await transcodeAudio(outputLocale, diarization, accuracy);
        console.log(results);
        fs.writeFileSync(path.resolve(__dirname, '../results.json'), JSON.stringify(results));
        res.status(200).json(results);
    } catch (err) {
        console.error(err.message, err.stack);
        res.status(500).send('Internal server error');
    }
});

module.exports = router;
