const {Client} = require('@elastic/elasticsearch')
const connClass = require('http-aws-es')
const AWS = require('aws-sdk')

const client = new Client({
  hosts: [ 'https://amazon-es-host.us-east-1.es.amazonaws.com' ],
  //Elasticsearch Node goes here
  node: '',
  connectionClass: connClass
});

exports.handler = async (event) => {
  try {
    console.log("Inside elasticSearchPing function!!!!");
	console.log(JSON.stringify(AWS.config, null, 2))
    const res = await client.ping({}, {"requestTimeout": 900000});
    console.log("Res: ", JSON.stringify(res, null, 2));
    return {
      "statusCode": 200,
      "body": JSON.stringify({"message": "Connection successful with elasticSearch."})
    };
  } catch (err) {
    console.log("err: ", JSON.stringify(err, null, 4));
    return {
      "statusCode": err.statusCode || 500,
      "headers": {"Content-Type": "text/plain"},
      "body": "Error connecting elasticsearch."
    };
  }
}