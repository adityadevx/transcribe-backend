const fetch = require('node-fetch');
const fs = require('fs');
require('dotenv').config();

const results = require('./results.json');
const downloadFolder = __dirname+"/download/";
const format = "txt";

function resultLength() {
    if (results.length > 0) {
        setTimeout(() => {
            console.log("running")
            fetchJobStatuses();
            resultLength();
        }, 5000);
    }
}

//resultLength();


async function fetchJobStatuses() {
    for (const { job_id, file_name } of results) {
        try {
            // console.log(job_id)
            const response = await fetch(`https://asr.api.speechmatics.com/v2/jobs/${job_id}`, {
                method: 'GET',
                headers: { Authorization: `Bearer ${process.env.API_KEY}` },
            });
            const result = await response.json();

            // console.log(result)
            const { status } = result.job;

            if (status == "done") {

                // if the status is done then remove it from the results.json file
                const index = results.findIndex(result => result.job_id === job_id);
                results.splice(index, 1);


                fs.writeFile('./results.json', JSON.stringify(results), (err) => {
                    if (err) throw err;
                    console.log(`Job ${job_id} removed from results.json`);
                });

                const textData = await fetch(`https://asr.api.speechmatics.com/v2/jobs/${job_id}/transcript?format=${format}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${process.env.API_KEY}`
                    },
                });

                const transcript = await textData.text();
                // console.log(transcript)
                const textFileName = file_name.split(".")[0]

                const newTextFileName = textFileName.replace(/\s+/g, '_');

                const fileName = `${downloadFolder}${newTextFileName}.${format}`;
                //save the transcript to a file
                fs.writeFile(fileName, transcript, (err) => {
                    if (err) throw err;
                    // console.log(`Transcript saved to ${fileName}`);
                }
                );

                // remove the audio file from the upload folder
                fs.unlink(`./uploads/${file_name}`, (err) => {
                    if (err) throw err;
                    console.log(`${file_name} was deleted`);
                });

            }

            // console.log(status)

        } catch (error) {
            console.error(`Error fetching job status for ${file_name}: ${error}`);
        }
    }
}

// fetchJobStatuses();



