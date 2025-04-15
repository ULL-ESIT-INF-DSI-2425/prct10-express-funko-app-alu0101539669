// // Importación de módulos necesarios
// import { Funko } from "./funko.js";
// import { readFile, readdir, writeFile, unlink, access, mkdir } from 'fs';
// import chalk from "chalk";
// import { Genero, Tipo } from "./types.js";
// import fs from 'fs';
// import path from 'path';
export {};
// /**
//  * Función que lee todos los Funkos de un usuario
//  * @param usuario Usuario del que se quieren leer los Funkos
//  * @param callback Función de callback que recibe un array de Funkos del usuario
//  */
// export function leerFunkos(usuario: string, callback: (funkos: Funko[]) => void): void {
//   const nombre_usuario = usuario;
//   const path = "./database/" + nombre_usuario;
//   readdir(path, (err, filenames) => {
//     if (err) {
//       console.error(chalk.red(`Error reading directory: ${err.message}`));
//       callback([]);
//       return;
//     }
//     const lista_funkos: Funko[] = [];
//     let pending = filenames.length;
//     if (pending === 0) {
//       callback(lista_funkos);
//       return;
//     }
//     filenames.forEach((file) => {
//       readFile(path + "/" + file, 'utf8', (err, contenido) => {
//         if (!err) {
//           const json = JSON.parse(contenido);
//           lista_funkos.push(new Funko(json.nombre, json.descripcion, json.tipo, json.genero, json.franquicia, json.numero, json.exclusivo, json.caracteristicasEspeciales, json.valorMercado, json.ID));
//         }
//         if (--pending === 0) {
//           callback(lista_funkos);
//         }
//       });
//     });
//   });
// }
// /**
//  * Método que añade un Funko nuevo a la colección de un usuario
//  * @param id ID del Funko
//  * @param usuario Usuario al que deseamos añadir el Funko
//  * @param nombre Nombre del Funko
//  * @param descripcion Descripción del Funko
//  * @param tipo Tipo del Funko
//  * @param genero Género del Funko
//  * @param franquicia Franquicia del Funko
//  * @param numero Número del Funko
//  * @param exclusivo Indica si es exclusivo
//  * @param caracteristicasEspeciales Características especiales del Funko
//  * @param valorMercado Valor de mercado del Funko
//  * @param callback Función de callback que recibe un booleano indicando si se ha añadido correctamente
//  */
// export function addFunko(
//   id: number,
//   usuario: string,
//   nombre: string,
//   descripcion: string,
//   tipo: Tipo,
//   genero: Genero,
//   franquicia: string,
//   numero: number,
//   exclusivo: boolean,
//   caracteristicasEspeciales: string,
//   valorMercado: number,
//   callback: (success: boolean) => void
// ): void {
//   const nombre_usuario = usuario;
//   const path = "./database/" + nombre_usuario;
//   access(path, (err) => {
//     if (err) {
//       mkdir(path, (err) => {
//         if (err) {
//           console.error(chalk.red(`Error creating directory: ${err.message}`));
//           callback(false);
//           return;
//         }
//         checkAndAddFunko();
//       });
//     } else {
//       checkAndAddFunko();
//     }
//   });
//   function checkAndAddFunko() {
//     readdir(path, (err, filenames) => {
//       if (err) {
//         console.error(chalk.red(`Error reading directory: ${err.message}`));
//         callback(false);
//         return;
//       }
//       let funkoExists = false;
//       let pending = filenames.length;
//       if (pending === 0) {
//         addNewFunko();
//         return;
//       }
//       filenames.forEach((file) => {
//         readFile(path + "/" + file, 'utf8', (err, contenido) => {
//           if (!err) {
//             const json = JSON.parse(contenido);
//             if (json.ID === id) {
//               funkoExists = true;
//               console.log(chalk.red(`Funko already exists at ${json.user} collection!`));
//             }
//           }
//           if (--pending === 0) {
//             if (!funkoExists) {
//               addNewFunko();
//             } else {
//               callback(false);
//             }
//           }
//         });
//       });
//     });
//   }
//   function addNewFunko() {
//     const funco_aux = new Funko(nombre, descripcion, tipo, genero, franquicia, numero, exclusivo, caracteristicasEspeciales, valorMercado, id);
//     writeFile(path + "/" + nombre + ".json", JSON.stringify(funco_aux), (err) => {
//       if (err) {
//         console.error(chalk.red(`Error writing file: ${err.message}`));
//         callback(false);
//       } else {
//         console.log(chalk.green(`Funko added to ${usuario} collection!`));
//         callback(true);
//       }
//     });
//   }
// }
// /**
//  * Función que elimina un Funko de la colección de un usuario
//  * @param usuario Usuario del que se quiere eliminar el Funko
//  * @param ID_ ID del Funko a eliminar
//  * @param callback Función de callback que recibe un booleano indicando si se ha eliminado correctamente
//  */
// export function eliminarFunko(usuario: string, ID_: number, callback: (success: boolean) => void): void {
//   const nombre_usuario = usuario;
//   const path = "./database/" + nombre_usuario;
//   access(path, (err) => {
//     if (err) {
//       console.log(chalk.red(`User ${usuario} does not exist`));
//       callback(false);
//       return;
//     }
//     readdir(path, (err, filenames) => {
//       if (err) {
//         console.error(chalk.red(`Error reading directory: ${err.message}`));
//         callback(false);
//         return;
//       }
//       let funkoExists = false;
//       let nombre_aux = "";
//       let pending = filenames.length;
//       if (pending === 0) {
//         console.log(chalk.red(`Funko not found at ${usuario} collection!`));
//         callback(false);
//         return;
//       }
//       filenames.forEach((file) => {
//         readFile(path + "/" + file, 'utf8', (err, contenido) => {
//           if (!err) {
//             const json = JSON.parse(contenido);
//             if (json.ID === ID_) {
//               funkoExists = true;
//               nombre_aux = json.nombre;
//             }
//           }
//           if (--pending === 0) {
//             if (funkoExists) {
//               unlink(path + "/" + nombre_aux + ".json", (err) => {
//                 if (err) {
//                   console.error(chalk.red(`Error deleting file: ${err.message}`));
//                   callback(false);
//                 } else {
//                   console.log(chalk.green(`Funko removed from ${usuario} collection!`));
//                   callback(true);
//                 }
//               });
//             } else {
//               console.log(chalk.red(`Funko not found at ${usuario} collection!`));
//               callback(false);
//             }
//           }
//         });
//       });
//     });
//   });
// }
// /**
//  * Función que modifica un Funko de la colección de un usuario
//  * @param id ID del Funko
//  * @param usuario Nombre del usuario
//  * @param nombre Nombre del Funko
//  * @param descripcion Descripción del Funko
//  * @param tipo Tipo del Funko
//  * @param genero Género del Funko
//  * @param franquicia Franquicia del Funko
//  * @param numero Número del Funko
//  * @param exclusivo Indica si es exclusivo
//  * @param caracteristicasEspeciales Características especiales del Funko
//  * @param valorMercado Valor de mercado del Funko
//  * @param callback Función de callback que recibe un booleano indicando si se ha modificado correctamente
//  */
// export function modificarFunko(
//   id: number,
//   usuario: string,
//   nombre: string,
//   descripcion: string,
//   tipo: Tipo,
//   genero: Genero,
//   franquicia: string,
//   numero: number,
//   exclusivo: boolean,
//   caracteristicasEspeciales: string,
//   valorMercado: number,
//   callback: (success: boolean) => void
// ): void {
//   const nombre_usuario = usuario;
//   const path = "./database/" + nombre_usuario;
//   access(path, (err) => {
//     if (err) {
//       console.log(chalk.red(`User ${usuario} does not exist`));
//       callback(false);
//       return;
//     }
//     readdir(path, (err, filenames) => {
//       if (err) {
//         console.error(chalk.red(`Error reading directory: ${err.message}`));
//         callback(false);
//         return;
//       }
//       let funkoExists = false;
//       let nombre_aux = "";
//       let pending = filenames.length;
//       if (pending === 0) {
//         console.log(chalk.red(`Funko not found at ${usuario} collection!`));
//         callback(false);
//         return;
//       }
//       filenames.forEach((file) => {
//         readFile(path + "/" + file, 'utf8', (err, contenido) => {
//           if (!err) {
//             const json = JSON.parse(contenido);
//             if (json.ID === id) {
//               funkoExists = true;
//               nombre_aux = json.nombre;
//             }
//           }
//           if (--pending === 0) {
//             if (funkoExists) {
//               unlink(path + "/" + nombre_aux + ".json", (err) => {
//                 if (err) {
//                   console.error(chalk.red(`Error deleting file: ${err.message}`));
//                   callback(false);
//                 } else {
//                   const funco_aux = new Funko(nombre, descripcion, tipo, genero, franquicia, numero, exclusivo, caracteristicasEspeciales, valorMercado, id);
//                   writeFile(path + "/" + nombre + ".json", JSON.stringify(funco_aux), (err) => {
//                     if (err) {
//                       console.error(chalk.red(`Error writing file: ${err.message}`));
//                       callback(false);
//                     } else {
//                       console.log(chalk.green(`Funko modified at ${usuario} collection!`));
//                       callback(true);
//                     }
//                   });
//                 }
//               });
//             } else {
//               console.log(chalk.red(`Funko not found at ${usuario} collection!`));
//               callback(false);
//             }
//           }
//         });
//       });
//     });
//   });
// }
// /**
//  * Función que lista los Funkos de un usuario
//  * @param usuario Nombre del usuario
//  * @param callback Función de callback que recibe un booleano indicando si se ha listado correctamente
//  */
// export function listaFunkos(usuario: string, callback: (success: boolean) => void): void {
//   const nombre_usuario = usuario;
//   const path = "./database/" + nombre_usuario;
//   access(path, (err) => {
//     if (err) {
//       console.log(chalk.red(`User ${usuario} does not exist`));
//       callback(false);
//       return;
//     }
//     leerFunkos(usuario, (lista_funkos) => {
//       if (lista_funkos.length === 0) {
//         console.log(chalk.red("No funkos in the collection"));
//         callback(false);
//         return;
//       }
//       console.log(chalk.white(`${usuario} Funko Pop collection:`));
//       lista_funkos.forEach((funko) => {
//         console.log(chalk.white("-----------------------------------"));
//         console.log(chalk.white(`ID: ${funko.getID}`));
//         console.log(chalk.white(`Nombre: ${funko.getNombre}`));
//         console.log(chalk.white(`Descripcion: ${funko.getDescripcion}`));
//         console.log(chalk.white(`Tipo: ${funko.getTipo}`));
//         console.log(chalk.white(`Genero: ${funko.getGenero}`));
//         console.log(chalk.white(`Franquicia: ${funko.getFranquicia}`));
//         console.log(chalk.white(`Numero: ${funko.getNumero}`));
//         console.log(chalk.white(`Exclusivo: ${funko.getExclusivo}`));
//         console.log(chalk.white(`Caracteristicas Especiales: ${funko.getCaracteristicasEspeciales}`));
//         if (funko.getValorMercado <= 50) {
//           console.log(chalk.green(`Valor de mercado: ${funko.getValorMercado}`));
//         }
//         else if (funko.getValorMercado > 50 && funko.getValorMercado <= 100) {
//           console.log(chalk.yellow(`Valor de mercado: ${funko.getValorMercado}`));
//         }
//         else if (funko.getValorMercado > 100 && funko.getValorMercado <= 200) {
//           console.log(chalk.red(`Valor de mercado: ${funko.getValorMercado}`));
//         }    
//         else {
//           console.log(chalk.blue(`Valor de mercado: ${funko.getValorMercado}`));
//         }
//         console.log();
//       });
//       callback(true);
//     });
//   });
// }
// /**
//  * Función que muestra un Funko
//  * @param usuario Nombre del usuario
//  * @param id Identificador del Funko
//  * @param callback Función de callback que recibe un booleano indicando si se ha mostrado correctamente
//  */
// export function mostrarFunko(usuario: string, id: number, callback: (success: boolean) => void): void {
//   const nombre_usuario = usuario;
//   const path = "./database/" + nombre_usuario;
//   access(path, (err) => {
//     if (err) {
//       console.log(chalk.red(`User ${usuario} does not exist`));
//       callback(false);
//       return;
//     }
//     readdir(path, (err, filenames) => {
//       if (err) {
//         console.error(chalk.red(`Error reading directory: ${err.message}`));
//         callback(false);
//         return;
//       }
//       let funkoExists = false;
//       let mi_funko: Funko | null = null;
//       let pending = filenames.length;
//       if (pending === 0) {
//         console.log(chalk.red(`Funko with ID ${id} does not exist`));
//         callback(false);
//         return;
//       }
//       filenames.forEach((file) => {
//         readFile(path + "/" + file, 'utf8', (err, contenido) => {
//           if (!err) {
//             const json = JSON.parse(contenido);
//             if (json.ID === id) {
//               funkoExists = true;
//               mi_funko = new Funko(json.nombre, json.descripcion, json.tipo, json.genero, json.franquicia, json.numero, json.exclusivo, json.caracteristicasEspeciales, json.valorMercado, json.ID);
//             }
//           }
//           if (--pending === 0) {
//             if (funkoExists && mi_funko) {
//               console.log(chalk.white("-----------------------------------"));
//               console.log(chalk.white(`ID: ${mi_funko.getID}`));
//               console.log(chalk.white(`Nombre: ${mi_funko.getNombre}`));
//               console.log(chalk.white(`Descripcion: ${mi_funko.getDescripcion}`));
//               console.log(chalk.white(`Tipo: ${mi_funko.getTipo}`));
//               console.log(chalk.white(`Genero: ${mi_funko.getGenero}`));
//               console.log(chalk.white(`Franquicia: ${mi_funko.getFranquicia}`));
//               console.log(chalk.white(`Numero: ${mi_funko.getNumero}`));
//               console.log(chalk.white(`Exclusivo: ${mi_funko.getExclusivo}`));
//               console.log(chalk.white(`Caracteristicas Especiales: ${mi_funko.getCaracteristicasEspeciales}`));
//               if (mi_funko.getValorMercado <= 50) {
//                 console.log(chalk.green(`Valor de mercado: ${mi_funko.getValorMercado}`));
//               }
//               else if (mi_funko.getValorMercado > 50 && mi_funko.getValorMercado <= 100) {
//                 console.log(chalk.yellow(`Valor de mercado: ${mi_funko.getValorMercado}`));
//               }
//               else if (mi_funko.getValorMercado > 100 && mi_funko.getValorMercado <= 200) {
//                 console.log(chalk.red(`Valor de mercado: ${mi_funko.getValorMercado}`));
//               }    
//               else {
//                 console.log(chalk.blue(`Valor de mercado: ${mi_funko.getValorMercado}`));
//               }
//               console.log();
//               callback(true);
//             } else {
//               console.log(chalk.red(`Funko with ID ${id} does not exist`));
//               callback(false);
//             }
//           }
//         });
//       });
//     });
//   });
// }
