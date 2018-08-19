'use strict'

const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const main = () => {
  const host = (process.env.GRPC_HOST || 'server')
  const port = (process.env.GRPC_PORT || 50051)

  const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  }
  const packageDefinition = protoLoader.loadSync('./user.proto', options);
  const user = grpc.loadPackageDefinition(packageDefinition).user;

  const client = new user.crud(`${host}:${port}`, grpc.credentials.createInsecure());

  // Chamada ao método remoto CREATE
  client.create({firstName: 'Eugenio', lastName: 'Cunha'}, (err, res) => {
    console.log(`CREATE {id:${res.id}, firstName:'${res.firstName}', lastName:'${res.lastName}'}\n`);
  });

  // Chamada ao método remoto READ
  client.read({id: 18}, (err, res) => {
    console.log(`READ {id:${res.id}, firstName:'${res.firstName}', lastName:'${res.lastName}'}\n`);
  });

  // Chamada ao método remoto UPDATE
  client.update({id: 18, firstName: 'Davi', lastName: 'Cunha'}, (err, res) => {
    console.log(`UPDATE {id:${res.id}, firstName:'${res.firstName}', lastName:'${res.lastName}'}\n`);
  });

  // Chamada ao método remoto REMOVE
  client.remove({id: 18, firstName: 'Davi', lastName: 'Cunha'}, (err, res) => {
    console.log(`DELETE {id:${res.id}, firstName:'${res.firstName}', lastName:'${res.lastName}'}\n`);
  });
}

main();