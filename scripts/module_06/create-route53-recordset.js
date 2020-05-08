const AWS = require('aws-sdk')

AWS.config.update({ region: '/* TODO: Add your region */' })

const route53 = new AWS.Route53()
const hzId = '/* TODO: Add your hostedzone id */'

// Didn't do this part of the course

createRecordSet(hzId)
.then(data => console.log(data))

function createRecordSet (hzId) {
  // TODO: Create params const
  // Link to ELB Regions:
  // https://docs.aws.amazon.com/general/latest/gr/elb.html

  return new Promise((resolve, reject) => {
    // TODO: Create record set
  })
}
