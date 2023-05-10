const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');


const fetchAllJobs = async () => {
    try {
        const API_KEY = JSON.parse(await fs.promises.readFile(path.join(__dirname, './routes/key.json'), 'utf8')).key;
        const response = await fetch(`https://asr.api.speechmatics.com/v2/jobs/`, {
            method: 'GET',
            headers: { Authorization: `Bearer ${API_KEY}` },
        });
        const { jobs } = await response.json();
        console.log(jobs);

        jobs.forEach(async (job) => {
            try {
                const timeInMilliseconds = 86400000 * 5; // 5 days
                if (Date.parse(job.created_at) < Date.now() - timeInMilliseconds) {
                    // console.log(job);
                    const response = await fetch(`https://asr.api.speechmatics.com/v2/jobs/${job.id}`, {
                        method: 'DELETE',
                        headers: { Authorization: `Bearer ${API_KEY}` },
                    });
                    const result = await response.json();
                    console.log(result);
                    if (response.status !== 200) {
                        console.error(`Error deleting job ${job.id}: ${result.message}`);
                    }
                }
            } catch (error) {
                console.error(`Error deleting job ${job.id}: ${error.message}`);
            }
        });

    } catch (e) {
        console.log(e.message)
    }
};


setInterval(() => {
    fetchAllJobs()
}, 86400000)
