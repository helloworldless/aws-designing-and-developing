const AWS = require("aws-sdk");

AWS.config.update({ region: "us-east-1" });

const ec2 = new AWS.EC2();
const volumeId = "vol-092c9cec60e963cb8";
const instanceId = "i-0fc76189b6b68480f";

detachVolume(volumeId).then(() => attachVolume(instanceId, volumeId));

function detachVolume(volumeId) {
  const params = {
    VolumeId: volumeId,
  };

  return new Promise((resolve, reject) => {
    ec2.detachVolume(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

function attachVolume(instanceId, volumeId) {
  const params = {
    VolumeId: volumeId,
    InstanceId: instanceId,
    Device: "/dev/sdf",
  };

  return new Promise((resolve, reject) => {
    ec2.attachVolume(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}
