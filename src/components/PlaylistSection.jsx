import '../styles/playlistsModal.css'
import '../styles/App.css'
import { AllSongTime } from "../utils/logicalAudioPlayer.js";
import { RiAlbumFill } from "react-icons/ri"
import { useRef } from 'react';
import { FaChevronCircleRight, FaChevronCircleLeft } from 'react-icons/fa';
function PlaylistSection({title, playlists = [], onPlaylistClick}){
    if (playlists?.length === 0) return null;
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
        <div className='playlist-Section'>
            <h2 className='playlist-SectionTitle'>{title}</h2>
            <div className="playlist-controls">
                <button onClick={scrollLeft} className='scroll-button scroll-button-left'>
                    <FaChevronCircleLeft />
                </button>
                <button onClick={scrollRight} className='scroll-button scroll-button-right'>
                    <FaChevronCircleRight />
                </button>
            </div>
            <ul className='playlist-container' ref={scrollRef}>
                {playlists.map((playlist) => (
                    <li key = {playlist.id}
                        className='playlist-vievCard'
                        onClick={() => onPlaylistClick(playlist)}>
                    <div className='playlist-card-cover'
                        style = {{backgroundColor: playlist.color}}>
                        <img src={playlist.cover} alt={playlist.title} />
                        <button className='playlist-button'> <RiAlbumFill size = {42} /> </button>
                    </div>
                    <h3 className='playlist-card-title'>{playlist.title}</h3>
                    <p className="playlist-card-count">Треков: {playlist.songs.length} • {AllSongTime(playlist.songs)}</p>

                </li>
                ))}
            </ul>
        </div>
            
    );
}
export default PlaylistSection;