const AWS = require("aws-sdk");

AWS.config.update({ region: "us-east-1" });

process.on("unhandledRejection", (err) => {
  console.error(err);
  process.exit(1);
});

const apig = new AWS.APIGateway();
const apiName = "hamster-api";

let apiData;

function trace(param) {
  console.log("trace", param);
  return Promise.resolve(param);
}

createRestApi(apiName)
  .then((data) => {
    apiData = data;
    return getRootResource(apiData);
  })
  .then(trace)
  .then((rootResourceId) => createResource(rootResourceId, "hbfl", apiData))
  .then(trace)
  .then((hbflResourceId) =>
    createResourceMethod(hbflResourceId, "GET", apiData)
  )
  .then(trace)
  .then((hbflResourceId) =>
    createMethodIntegration(hbflResourceId, "GET", apiData)
  )
  .then(trace)
  .then((hbflResourceId) => createResource(hbflResourceId, "{proxy+}", apiData))
  .then(trace)
  .then((proxyResourceId) =>
    createResourceMethod(proxyResourceId, "ANY", apiData, "proxy")
  )
  .then(trace)
  .then((proxyResourceId) =>
    createMethodIntegration(proxyResourceId, "ANY", apiData, "proxy")
  )
  .then(trace)
  .then((data) => console.log(data))
  .catch(console.error);
function createRestApi(apiName) {
  const params = {
    name: apiName,
  };

  return new Promise((resolve, reject) => {
    apig.createRestApi(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

function getRootResource(api) {
  const params = {
    restApiId: api.id,
  };

  return new Promise((resolve, reject) => {
    apig.getResources(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.items.find((item) => item.path === "/").id);
      }
    });
  });
}

function createResource(parentResourceId, resourcePath, api) {
  const params = {
    parentId: parentResourceId,
    pathPart: resourcePath,
    restApiId: api.id,
  };

  return new Promise((resolve, reject) => {
    apig.createResource(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.id);
      }
    });
  });
}

function createResourceMethod(resourceId, method, api, path) {
  const params = {
    authorizationType: "NONE",
    httpMethod: method,
    resourceId: resourceId,
    restApiId: api.id,
  };

  if (path) {
    params.requestParameters = {
      [`method.request.path.${path}`]: true,
    };
  }

  return new Promise((resolve, reject) => {
    apig.putMethod(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(resourceId);
      }
    });
  });
}

function createMethodIntegration(resourceId, method, api, path) {
  const params = {
    httpMethod: method,
    resourceId: resourceId,
    restApiId: api.id,
    integrationHttpMethod: method,
    type: "HTTP_PROXY",
    uri: "http://hamsterELB-1640593625.us-east-1.elb.amazonaws.com",
  };

  if (path) {
    params.uri += `/{${path}}`;
    params.requestParameters = {
      [`integration.request.path.${path}`]: `method.request.path.${path}`,
    };
  }

  return new Promise((resolve, reject) => {
    apig.putIntegration(params, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(resourceId);
      }
    });
  });
}
