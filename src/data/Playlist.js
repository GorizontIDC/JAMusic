import Ven from '../assets/images/ven.jpg'
import has from '../assets/images/has.jpg'
import { allSongs } from './songs'
export const playlist = [
  {
  id: 1,
  title: 'Плейлист Администратора',
  description: 'Музыкальный вкус создателя сайта.',
  songs: [
    allSongs.find((s) => s.id === 1) ?? null,
    allSongs.find((s) => s.id === 2) ?? null,
  ].filter(Boolean),
  cover: has,
  color: '#ff5b74',
  },
  {
    id: 2,
    title: 'Хиты 90-х',
    description: '',
    songs: [
      allSongs.find((s) => s.id === 2) ?? null,
      allSongs.find((s) => s.id === 4) ?? null,
    ].filter(Boolean),
    cover: Ven,
    color: '#2d4295ff',
  },
  {
    id: 3,
    title: 'Летняя атмосфера',
    description: '',
    songs: [
      allSongs.find((s) => s.id === 1) ?? null,
      allSongs.find((s) => s.id === 3) ?? null,
    ].filter(Boolean),
    cover: Ven,
    color: '#4ba853ff',
  }
]

export default {
    playlist
};