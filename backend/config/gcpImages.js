const { Storage } = require('@google-cloud/storage');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

// Creates GCP storage client  
const storage = new Storage({
  projectId: process.env.GOOGLE_PROJECT_ID,
  keyFilename: path.join(__dirname, '..', process.env.GOOGLE_APPLICATION_CREDENTIALS),
});

const imageBucket = storage.bucket(process.env.GOOGLE_BUCKET_NAME);

module.exports = imageBucket;
