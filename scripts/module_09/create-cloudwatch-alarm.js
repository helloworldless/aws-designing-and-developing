const AWS = require("aws-sdk");

AWS.config.update({ region: "us-east-1" });

const cw = new AWS.CloudWatch();
const alarmName = "hamster-elb-alarm";
const topicArn = "arn:aws:sns:us-east-1:605414079101:hamster-topic";
const tg = "targetgroup/hamsterTG/5827023948a8edc6";
const lb = "app/hamsterELB/e0eaef77f07feeea";

createCloudWatchAlarm(alarmName, topicArn, tg, lb).then((data) =>
  console.log(data)
);

function createCloudWatchAlarm(alarmName, topicArn, tg, lb) {
  const params = {
    AlarmName: alarmName,
    ComparisonOperator: "LessThanThreshold",
    Threshold: 1,
    EvaluationPeriods: 1,
    Period: 60,
    MetricName: "HealthyHostCount",
    Namespace: "AWS/ApplicationELB",
    AlarmActions: [topicArn],
    Dimensions: [
      { Name: "TargetGroup", Value: tg },
      { Name: "LoadBalancer", Value: lb },
    ],
    Statistic: "Average",
    TreatMissingData: "breaching",
  };

  return new Promise((resolve, reject) => {
    cw.putMetricAlarm(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}
