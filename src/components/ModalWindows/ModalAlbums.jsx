import '../../styles/playlistsModal.css';
import "../../styles/forEverySingle.css";
import '../../styles/compStyle.css'
import { AiOutlineClose } from "react-icons/ai";
import { RiPlayLargeFill } from "react-icons/ri";
import { AllSongTime } from "../../utils/logicalAudioPlayer.js";
import { FaHeartCirclePlus } from "react-icons/fa6";
import { useRef, useState, useEffect } from 'react';
function ModalAlbums({albums, isOpen, onClose, onPlaySong}) {
    const titleRefs = useRef({});
    const albumss = albums?.songs || [];
    //проверка на то что текст длиньше карточки
    const [Distance, setDistance] = useState({})
    useEffect(()=>{
        const distanceScroll = {};
        albumss.forEach(song => {
            const textEl = titleRefs.current[song.id];
            const contEl = textEl?.parentElement;
                if (textEl && contEl) {
                    const overWidth = textEl.scrollWidth - contEl.clientWidth;
                    if (overWidth > 0){
                        distanceScroll[song.id] = -overWidth;
                    }else{
                        distanceScroll[song.id] = 0;
                    }
                };
        });
        setDistance(distanceScroll);
    }, [albums]);
    if (!isOpen || !albums) return null; // это проверка на открытие окна
    return (
        <div className='modal-window' onClick={onClose}>
            <div className='modal-content' onClick={(e) => e.stopPropagation()}>
            <button className='modal-close' onClick={onClose}>
                <AiOutlineClose />
            </button>
                <div className='modal-head'>
                    <div className="modal-cover">
                        <img src={albums.cover} alt={albums.title} /> 
                    </div>
                    <div className="modal-info">
                        <h2 className='modal-title'>{albums.title}</h2>
                        <p className='modal-author'>{albums.author}</p>
                        <p className='modal-count'>Треков: {albums.songs.length} • {AllSongTime(albums.songs)}</p>
                    </div>
                </div>
                <div className='modal-songs'>
                    <div className='modal-songs-list'>
                        {albums?.songs.map((song, index) => (
                            <div key={song.id} className='single-song-card'>
                            <div className='modal-song-number'>{index + 1}</div>
                            <div className='single-song-cover'> 
                                <img className='single-song-img' src={song.cover} alt={song.title}></img>
                                    <button className='single-song-playButton' onClick={()=> onPlaySong?.(song)}>
                                        <RiPlayLargeFill />
                                    </button>
                            </div>
                            <div className='single-song-info'>
                                <h4 ref={text => titleRefs.current[song.id] = text} 
                                    className={`single-song-title ${Distance[song.id] ? 'overflow' : ''}`}
                                    style={Distance[song.id] ? { '--scroll-x': `${Distance[song.id]}px`} : {}}>
                                        {song.title}
                                </h4>
                                <p className='single-artist'>{song.artist}</p>
                            </div>
                            <div className='single-function'> 
                                <button className='single-onFavorite' /*onClick={}*/>
                                    <FaHeartCirclePlus />
                                </button>
                                <h3 className='single-song-duration'>{song.duration}</h3>
                            </div>
                        </div>
                    ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ModalAlbums;