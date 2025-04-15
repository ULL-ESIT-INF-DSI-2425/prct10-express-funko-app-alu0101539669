export type FunkoType = 'Pop!' | 'Pop! Rides' | 'Vynil Soda' | 'Vynil Gold';
export type FunkoGenre = 'Animación' | 'Películas y TV' | 'Videojuegos' | 'Deportes' | 'Música' | 'Ánime';
export type FunkoPop = {
    id: number;
    name: string;
    description: string;
    type: FunkoType;
    genre: FunkoGenre;
    franchise: string;
    number: number;
    exclusive: boolean;
    specialFeatures: string;
    marketValue: number;
};
export type ResponseType = {
    success: boolean;
    message?: string;
    funkoPop?: FunkoPop;
    funkoPops?: FunkoPop[];
};
