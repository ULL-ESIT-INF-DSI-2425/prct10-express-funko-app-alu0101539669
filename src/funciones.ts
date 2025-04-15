// Importación de módulos necesarios
import { Funko } from "./funko.js";
import { readFileSync, readdirSync, writeFileSync, unlinkSync, existsSync, mkdirSync } from 'fs';
import chalk from "chalk";
import { Genero, Tipo } from "./type.js";
import fs from 'fs';
import path from 'path';

/**
 * Función que lee todos los Funkos de un usuario
 * @param usuario Usuario del que se quieren leer los Funkos
 * @returns Array de Funkos del usuario
 */
export function leerFunkos(usuario: string): Funko[] {
  const nombre_usuario = usuario;   // nombre del usuario
  const filenames = readdirSync("./database/" + nombre_usuario);  // leer los ficheros de la carpeta del usuario
  const lista_funkos: Funko[] = []; // lista de funkos del usuario

  filenames.forEach((file) => { // recorrer los ficheros
    const contenido = readFileSync("./database/" + nombre_usuario + "/" + file, 'utf8');  // leer el contenido del fichero
    const json = JSON.parse(contenido); // parsear el contenido del fichero
    // crear un funko con los datos del fichero
    lista_funkos.push(new Funko(json.nombre, json.descripcion, json.tipo, json.genero, json.franquicia, json.numero, json.exclusivo, json.caracteristicasEspeciales, json.valorMercado, json.ID));
  });
  
  return lista_funkos;
}
 
/**
 * Método que añade un Funko nuevo a la colección de un usuario
 * @param id ID del Funko
 * @param usuario Usuario al que deseamos añadir el Funko
 * @param nombre Nombre del Funko
 * @param descripcion Descripción del Funko
 * @param tipo Tipo del Funko
 * @param genero Género del Funko
 * @param franquicia Franquicia del Funko
 * @param numero Número del Funko
 * @param exclusivo Indica si es exclusivo
 * @param caracteristicasEspeciales Características especiales del Funko
 * @param valorMercado Valor de mercado del Funko
 * @returns true si se ha añadido correctamente, false si no
 */
export function addFunko(
  id: number,
  usuario: string,
  nombre: string,
  descripcion: string,
  tipo: Tipo,
  genero: Genero,
  franquicia: string,
  numero: number,
  exclusivo: boolean,
  caracteristicasEspeciales: string,
  valorMercado: number
): boolean {
  // 1. comprobar que el usuario existe
  const nombre_usuario = usuario;
  const path = "./database/" + nombre_usuario;  // path de la carpeta del usuario
  
  if (existsSync(path) === false) {
    // si no existe la carpeta del usuario, la creo
    mkdirSync("./database/" + nombre_usuario);  // creo la carpeta del usuario
  }
  
  // 2. comprobar que el funko no existe
  const filenames = readdirSync("./database/" + nombre_usuario);  // leer los ficheros de la carpeta del usuario
  let bandera = true; // bandera para comprobar si el funko ya existe
  // recorrer los ficheros de la carpeta del usuario
  filenames.forEach((file) => { 
    const contenido = readFileSync("./database/" + nombre_usuario + "/" + file, 'utf8');
    const json = JSON.parse(contenido); 
    // si el id del funko es igual al id que se quiere añadir, el funko ya existe
    if (json.ID === id) {
      bandera = false;  
      console.log(chalk.red(`Funko already exists at ${json.user} collection!`));
    }
  });

  // 3. si el funko no existe, lo añado
  if (bandera === true) {
    const array_tipos = Object.values(Tipo);  // array de tipos
    let bandera_tipo = false; // bandera para comprobar si el tipo existe
    // recorrer el array de tipos
    array_tipos.forEach((tipo_aux) => { 
      if (tipo_aux === tipo) {
        bandera_tipo = true;
      }
    });
    // si el tipo no existe, muestro un mensaje de error
    if (bandera_tipo === false) {
      console.log(chalk.red(`Tipo ${tipo} does not exist`));
      return false;
    }

    const array_generos = Object.values(Genero);  // array de generos
    let bandera_genero = false; // bandera para comprobar si el genero existe
    // recorrer el array de generos
    array_generos.forEach((genero_aux) => { 
      if (genero_aux === genero) {
        bandera_genero = true;
      }
    });
    // si el genero no existe, muestro un mensaje de error
    if (bandera_genero === false) {
      console.log(chalk.red(`Genero ${genero} does not exist`));
      return false;
    }
    // si el funko no existe, lo añado
    const funco_aux = new Funko(nombre, descripcion, tipo, genero, franquicia, numero, exclusivo, caracteristicasEspeciales, valorMercado, id);
    writeFileSync("./database/" + usuario + "/" + nombre + ".json", JSON.stringify(funco_aux)); // escribir el funko en un fichero , JSON.stringify convierte un objeto o valor de JavaScript en una cadena de texto JSON
    console.log(chalk.green(`Funko added to ${usuario} collection!`));  // mensaje de éxito
  }
  return bandera;
}

/**
 * Función que elimina un Funko de la colección de un usuario
 * @param usuario Usuario del que se quiere eliminar el Funko
 * @param ID_ ID del Funko a eliminar
 * @returns true si se ha eliminado correctamente, false si no
 */
export function eliminarFunko(usuario: string, ID_: number): boolean {
  // 1. comprobar que el usuario existe
  const nombre_usuario = usuario;
  const path = "./database/" + nombre_usuario;
  if (existsSync(path) === false) {
    console.log(chalk.red(`User ${usuario} does not exist`));
    return false;
  }
  const filenames = readdirSync("./database/" + nombre_usuario); 

  // comprobar que el funko existe
  let bandera = false;
  let nombre_aux = 0;
  // recorrer los ficheros de la carpeta del usuario
  filenames.forEach((file) => {
    const contenido = readFileSync("./database/" + nombre_usuario + "/" + file, 'utf8');
    const json = JSON.parse(contenido); // JSON.parse convierte una cadena de texto JSON en un objeto de JavaScript
    // si el id del funko es igual al id que se quiere eliminar, el funko existe
    if (json.ID === ID_) { 
      bandera = true;
      nombre_aux = json.nombre;
    }
  });

  // si el funko no existe, muestro un mensaje de error
  if (bandera === false) {
    console.log(chalk.red(`Funko not found at ${usuario} collection!`));
    return false;
  }
  // si el funko existe, elimino el fichero correspondiente
  else {
    
    unlinkSync("./database/" + usuario + "/" + nombre_aux + ".json");
    console.log(chalk.green(`Funko removed from ${usuario} collection!`));
    return true;
  }

}

/**
 * Función que modifica un Funko de la colección de un usuario
 * @param id ID del Funko
 * @param usuario Nombre del usuario
 * @param nombre Nombre del Funko
 * @param descripcion Descripción del Funko
 * @param tipo Tipo del Funko
 * @param genero Género del Funko
 * @param franquicia Franquicia del Funko
 * @param numero Número del Funko
 * @param exclusivo Indica si es exclusivo
 * @param caracteristicasEspeciales Características especiales del Funko
 * @param valorMercado Valor de mercado del Funko
 * @returns true si se ha modificado correctamente, false si no
 */
export function modificarFunko(
  id: number,
  usuario: string,
  nombre: string,
  descripcion: string,
  tipo: Tipo,
  genero: Genero,
  franquicia: string,
  numero: number,
  exclusivo: boolean,
  caracteristicasEspeciales: string,
  valorMercado: number
): boolean {
  // 1. comprobar que el usuario existe
  const nombre_usuario = usuario;
  const path = "./database/" + nombre_usuario;
  if (existsSync(path) === false) {
    console.log(chalk.red(`User ${usuario} does not exist`));
    return false;
  }
  const filenames = readdirSync("./database/" + nombre_usuario);

  // comprobar que el funko existe
  let bandera = false;
  let nombre_aux = 0;
  filenames.forEach((file) => {
    const contenido = readFileSync("./database/" + nombre_usuario + "/" + file, 'utf8');
    const json = JSON.parse(contenido);
    if (json.ID == id) {
      // el funko ya existe
      bandera = true;
      nombre_aux = json.nombre;
    }
  });

  if (bandera === false) {
    console.log(chalk.red(`Funko not found at ${usuario} collection!`));
    return false;
  }
  else {
    const array_tipos = Object.values(Tipo);
    let bandera_tipo = false;
    array_tipos.forEach((tipo_aux) => {
      if (tipo_aux === tipo) {
        bandera_tipo = true;
      }
    });
    if (bandera_tipo === false) {
      console.log(chalk.red(`Tipo ${tipo} does not exist`));
      return false;
    }

    const array_generos = Object.values(Genero);
    let bandera_genero = false;
    array_generos.forEach((genero_aux) => {
      if (genero_aux === genero) {
        bandera_genero = true;
      }
    });
    if (bandera_genero === false) {
      console.log(chalk.red(`Genero ${genero} does not exist`));
      return false;
    }
    // eliminar el fichero correspondiente al funko
    unlinkSync("./database/" + usuario + "/" + nombre_aux + ".json"); 
    // crear el nuevo funko
    const funco_aux = new Funko(nombre, descripcion, tipo, genero, franquicia, numero, exclusivo, caracteristicasEspeciales, valorMercado, id);
    writeFileSync("./database/" + usuario + "/" + nombre + ".json", JSON.stringify(funco_aux));
    console.log(chalk.green(`Funko modified at ${usuario} collection!`));
    return true;
  }

}

/**
 * Función que lista los Funkos de un usuario
 * @param usuario Nombre del usuario
 * @returns true si se ha listado correctamente, false si no
 */
export function listaFunkos(usuario: string): boolean {
  // leer todos los funkos de un usuario
  const nombre_usuario = usuario;
  const path = "./database/" + nombre_usuario;
  if (existsSync(path) === false) {
    console.log(chalk.red(`User ${usuario} does not exist`));
    return false;
  }
  const lista_funkos = leerFunkos(usuario);
  if (lista_funkos.length === 0) {
    console.log(chalk.red("No funkos in the collection"));
    return false;
  }
  console.log(chalk.white(`${usuario} Funko Pop collection:`));
  lista_funkos.forEach((funko) => {
    console.log(chalk.white("-----------------------------------"));
    console.log(chalk.white(`ID: ${funko.getID}`));
    console.log(chalk.white(`Nombre: ${funko.getNombre}`));
    console.log(chalk.white(`Descripcion: ${funko.getDescripcion}`));
    console.log(chalk.white(`Tipo: ${funko.getTipo}`));
    console.log(chalk.white(`Genero: ${funko.getGenero}`));
    console.log(chalk.white(`Franquicia: ${funko.getFranquicia}`));
    console.log(chalk.white(`Numero: ${funko.getNumero}`));
    console.log(chalk.white(`Exclusivo: ${funko.getExclusivo}`));
    console.log(chalk.white(`Caracteristicas Especiales: ${funko.getCaracteristicasEspeciales}`));
    if (funko.getValorMercado <= 50) {
      console.log(chalk.green(`Valor de mercado: ${funko.getValorMercado}`));
    }
    else if (funko.getValorMercado > 50 && funko.getValorMercado <= 100) {
      console.log(chalk.yellow(`Valor de mercado: ${funko.getValorMercado}`));
    }
    else if (funko.getValorMercado > 100 && funko.getValorMercado <= 200) {
      console.log(chalk.red(`Valor de mercado: ${funko.getValorMercado}`));
    }    
    else {
      console.log(chalk.blue(`Valor de mercado: ${funko.getValorMercado}`));
    }
    console.log();
  });
  return true;

}

/**
 * Función que muestra un Funko
 * @param usuario Nombre del usuario
 * @param id Identificador del Funko
 * @returns true si se ha mostrado correctamente, false si no
 */
export function mostrarFunko(usuario: string, id: number): boolean {
  let mi_funko: Funko;
  // 1. comporbar que el usuario existe
  const nombre_usuario = usuario;
  const path = "./database/" + nombre_usuario;
  if (existsSync(path) === false) {
    console.log(chalk.red(`User ${usuario} does not exist`));
    return false;
  }
  // 2. comprobar que el fichero existe
  const filenames = readdirSync("./database/" + nombre_usuario);
  let bandera = false;
  filenames.forEach((file) => {
    const contenido = readFileSync("./database/" + nombre_usuario + "/" + file, 'utf8');
    const json = JSON.parse(contenido);
    if ((json.ID === id) && (bandera === false)) {
      // el funko ya existe
      bandera = true;
      mi_funko = new Funko(json.nombre, json.descripcion, json.tipo, json.genero, json.franquicia, json.numero, json.exclusivo, json.caracteristicasEspeciales, json.valorMercado, json.ID);
      console.log(chalk.white("-----------------------------------"));
      console.log(chalk.white(`ID: ${mi_funko.getID}`));
      console.log(chalk.white(`Nombre: ${mi_funko.getNombre}`));
      console.log(chalk.white(`Descripcion: ${mi_funko.getDescripcion}`));
      console.log(chalk.white(`Tipo: ${mi_funko.getTipo}`));
      console.log(chalk.white(`Genero: ${mi_funko.getGenero}`));
      console.log(chalk.white(`Franquicia: ${mi_funko.getFranquicia}`));
      console.log(chalk.white(`Numero: ${mi_funko.getNumero}`));
      console.log(chalk.white(`Exclusivo: ${mi_funko.getExclusivo}`));
      console.log(chalk.white(`Caracteristicas Especiales: ${mi_funko.getCaracteristicasEspeciales}`));
      if (mi_funko.getValorMercado <= 50) {
        console.log(chalk.green(`Valor de mercado: ${mi_funko.getValorMercado}`));
      }
      else if (mi_funko.getValorMercado > 50 && mi_funko.getValorMercado <= 100) {
        console.log(chalk.yellow(`Valor de mercado: ${mi_funko.getValorMercado}`));
      }
      else if (mi_funko.getValorMercado > 100 && mi_funko.getValorMercado <= 200) {
        console.log(chalk.red(`Valor de mercado: ${mi_funko.getValorMercado}`));
      }    
      else {
        console.log(chalk.blue(`Valor de mercado: ${mi_funko.getValorMercado}`));
      }
      console.log();
      
    }
  });
  if (bandera === false) {
    console.log(chalk.red(`Funko with ID ${id} does not exist`))
    return false;
  }
  else {
    return true;
  }
}