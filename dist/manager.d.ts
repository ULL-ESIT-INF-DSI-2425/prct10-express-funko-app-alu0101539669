import { FunkoPop, ResponseType } from './types.js';
export declare function addFunko(user: string, funko: FunkoPop): Promise<ResponseType>;
export declare function updateFunko(user: string, funko: FunkoPop): Promise<ResponseType>;
export declare function deleteFunko(user: string, id: number): Promise<ResponseType>;
export declare function listFunkos(user: string): Promise<ResponseType>;
export declare function getFunko(user: string, id: number): Promise<ResponseType>;
