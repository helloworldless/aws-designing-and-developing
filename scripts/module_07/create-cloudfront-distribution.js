const AWS = require("aws-sdk");
const cfParams = require("./cloudfront-parameters");

AWS.config.update({ region: "us-east-1" });

const cf = new AWS.CloudFront();

createDistribution("hamster-bucket-dg").then((data) => console.log(data));

function createDistribution(bucketName) {
  const params = {
    DistributionConfig: {
      CallerReference: `${Date.now()}`,
      Comment: "Hamster fantasy league distribution",
      DefaultCacheBehavior: cfParams.defaultCacheBehavior(bucketName),
      Origins: cfParams.origins(bucketName),
      HttpVersion: "http2",
      PriceClass: "PriceClass_100",
      IsIPV6Enabled: true,
      Enabled: true,
    },
  };
  return new Promise((resolve, reject) => {
    cf.createDistribution(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}
