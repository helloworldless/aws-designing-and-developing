const AWS = require("aws-sdk");
const helpers = require("./helpers");

AWS.config.update({ region: "us-east-1" });

// Declare local variables
// TODO: Create an autoscaling object
const autoscaling = new AWS.AutoScaling();

const lcName = "hamsterLC";
const roleName = "hamsterLCRole";
const sgName = "hamster_sg";
const keyName = "hamster_key";

helpers
  .createIamRole(roleName)
  .then((profileArn) => createLaunchConfiguration(lcName, profileArn))
  .then((data) => console.log(data));

function createLaunchConfiguration(lcName, profileArn) {
  // TODO: Create a launch configuration
  const params = {
    IamInstanceProfile: profileArn,
    ImageId: "ami-0242ab5ad45f1c5ee",
    InstanceType: "t2.micro",
    LaunchConfigurationName: lcName,
    KeyName: keyName,
    SecurityGroups: [sgName],
    UserData:
      "IyEvYmluL2Jhc2gNCnN1ZG8gYXB0LWdldCB1cGRhdGUNCnN1ZG8gYXB0LWdldCAteSBpbnN0YWxsIGdpdA0KZ2l0IGNsb25lIGh0dHBzOi8vZ2l0aHViLmNvbS9yeWFubXVyYWthbWkvaGJmbC5naXQgL2hvbWUvYml0bmFtaS9oYmZsDQpjaG93biAtUiBiaXRuYW1pOiAvaG9tZS9iaXRuYW1pL2hiZmwNCmNkIC9ob21lL2JpdG5hbWkvaGJmbA0Kc3VkbyBucG0gaQ0Kc3VkbyBucG0gcnVuIHN0YXJ0",
  };

  return new Promise((resolve, reject) => {
    autoscaling.createLaunchConfiguration(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}
