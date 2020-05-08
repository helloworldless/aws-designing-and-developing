const AWS = require('aws-sdk')

AWS.config.update({ region: '/* TODO: Add your region */' })

const hzName = 'hbfl.online'

// Didn't do this part of the course

createHostedZone(hzName)
.then(data => console.log(data))

function createHostedZone (hzName) {
  // TODO: Create params const

  return new Promise((resolve, reject) => {
    // TODO: Create hostedzone with route53
  })
}
