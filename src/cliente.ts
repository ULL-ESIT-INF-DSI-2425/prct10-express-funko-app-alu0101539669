// // Importamos los módulos necesarios
// import net from 'net';
// import yargs from 'yargs';
// import { hideBin } from 'yargs/helpers'; 
// import { Genero, Tipo, RequestType } from './types.js'; // Importamos los tipos de datos

// // Establecemos la conexión con el servidor
// const client = net.connect({port: 60300}, () => {
//   console.log('Connected to server!');
// });

// // Manejar la respuesta del servidor
// client.on('data', (data) => {
//   const response = JSON.parse(data.toString()); 
//   if (response.type === 'error') {
//     console.error(`Error: ${response.message}`);
//   } else {
//     console.log(`Response: ${response.message}`);
//     if (response.funkoPops) {
//       console.log('Funkos:', response.funkoPops);
//     }
//   }
// });

// // Definimos los comandos de yargs para interactuar con el servidor
// yargs(hideBin(process.argv)).command('add', 'Añade un Funko', {
//   user: { type: 'string', demandOption: true },
//   id: { type: 'number', demandOption: true },
//   nombre: { type: 'string', demandOption: true },
//   descripcion: { type: 'string', demandOption: true },
//   tipo: { type: 'string', demandOption: true },
//   genero: { type: 'string', demandOption: true },
//   franquicia: { type: 'string', demandOption: true },
//   numero: { type: 'number', demandOption: true },
//   exclusivo: { type: 'boolean', demandOption: true },
//   caracteristicasEspeciales: { type: 'string', demandOption: true },
//   valorMercado: { type: 'number', demandOption: true }
// }, (args) => {
//   const request: RequestType = {
//     type: 'add',
//     funkoPop: {
//       id: args.id,
//       usuario: args.user,
//       nombre: args.nombre,
//       descripcion: args.descripcion,
//       tipo: args.tipo as Tipo,
//       genero: args.genero as Genero,
//       franquicia: args.franquicia,
//       numero: args.numero,
//       exclusivo: args.exclusivo,
//       caracteristicasEspeciales: args.caracteristicasEspeciales,
//       valorMercado: args.valorMercado
//     }
//   };
//   client.write(JSON.stringify(request));
//   console.log(`Request sent: ${JSON.stringify(request)}`);
// }
// ).help().argv;

// yargs(hideBin(process.argv)).command('remove', 'Elimina un Funko', {
//   user: { type: 'string', demandOption: true },
//   id: { type: 'number', demandOption: true }
// }, (args) => {
//   const request: RequestType = {
//     type: 'remove',
//     funkoPop: {
//       id: args.id,
//       usuario: args.user,
//       nombre: '',
//       descripcion: '',
//       tipo: Tipo.Pop,
//       genero: Genero.Animacion,
//       franquicia: '',
//       numero: 0,
//       exclusivo: false,
//       caracteristicasEspeciales: '',
//       valorMercado: 0
//     }
//   };
//   client.write(JSON.stringify(request));
//   console.log(`Request sent: ${JSON.stringify(request)}`);
// }
// ).help().argv;

// yargs(hideBin(process.argv)).command('modify', 'Modifica un Funko', {
//   user: { type: 'string', demandOption: true },
//   id: { type: 'number', demandOption: true },
//   nombre: { type: 'string', demandOption: true },
//   descripcion: { type: 'string', demandOption: true },
//   tipo: { type: 'string', demandOption: true },
//   genero: { type: 'string', demandOption: true },
//   franquicia: { type: 'string', demandOption: true },
//   numero: { type: 'number', demandOption: true },
//   exclusivo: { type: 'boolean', demandOption: true },
//   caracteristicasEspeciales: { type: 'string', demandOption: true },
//   valorMercado: { type: 'number', demandOption: true }
// }, (args) => {
//   const request: RequestType = {
//     type: 'modify',
//     funkoPop: {
//       id: args.id,
//       usuario: args.user,
//       nombre: args.nombre,
//       descripcion: args.descripcion,
//       tipo: args.tipo as Tipo,
//       genero: args.genero as Genero,
//       franquicia: args.franquicia,
//       numero: args.numero,
//       exclusivo: args.exclusivo,
//       caracteristicasEspeciales: args.caracteristicasEspeciales,
//       valorMercado: args.valorMercado
//     }
//   };
//   client.write(JSON.stringify(request));
//   console.log(`Request sent: ${JSON.stringify(request)}`);
// }
// ).help().argv;

// yargs(hideBin(process.argv)).command('list', 'Lista los Funkos de un usuario', {
//   user: { type: 'string', demandOption: true }
// }, (args) => {
//   const request: RequestType = {
//     type: 'list',
//     funkoPop: {
//       id: 0,
//       usuario: args.user,
//       nombre: '',
//       descripcion: '',
//       tipo: Tipo.Pop,
//       genero: Genero.Animacion,
//       franquicia: '',
//       numero: 0,
//       exclusivo: false,
//       caracteristicasEspeciales: '',
//       valorMercado: 0
//     }
//   };
//   client.write(JSON.stringify(request));
//   console.log(`Request sent: ${JSON.stringify(request)}`);
// }
// ).help().argv;

// yargs(hideBin(process.argv)).command('read', 'Lee un Funko específico', {
//   user: { type: 'string', demandOption: true },
//   id: { type: 'number', demandOption: true }
// }, (args) => {
//   const request: RequestType = {
//     type: 'read',
//     funkoPop: {
//       id: args.id,
//       usuario: args.user,
//       nombre: '',
//       descripcion: '',
//       tipo: Tipo.Pop,
//       genero: Genero.Animacion,
//       franquicia: '',
//       numero: 0,
//       exclusivo: false,
//       caracteristicasEspeciales: '',
//       valorMercado: 0
//     }
//   };
//   client.write(JSON.stringify(request));
//   console.log(`Request sent: ${JSON.stringify(request)}`);
// }
// ).help().argv;
