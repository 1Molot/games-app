import {Game} from "../types/types";

// type Multiplayer = {
//     offline: number;
//     online: boolean;
// };
//
// type Game = {
//     id: number;
//     title?: string; // Необязательное поле
//     rating: number;
//     price: string;
//     language: string[];
//     voice: string[];
//     multiplayer?: Multiplayer; // Необязательное поле
//     platform: string;
//     name: string;
//     coverImage: string[];
// };

export const GAMES: Game[] = [
    {
        id: 1,
        title: "Хорроры",
        rating: 4.5,
        price: "$20",
        language: ['English', 'Russian'],
        voice: ['English', 'Russian'],
        multiplayer: {
            offline: 4,
            online: true
        },
        platform: 'PC',
        name: "Outlast",
        coverImage: ['https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/ncom/en_US/games/switch/o/outlast-bundle-of-terror-switch/hero', 'https://twinfinite.net/wp-content/uploads/2017/10/Outlast.jpg?fit=700%2C394', 'https://gaming-cdn.com/images/products/464/screenshot/outlast-pc-mac-game-steam-wallpaper-1.jpg?v=1662461082']
    },
    {
        id: 2,
        title: "Хоррор",
        rating: 4.2,
        price: "$40",
        platform: 'PC',
        language: ['English'],
        voice: ['English'],
        multiplayer: {
            offline: 2,
            online: false
        },
        name: "Dead Space",
        coverImage: ['https://i.ytimg.com/vi/ls_mJw6BepM/maxresdefault.jpg', 'https://c.dns-shop.ru/thumb/st4/fit/760/600/5d25ec252e7fb811fccf3fdf27d1c59a/q93_cfef27463b3d75469159b77ef3dedf0b5a2ea2dc70e2ff5f439751424f134b31.png', 'https://i.playground.ru/p/yboJqm9T_wtxlqYo3jigcA.jpeg']
    },
    {
        id: 3,
        title: "Открытый мир",
        rating: 4.0,
        price: "$50",
        language: ['English'],
        voice: ['English'],
        platform: 'PlayStation',
        multiplayer: {
            offline: 1,
            online: false
        },
        name: "Cyberpunk 2077",
        coverImage: ['https://images.gog-statics.com/c75e674590b8947542c809924df30bbef2190341163dd08668e243c266be70c5.jpg', 'https://media.gq-magazine.co.uk/photos/5fce371ef264d85bcbdfc033/16:9/w_2560%2Cc_limit/Cyberpunk%25202077.jpg', 'https://files.vgtimes.ru/posts/2022-03/1647880711_4379ece7-a52b-4f6a-93c4-8880683b5f26.jpg']
    },
    {
        id: 4,
        title: "Открытый ад",
        rating: 4.5,
        platform: 'PC',
        multiplayer: {
            offline: 3,
            online: true
        },
        price: "$50",
        language: ['English', 'Russian'],
        voice: ['English', 'Russian'],
        name: "Grand theft auto V",
        coverImage: ['https://cdn.akamai.steamstatic.com/steam/apps/271590/capsule_616x353.jpg?t=1678296348', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrk3OGuWix5cqDqgMoE8EXbAG6R3JCDCUwZQ&usqp=CAU', 'https://testingbuddies.de/wp-content/uploads/2022/04/GTAV_Gen9_005.jpg']
    },
];
