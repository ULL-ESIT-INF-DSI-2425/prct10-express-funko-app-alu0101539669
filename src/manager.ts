import * as fs from 'fs/promises';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { FunkoPop, ResponseType } from './types.js';

// Alternativa para __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url); // Obtener la ruta del archivo actual
const __dirname = path.dirname(__filename); // Obtener el directorio del archivo actual

// Ruta base para la base de datos
const basePath = path.resolve(__dirname, '../database'); // Ruta absoluta a la base de datos

async function ensureUserDir(user: string): Promise<string> {  // Asegurarse de que el directorio del usuario exista
  const userPath = path.join(basePath, user); // Ruta del directorio del usuario
  await fs.mkdir(userPath, { recursive: true }); // Crear el directorio si no existe
  return userPath; 
}

export async function addFunko(user: string, funko: FunkoPop): Promise<ResponseType> { // Añadir un nuevo Funko, la promisa devuelve un objeto de tipo ResponseType
  // Validar que el objeto funko tenga un id válido
  if (!funko.id || typeof funko.id !== 'number') {
    return { success: false, message: 'Invalid Funko ID' }; 
  }

  const userPath = await ensureUserDir(user); // Asegurarse de que el directorio del usuario exista
  const filePath = path.join(userPath, `${user}_${funko.id}.json`); // Ruta del archivo del Funko

  // Comprobar si el archivo ya existe
  try {
    await fs.access(filePath);  // Verificar si el archivo existe
    return { success: false, message: 'Funko with this ID already exists' };  
  } catch { 
    // Si el archivo no existe, se crea
    await fs.writeFile(filePath, JSON.stringify(funko, null, 2)); // Guardar el Funko en un archivo JSON
    return { success: true, message: 'Funko added successfully' };
  }
}

export async function updateFunko(user: string, funko: FunkoPop): Promise<ResponseType> { // Actualizar un Funko existente
  const userPath = await ensureUserDir(user); // Asegurarse de que el directorio del usuario exista
  const filePath = path.join(userPath, `${user}_${funko.id}.json`); // Ruta del archivo del Funko

  try {
    await fs.access(filePath);  // Verificar si el archivo existe
    await fs.writeFile(filePath, JSON.stringify(funko, null, 2)); // Guardar el Funko actualizado en un archivo JSON
    return { success: true, message: 'Funko updated successfully' };  
  } catch {
    // Si el archivo no existe, se devuelve un mensaje de error
    return { success: false, message: 'Funko not found' };
  }
}

export async function deleteFunko(user: string, id: number): Promise<ResponseType> {  // Eliminar un Funko existente
  const userPath = await ensureUserDir(user); // Asegurarse de que el directorio del usuario exista
  const filePath = path.join(userPath, `${user}_${id}.json`); // Ruta del archivo del Funko

  try {
    await fs.access(filePath);  // Verificar si el archivo existe
    await fs.rm(filePath);  // Eliminar el archivo del Funko
    return { success: true, message: 'Funko deleted successfully' };  
  } catch {
    return { success: false, message: 'Funko not found' };
  }
}

export async function listFunkos(user: string): Promise<ResponseType> {
  const userPath = await ensureUserDir(user); // Asegurarse de que el directorio del usuario exista
  // El try catch se utiliza para manejar errores al leer el directorio
  try {
    const files = await fs.readdir(userPath); // Leer los archivos del directorio del usuario
    const funkos: FunkoPop[] = await Promise.all(   // Leer todos los archivos y parsear su contenido, para ello se utiliza Promise.all que permite ejecutar múltiples promesas en paralelo
      // Se utiliza el método map para crear un array de promesas
      files.map(async (file) => {
        const content = await fs.readFile(path.join(userPath, file), 'utf-8');  // Leer el contenido del archivo
        return JSON.parse(content); // Parsear el contenido JSON
      })
    );
    return { success: true, funkoPops: funkos };
  } catch {
    return { success: false, message: 'Failed to list Funkos' };
  }
}

export async function getFunko(user: string, id: number): Promise<ResponseType> { // Obtener un Funko específico
  const userPath = await ensureUserDir(user); // Asegurarse de que el directorio del usuario exista
  const filePath = path.join(userPath, `${user}_${id}.json`); // Ruta del archivo del Funko

  try {
    const content = await fs.readFile(filePath, 'utf-8'); // Leer el contenido del archivo
    return { success: true, funkoPop: JSON.parse(content) };  // Parsear el contenido JSON
  } catch {
    return { success: false, message: 'Funko not found' };  
  }
}