// //SERVIDOR
// import net from 'net';
// import { promises as fs } from 'fs';
// import path from 'path';
// import { RequestType, ResponseType } from './types.js'; // Importamos los tipos de datos
// import { addFunko, eliminarFunko, listaFunkos, mostrarFunko, modificarFunko } from './funciones.js'; // Importamos las funciones para manejar los Funkos
export {};
// // Creamos el servidor
// net.createServer((socket) => {
//     console.log('Cliente conectado');
//     // Manejar la recepción de datos del cliente
//     socket.on('data', async (data) => {
//         const request: RequestType = JSON.parse(data.toString()); // Parseamos la solicitud del cliente
//         let response: ResponseType; // Inicializamos la respuesta
//         const userDir = path.join('./database', request.funkoPop?.usuario || ''); // Directorio del usuario
//         try {
//             switch (request.type) {
//                 case 'add': // Caso para añadir un Funko
//                     if (request.funkoPop) {
//                         await fs.mkdir(userDir, { recursive: true }); // Crear directorio del usuario si no existe
//                         const filePath = path.join(userDir, `${request.funkoPop.id}.json`); // Ruta del archivo del Funko
//                         if (await fs.access(filePath).then(() => true).catch(() => false)) {
//                             // Si el archivo ya existe, devolvemos un error
//                             response = {
//                                 type: 'add',
//                                 success: false,
//                                 message: 'Funko ya existe en la colección'
//                             };
//                         } else {
//                             // Si no existe, lo añadimos
//                             await fs.writeFile(filePath, JSON.stringify(request.funkoPop));
//                             response = {
//                                 type: 'add',
//                                 success: true,
//                                 message: 'Funko añadido correctamente'
//                             };
//                         }
//                     } else {
//                         // Si no se proporciona un Funko válido
//                         response = {
//                             type: 'error',
//                             success: false,
//                             message: 'No se ha proporcionado un Funko válido'
//                         };
//                     }
//                     break;
//                 case 'modify': // Caso para modificar un Funko
//                     if (request.funkoPop) {
//                         const filePath = path.join(userDir, `${request.funkoPop.id}.json`);
//                         if (await fs.access(filePath).then(() => true).catch(() => false)) {
//                             await fs.writeFile(filePath, JSON.stringify(request.funkoPop));
//                             response = {
//                                 type: 'modify',
//                                 success: true,
//                                 message: 'Funko modificado correctamente'
//                             };
//                         } else {
//                             response = {
//                                 type: 'modify',
//                                 success: false,
//                                 message: 'Funko no encontrado en la colección'
//                             };
//                         }
//                     } else {
//                         response = {
//                             type: 'error',
//                             success: false,
//                             message: 'No se ha proporcionado un Funko válido'
//                         };
//                     }
//                     break;
//                 case 'remove': // Caso para eliminar un Funko
//                     if (request.funkoPop) {
//                         const filePath = path.join(userDir, `${request.funkoPop.id}.json`);
//                         if (await fs.access(filePath).then(() => true).catch(() => false)) {
//                             await fs.unlink(filePath);
//                             response = {
//                                 type: 'remove',
//                                 success: true,
//                                 message: 'Funko eliminado correctamente'
//                             };
//                         } else {
//                             response = {
//                                 type: 'remove',
//                                 success: false,
//                                 message: 'Funko no encontrado en la colección'
//                             };
//                         }
//                     } else {
//                         response = {
//                             type: 'error',
//                             success: false,
//                             message: 'No se ha proporcionado un Funko válido'
//                         };
//                     }
//                     break;
//                 case 'read': // Caso para leer un Funko
//                     if (request.funkoPop) {
//                         const filePath = path.join(userDir, `${request.funkoPop.id}.json`);
//                         if (await fs.access(filePath).then(() => true).catch(() => false)) {
//                             const funkoData = await fs.readFile(filePath, 'utf8');
//                             response = {
//                                 type: 'read',
//                                 success: true,
//                                 message: 'Funko encontrado',
//                                 funkoPops: [JSON.parse(funkoData)]
//                             };
//                         } else {
//                             response = {
//                                 type: 'read',
//                                 success: false,
//                                 message: 'Funko no encontrado en la colección'
//                             };
//                         }
//                     } else {
//                         response = {
//                             type: 'error',
//                             success: false,
//                             message: 'No se ha proporcionado un Funko válido'
//                         };
//                     }
//                     break;
//                 case 'list': // Caso para listar todos los Funkos de un usuario
//                     if (await fs.access(userDir).then(() => true).catch(() => false)) {
//                         const files = await fs.readdir(userDir);
//                         const funkos = await Promise.all(files.map(async (file) => {
//                             const content = await fs.readFile(path.join(userDir, file), 'utf8');
//                             return JSON.parse(content);
//                         }));
//                         response = {
//                             type: 'list',
//                             success: true,
//                             message: 'Lista de Funkos',
//                             funkoPops: funkos
//                         };
//                     } else {
//                         response = {
//                             type: 'list',
//                             success: false,
//                             message: 'Usuario no tiene colección'
//                         };
//                     }
//                     break;
//                 default:
//                     // Caso para operaciones no soportadas
//                     response = {
//                         type: 'error',
//                         success: false,
//                         message: 'Tipo de operación no soportado'
//                     };
//             }
//         } catch (err) {
//             // Manejo de errores generales
//             response = {
//                 type: 'error',
//                 success: false,
//                 message: `Error procesando la solicitud: ${err instanceof Error ? err.message : 'Error desconocido'}`
//             };
//         }
//         // Enviar la respuesta al cliente
//         socket.write(JSON.stringify(response), () => {
//             socket.end(); // Cierra la conexión con el cliente después de enviar la respuesta
//         });
//     });
//     socket.on('end', () => {
//         console.log('Cliente desconectado'); // Mensaje cuando el cliente se desconecta
//     });
// }).listen(60300, () => {
//     console.log('Servidor escuchando en el puerto 60300'); // Mensaje cuando el servidor comienza a escuchar
// });
