const fs = require('fs');
require('dotenv').config();

const requiredFields = [];

const fetchAllJobs = async () => {

    const response = await fetch(`https://asr.api.speechmatics.com/v2/jobs/`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${process.env.API_KEY}` },
    });
    const { jobs } = await response.json();
    console.log(jobs);

    jobs.forEach(async (job) => {
        try {
            const timeInMilliseconds = 86400000; // 1 day
            if (Date.parse(job.created_at) < Date.now() - timeInMilliseconds) {
                // console.log(job);
                const response = await fetch(`https://asr.api.speechmatics.com/v2/jobs/${job.id}`, {
                    method: 'DELETE',
                    headers: { Authorization: `Bearer ${process.env.API_KEY}` },
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
};

fetchAllJobs();