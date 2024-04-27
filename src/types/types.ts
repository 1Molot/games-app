export type Multiplayer = {
    offline: number;
    online: boolean;
};

export type Game = {
    id: number;
    title?: string; // Необязательное поле
    rating: number;
    price: string;
    language: string[];
    voice: string[];
    multiplayer?: Multiplayer; // Необязательное поле
    platform: string;
    name: string;
    coverImage: string[];
};
