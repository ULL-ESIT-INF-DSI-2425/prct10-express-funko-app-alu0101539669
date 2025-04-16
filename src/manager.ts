import * as fs from 'fs/promises';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { FunkoPop, ResponseType } from './types.js';

// Alternativa para __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta base para la base de datos
const basePath = path.resolve(__dirname, '../database');

async function ensureUserDir(user: string): Promise<string> {
  const userPath = path.join(basePath, user);
  await fs.mkdir(userPath, { recursive: true });
  return userPath;
}

export async function addFunko(user: string, funko: FunkoPop): Promise<ResponseType> {
  // Validar que el objeto funko tenga un id válido
  if (!funko.id || typeof funko.id !== 'number') {
    return { success: false, message: 'Invalid Funko ID' };
  }

  const userPath = await ensureUserDir(user);
  const filePath = path.join(userPath, `${user}_${funko.id}.json`);

  try {
    await fs.access(filePath);
    return { success: false, message: 'Funko with this ID already exists' };
  } catch {
    await fs.writeFile(filePath, JSON.stringify(funko, null, 2));
    return { success: true, message: 'Funko added successfully' };
  }
}

export async function updateFunko(user: string, funko: FunkoPop): Promise<ResponseType> {
  const userPath = await ensureUserDir(user);
  const filePath = path.join(userPath, `${user}_${funko.id}.json`);
  try {
    await fs.access(filePath);
    await fs.writeFile(filePath, JSON.stringify(funko, null, 2));
    return { success: true, message: 'Funko updated successfully' };
  } catch {
    return { success: false, message: 'Funko not found' };
  }
}

export async function deleteFunko(user: string, id: number): Promise<ResponseType> {
  const userPath = await ensureUserDir(user);
  const filePath = path.join(userPath, `${user}_${id}.json`);

  try {
    await fs.access(filePath);
    await fs.rm(filePath);
    return { success: true, message: 'Funko deleted successfully' };
  } catch {
    return { success: false, message: 'Funko not found' };
  }
}

export async function listFunkos(user: string): Promise<ResponseType> {
  const userPath = await ensureUserDir(user);
  try {
    const files = await fs.readdir(userPath);
    const funkos: FunkoPop[] = await Promise.all(
      files.map(async (file) => {
        const content = await fs.readFile(path.join(userPath, file), 'utf-8');
        return JSON.parse(content);
      })
    );
    return { success: true, funkoPops: funkos };
  } catch {
    return { success: false, message: 'Failed to list Funkos' };
  }
}

export async function getFunko(user: string, id: number): Promise<ResponseType> {
  const userPath = await ensureUserDir(user);
  const filePath = path.join(userPath, `${user}_${id}.json`);

  try {
    const content = await fs.readFile(filePath, 'utf-8');
    return { success: true, funkoPop: JSON.parse(content) };
  } catch {
    return { success: false, message: 'Funko not found' };
  }
}