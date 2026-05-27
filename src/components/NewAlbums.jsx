import '../styles/albumsModal.css'
import '../styles/App.css'
import { AllSongTime } from "../utils/logicalAudioPlayer.js";
import { RiAlbumFill } from "react-icons/ri"
import { useRef } from 'react';
import { FaChevronCircleRight, FaChevronCircleLeft } from 'react-icons/fa';
function PlaylistSection({title, albums = [], onPlaylistClick}){
    if (albums?.length === 0) return null;
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const scrollRef = useRef(null)
        const scrollLeft = () => {
            if (scrollRef.current) {
                scrollRef.current.scrollBy({left: -375, behavior: 'smooth'})
            }
        };
        const scrollRight = () => {
            if (scrollRef.current) {
                scrollRef.current.scrollBy({left: 375, behavior: 'smooth'})
            }
        };
    return(
        <div className='album-Section'>
            <h2 className='album-SectionTitle'>{title}</h2>
            <div className="album-controls">
                <button onClick={scrollLeft} className='scroll-button scroll-button-left'>
                    <FaChevronCircleLeft />
                </button>
                <button onClick={scrollRight} className='scroll-button scroll-button-right'>
                    <FaChevronCircleRight />
                </button>
            </div>
            <ul className='album-container' ref={scrollRef}>
                {albums.map((albums) => (
                    <li key = {albums.id}
                        className='album-vievCard'
                        onClick={() => onPlaylistClick(albums)}>
                    <div className='album-card-cover'
                        style = {{backgroundColor: albums.color}}>
                        <img src={albums.cover} alt={albums.title} />
                        <button className='album-button'> <RiAlbumFill size = {42} /> </button>
                    </div>
                    <h3 className='album-card-title'>{albums.title}</h3>
                    <h4 className='album-card-autor'>{albums.autor}</h4>
                    <p className="album-card-count">Треков: {albums.songs.length} • {AllSongTime(albums.songs)}</p>
                </li>
                ))}
            </ul>
        </div>
        
    );
}
export default PlaylistSection;