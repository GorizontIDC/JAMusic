import bohCober from '../assets/images/boh.jpg'
import hotel from '../assets/images/hotel.jpg'
import Ven from '../assets/images/ven.jpg'
import has from '../assets/images/has.jpg'
export const allSongs = [
   {
    id: 1,
    title: 'Bohemian Rhapsody',
    artist: 'Queen',
    cover: bohCober,
    duration: '5:55',
    album: 'A Night at the Opera',
    year: 1975,
    isEditorPick: false,
    playCount: 6600,
    releaseDate: '2021-07-15',
    audioUrl: '../audio/boh.mp3',
  },
  {
    id: 2,
    title: 'Партизан',
    artist: 'Хаски',
    cover: has,
    duration: '4:08',
    album: 'Партизан',
    year: 2026,
    isEditorPick: true,
    playCount: 1200,
    releaseDate: '2026-10-28',
  },
  {
    id: 3,
    title: 'Venice Escape',
    artist: 'Yesper Cude',
    cover: Ven,
    duration: '3:29',
    album: 'Ambient Dreams',
    year: 2023,
    isEditorPick: false,
    playCount: 2000,
    releaseDate: '2024-03-19',
  },
  {
    id: 4,
    title: 'Hotel California',
    artist: 'Eagles',
    cover: hotel,
    duration: '6:30',
    album: 'Hotel California',
    year: 1976,
    isEditorPick: true,
    playCount: 1000,
    releaseDate: '2024-03-15',
  }
]

export const listeningNow = allSongs
  .sort ((a,b)=> b.playCount - a.playCount)
  .slice(0,20);

const dateMonth = new Date();
dateMonth.setDate(dateMonth.getDate() - 30)
export const newReleases = allSongs
  .filter(song => new Date(song.releaseDate)>dateMonth );
  
export const choiseRedaction= allSongs
  .filter(song => song.isEditorPick);

export const hitsOfNineteen = allSongs
  .filter(song => song.year > 1990 && song.year < 2000);

export const myPlaylist = [
  
] 
export const favorites = [
  
]
export default{
  allSongs,
    listeningNow,
    newReleases,
    choiseRedaction,
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