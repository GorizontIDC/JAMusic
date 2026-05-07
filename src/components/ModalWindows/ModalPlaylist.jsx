import '../../styles/playlistsModal.css';
import { AiOutlineClose } from "react-icons/ai";
import { RiPlayLargeFill } from "react-icons/ri";
import { AllSongTime } from "../../utils/logicalAudioPlayer.js";
function ModalPlaylist({playlist, isOpen, onClose, onPlaySong}) {
    if (!isOpen || !playlist) return null; // это проверка на открытие окна
    return (
        <div className='modal-window' onClick={onClose}>
            <div className='modal-content' onClick={(e) => e.stopPropagation()}>
            <button className='modal-close' onClick={onClose}>
                <AiOutlineClose />
            </button>
                <div className='modal-head'>
                    <div className="modal-cover">
                        <img src={playlist.cover} alt={playlist.title} /> 
                    </div>
                    <div className="modal-info">
                        <h2 className='modal-title'>{playlist.title}</h2>
                        <p className='modal-description'>{playlist.description}</p>
                        <p className='modal-count'>Треков: {playlist.songs.length} • {AllSongTime(playlist.songs)}</p>
                    </div>
                </div>
                <div className='modal-songs'>
                    <div className='modal-songs-list'>
                        {playlist?.songs.map((song, index) => (
                            <div key={song.id} className='modal-song-item'>
                                 {/* Номер песни */}
                                <div className='modal-song-number'>{index + 1}</div>
                                <div className='modal-song-cover'>
                                     {/* Картинка песни */}
                                    <img src={song.cover} alt={song.title} />
                                        <button className='play-button' onClick={() => onPlaySong?.(song)}>
                                             <RiPlayLargeFill /> 
                                        </button>
                                </div>
                                     {/* Описание песни песни */}
                                    <div className='modal-song-info'>
                                            <h4 className='modal-song-title'>{song.title}</h4>
                                            <p className='modal-song-artist'>{song.artist}</p>
                                    </div>
                                 {/* Длительность песни */}
                                <div className="modal-song-duration">{song.duration}</div>
                        </div>
                    ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ModalPlaylist;