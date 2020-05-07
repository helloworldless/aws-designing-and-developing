// Imports
const AWS = require("aws-sdk");

const region = "us-east-1";

AWS.config.update({ region });

const ec2 = new AWS.EC2();

function listInstances() {
  return new Promise((resolve, reject) => {
    ec2.describeInstances({}, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.Reservations.map((r) => r.Instances).flat());
      }
    });
  });
}

function terminateInstance(instanceId) {
  const params = { InstanceIds: [instanceId] };
  return new Promise((resolve, reject) => {
    ec2.terminateInstances(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

listInstances().then((data) => console.log(data));
// terminateInstance("i-08dc2889186845964").then((data) => console.log(data));
