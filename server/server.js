'use strict'

const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

/**
 * Implementa o método CREATE RPC.
 */
const create = (call, callback) => {
  // ... lógica do método create
  const result = {
    id: Math.floor((Math.random() * 100) + 1),
    firstName: call.request.firstName,
    lastName: call.request.lastName
  }
  callback(null, result);
}

/**
 * Implementa o método READ RPC.
 */
const read = (call, callback) => {
  // ... lógica do método read
  const result = {
    id: call.request.id,
    firstName: 'Davi',
    lastName: 'Cunha'
  }
  callback(null, result);
}

/**
 * Implementa o método UPDATE RPC.
 */
const update = (call, callback) => {
  // ... lógica do método update
  const result = {
    id: call.request.id,
    firstName: 'Davi',
    lastName: 'Lara'
  }
  callback(null, result);
}

/**
 * Implementa o método DELETE RPC.
 */
const remove = (call, callback) => {
  // ... lógica do método delete
  const result = {
    id: null,
    firstName: null,
    lastName: null
  }
  callback(null, result);
}

/**
 * Inicia um servidor RPC que recebe solicitações para o serviço user
 */
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
  const methods = {
    create: create,
    read: read,
    update: update,
    remove: remove
  }

  const packageDefinition = protoLoader.loadSync('./user.proto', options);
  const user = grpc.loadPackageDefinition(packageDefinition).user;
  const server = new grpc.Server();

  server.addService(user.crud.service, methods);
  server.bind(`${host}:${port}`, grpc.ServerCredentials.createInsecure());
  console.log(`SERVER RUN ${host}:${port}`);
  server.start();
}

main();