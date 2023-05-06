# Transcribe Audio Backend

## API Reference

### Login Api

```http
  POST /api/login
```

| Parameter  | Type     | Description  |
| :--------- | :------- | :----------- |
| `email`    | `string` | **Required** |
| `password` | `string` | **Required** |

This endpoint is used to login the user and create a session for the user and return the token for the session and saves the token in a json file (sessionis.json)

### Validate User Api

```http
  POST /api/validateuser
```

| Parameter | Type     | Description   |
| :-------- | :------- | :------------ |
| `token`   | `string` | **Required**. |

The endpoint matches the token with the token present in the sessionid.json file and returns true if the token is valid.

### Upload Audio Files

```http
POST /api/upload
```

| Parameter     | Type    | Description  |
| :------------ | :------ | :----------- |
| `Audio Files` | `Array` | **Required** |

The endpoint is used to upload the audio files to the server and returns a response with the status of the 200.

**Note:**

- The audio files should be in the format of .mp3 or .wav
- Total size of the audio files should not exceed 500MB
- Maximum number of audio files that can be uploaded at a time is 50

### Transcribe Audio

```http
  POST /api/transcode
```

| Parameter      | Type     | Description  |
| :------------- | :------- | :----------- |
| `accuracy`     | `string` | **Required** |
| `diarization`  | `string` | **Required** |
| `outputLocale` | `string` | **Required** |

The endpoint will take the above parameters and generate the transcript id for the audio files present in the upload folder and it will create a json file named (results.json) in the root directory of the project with the transcript id and the name of the audio file.

### Send Zip Files

```http
  GET /api/zip
```

The endpoint will zip all the text files present in the download folder and send the zip file as a response.

## Scripts

```
jobStatus.js
```

This script will check the status of the transcript id from (**results.json**) and if the job status is completed it will create a text file with the transcript name of the file and it will store it in the download folder and if the job status is not completed it will wait for 5 seconds and check the status again. This script will run every 5 seconds until all the transcript ids are completed. After all the transcript ids are completed it will delete the (**results.json**) file.

```
deleteOld.js
```

This script will delete the jobs that are older than 1 day.
