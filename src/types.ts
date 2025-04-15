// /**
//  * Enum para los tipos de Funkos.
//  */
// export enum Tipo {
//   Pop = "Pop!",
//   PopRides = "Pop! Rides",
//   VynilSoda = "Vynil Soda",
//   VynilGold = "Vynil Gold",
//   VynilPlatinum = "Vynil Platinum",
// }

// /**
//  * Enum para los géneros de Funkos.
//  */
// export enum Genero {
//   Animacion = "Animacion",
//   PeliculasYTV = "Peliculas y TV",
//   Videojuegos = "Games",
//   Deportes = "Deportes",
//   Musica = "Música",
//   Anime = "Anime",
// }

// /**
//  * Tipo para las solicitudes al servidor.
//  */
// export type RequestType = {
//   type: 'add' | 'modify' | 'remove' | 'read' | 'list';
//   funkoPop?: {
//     id: number;
//     usuario: string;
//     nombre: string;
//     descripcion: string;
//     tipo: Tipo;
//     genero: Genero;
//     franquicia: string;
//     numero: number;
//     exclusivo: boolean;
//     caracteristicasEspeciales: string;
//     valorMercado: number;
//   };
// };

// /**
//  * Tipo para las respuestas del servidor.
//  */
// export type ResponseType = {
//   type: 'add' | 'modify' | 'remove' | 'read' | 'list' | 'error';
//   success: boolean;
//   message: string;
//   funkoPops?: {
//     id: number;
//     usuario: string;
//     nombre: string;
//     descripcion: string;
//     tipo: Tipo;
//     genero: Genero;
//     franquicia: string;
//     numero: number;
//     exclusivo: boolean;
//     caracteristicasEspeciales: string;
//     valorMercado: number;
//   }[];
// };

export type Color = "green" | "yellow" | "blue" | "red" | "magenta";

export type Note = {
  title: string;
  body: string;
  color: Color;
};

export type ResponseType = {
  type: "add" | "remove" | "read" | "list";
  success: boolean;
  notes?: Note[];
};