import '../styles/compStyle.css'
import '../styles/App.css'
import { RiPlayLargeFill } from "react-icons/ri"
//import { useState } from 'react';
//import { RiAlbumFill } from 'react-icons/ri'
//import ModalPlaylist from './ModalWindows/ModalPlaylist.tsx';

function PlaylistSection({title, playlists = [], onPlaylistClick}){
    if (playlists?.length === 0) return null;
    return(
        <div className='playlist-Section'>
            <h2 className='playlist-SectionTitle'>{title}</h2>
            <div className='playlist-container'>
                {playlists.map((playlist) => (
                    <div key = {playlist.id}
                    className='playlist-vievCard'
                    onClick={() => onPlaylistClick(playlist)}>
                        <div className='playlist-card-cover'
                        style = {{backgroundColor: playlist.color}}>
                        <img src={playlist.cover} alt={playlist.title} />
                        <button className='playlist-play'> <RiPlayLargeFill /> </button>
                    </div>
                    <h3 className='playlist-card-title'>{playlist.title}</h3>
                    <p className="playlist-card-count">{playlist.songs.length} песен</p>
                </div>
                ))}
            </div>
        </div>
            
    );
}
export default PlaylistSection;