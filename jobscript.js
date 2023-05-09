const fetch = require('node-fetch');
const fs = require('fs');
require('dotenv').config();

const path = require('path');
const downloadFolder = path.join(__dirname, './download/');
const format = "txt";

async function checkForResults() {
    try {
        const results = await fs.promises.readFile('./results.json');
        const parsedResults = JSON.parse(results);

        // const results =  require('./results.json');
        if (parsedResults.length !== 0) {
            await fetchJobStatuses(parsedResults);
        }
    } catch (error) {
        console.error(`Error fetching job status: ${error}`);
    }
}

async function fetchJobStatuses(results) {
    for (const { job_id, file_name } of results) {
        try {
            let result

            if (job_id) {

                const response = await fetch(`https://asr.api.speechmatics.com/v2/jobs/${job_id}`, {
                    method: 'GET',
                    headers: { Authorization: `Bearer ${process.env.API_KEY}` },
                });
                result = await response.json();

            }

            const { status } = result.job;

            if (status == "done") {
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
                const textFileName = file_name.split(".")[0]
                const fileName = `${downloadFolder}${textFileName}.${format}`;

                if (!fs.existsSync(downloadFolder)) {
                    fs.mkdirSync(downloadFolder);
                }

                fs.writeFile(fileName, transcript, (err) => {
                    if (err) throw err;
                });

                fs.unlink(`./uploads/${file_name}`, (err) => {
                    if (err) throw err;
                    console.log(`File ${file_name} removed from uploads`);
                });


            }
        } catch (error) {
            console.error(`Error fetching job status for ${file_name}: ${error}`);
        }
    }
}

// setInterval(() => {
//     console.log('Checking for results')
//     checkForResults();
// }, 1000);


while (true) {
    checkForResults();
}
// console.log('Watching for changes to results.json');