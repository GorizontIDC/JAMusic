import { allSongs } from './songs'
import has from "../assets/images/has.jpg"
export const albums = [
  {
  id: 1,
  title: 'Альбом',
  author: 'Автор',
  songs: [
    allSongs.find((s) => s.id === 1) ?? null,
    allSongs.find((s) => s.id === 2) ?? null,
  ].filter(Boolean),
  cover: has,
  color: '#ff5b74',
  },
  {
  id: 2,
  title: 'Альбом',
  author: 'Автор',
  songs: [
    allSongs.find((s) => s.id === 1) ?? null,
    allSongs.find((s) => s.id === 2) ?? null,
  ].filter(Boolean),
  cover: has,
  color: '#ff5b74',
  },
]
export default albums;