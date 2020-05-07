// Imports
const AWS = require("aws-sdk");

AWS.config.update({ region: "us-east-1" });

// Declare local variables
// TODO: Create new s3 object
const s3 = new AWS.S3();

createBucket("hamster-bucket-dg").then((data) => console.log(data));

function createBucket(bucketName) {
  // TODO: Define params object
  const params = {
    Bucket: bucketName,
    ACL: "public-read",
  };

  return new Promise((resolve, reject) => {
    // TODO: Create s3 bucket
    s3.createBucket(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}
