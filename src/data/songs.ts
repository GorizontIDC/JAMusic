import bohCober from '../assets/images/boh.jpg'
import hotel from '../assets/images/hotel.jpg'
import Ven from '../assets/images/ven.jpg'
export interface Song {
    id:number;
    title:string;
    artist:string;
    cover: string;
    duration:string;
    album?:string;
    year?:number;
}
export interface SongsData {
    listeningNow: Song[];
    newReleases: Song[];
    chooseRedaction: Song[];
    hitsOfNineteen: Song[];
    myPlaylist: Song[];
    favorites: Song[];
}
export const listeningNow: Song[] = [
    {
    id: 1,
    title: 'Bohemian Rhapsody',
    artist: 'Queen',
    cover: bohCober,
    duration: '5:55',
    album: 'A Night at the Opera',
    year: 1975,
  },
  {
    id: 2,
    title: 'Bohemian Rhapsody',
    artist: 'Queen',
    cover: '/JAMusic/images/queen.jpg',
    duration: '5:55',
    album: 'A Night at the Opera',
    year: 1975,
  },
  {
    id: 3,
    title: 'Bohemian Rhapsody',
    artist: 'Queen',
    cover: '/JAMusic/images/queen.jpg',
    duration: '5:55',
    album: 'A Night at the Opera',
    year: 1975,
  },
  {
    id: 4,
    title: 'Hotel California',
    artist: 'Eagles',
    cover: hotel,
    duration: '6:30',
    album: 'Hotel California',
    year: 1976
  },
   {
    id: 1,
    title: 'Bohemian Rhapsody',
    artist: 'Queen',
    cover: bohCober,
    duration: '5:55',
    album: 'A Night at the Opera',
    year: 1975,
  },
  {
    id: 2,
    title: 'Bohemian Rhapsody',
    artist: 'Queen',
    cover: '/JAMusic/images/queen.jpg',
    duration: '5:55',
    album: 'A Night at the Opera',
    year: 1975,
  },
  {
    id: 3,
    title: 'Venice Escape',
    artist: 'Yesper Cude',
    cover: Ven,
    duration: '3:29',
    album: 'Ambient Dreams',
    year: 2023,
  },
  {
    id: 4,
    title: 'Hotel California',
    artist: 'Eagles',
    cover: hotel,
    duration: '6:30',
    album: 'Hotel California',
    year: 1976
  }
]
export const newReleases: Song[] = [
   {
    id: 1,
    title: 'Bohemian Rhapsody',
    artist: 'Queen',
    cover: bohCober,
    duration: '5:55',
    album: 'A Night at the Opera',
    year: 1975,
  },
  {
    id: 2,
    title: 'Bohemian Rhapsody',
    artist: 'Queen',
    cover: '/JAMusic/images/queen.jpg',
    duration: '5:55',
    album: 'A Night at the Opera',
    year: 1975,
  },
  {
    id: 3,
    title: 'Venice Escape',
    artist: 'Yesper Cude',
    cover: Ven,
    duration: '3:29',
    album: 'Ambient Dreams',
    year: 2023,
  },
  {
    id: 4,
    title: 'Hotel California',
    artist: 'Eagles',
    cover: hotel,
    duration: '6:30',
    album: 'Hotel California',
    year: 1976
  }
]
export const chooseRedaction: Song[] = [

]
export const hitsOfNineteen: Song[] = [
  
]
export const myPlaylist: Song[] = [
  
] 
export const favorites: Song[] = [
  
]
export default{
    listeningNow,
    newReleases,
    chooseRedaction,
    hitsOfNineteen,
    myPlaylist,
    favorites,
}
/* 
// Можно экспортировать одним объектом (удобно для API)
export const allSongs: SongsData = {
  new: newSongs,
  popular: popularSongs,
  recommended: recommendedSongs
};
*/