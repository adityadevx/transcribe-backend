const fetch = require('node-fetch');
const fs = require('fs');
require('dotenv').config();
const path = require('path');

const downloadFolder = path.join(__dirname, './download/');
const format = "txt";

const checkForResults = async () => {
    try {
        const results = await fs.promises.readFile('./results.json');
        const parsedResults = JSON.parse(results);

        // const results =  require('./results.json');
        if (parsedResults.length !== 0) {
            await fetchJobStatuses(parsedResults);
        }
        //console.log(`Check Passed with ${parsedResults.length} items.`)
        await checkForResults()
    } catch (error) {
        console.error(`Error fetching job status: ${error}`);
    }
}

async function fetchJobStatuses(results) {
    for (const { job_id, file_name } of results) {
        try {
            const API_KEY = JSON.parse(await fs.promises.readFile(path.join(__dirname, './routes/key.json'), 'utf8')).key;
            let result
            if (job_id) {
                const response = await fetch(`https://asr.api.speechmatics.com/v2/jobs/${job_id}`, {
                    method: 'GET',
                    headers: { Authorization: `Bearer ${API_KEY}` },
                });
                result = await response.json();

            }

            const { status } = result.job;

            if (status == "done") {
                const index = results.findIndex(result => result.job_id === job_id);
                results.splice(index, 1);

                fs.writeFile(path.join(__dirname, './results.json'), JSON.stringify(results), (err) => {
                    if (err) throw err;
                    console.log(`Job ${job_id} removed from results.json`);
                });

                const textData = await fetch(`https://asr.api.speechmatics.com/v2/jobs/${job_id}/transcript?format=${format}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${API_KEY}`
                    },
                });

                const transcript = await textData.text();
                
                const fileName = `${downloadFolder}${job_id}.${format}`;

                if (!fs.existsSync(downloadFolder)) {
                    fs.mkdirSync(downloadFolder);
                }

                fs.writeFile(fileName, transcript, (err) => {
                    if (err) throw err.message;

                });

                fs.unlink(path.join(__dirname, `./uploads/${file_name}`), (err) => {
                    if (err) throw err.message;
                    console.log(`File ${file_name} removed from uploads`);
                });


            }
        } catch (error) {
            console.error(`Error fetching job status for ${file_name}: ${error}`);
        }
    }
    return true
}


//while (true) {
checkForResults();
//}
// console.log('Watching for changes to results.json');
