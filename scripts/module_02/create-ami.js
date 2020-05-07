// Imports
const AWS = require("aws-sdk");

const region = "us-east-1";
AWS.config.update({ region });

const ec2 = new AWS.EC2();

createImage("i-00dbda1acc3e5a88b", "hamsterImage").then(() =>
  console.log("Complete")
);

function createImage(seedInstanceId, imageName) {
  const params = {
    InstanceId: seedInstanceId,
    Name: imageName,
  };

  return new Promise((resolve, reject) => {
    ec2.createImage(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}
