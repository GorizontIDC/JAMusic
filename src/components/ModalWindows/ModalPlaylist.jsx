import '../../styles/playlists.css';
import { AiOutlineClose } from "react-icons/ai";
import { RiPlayLargeFill } from "react-icons/ri";
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
                        <p className='modal-count'>{playlist.songs.length} песен</p>
                    </div>
                </div>
                <div className='modal-songs'>
                    <h3 className='modal-songs-title'> Треки </h3>
                    <div className='modal-songs-list'>
                        {playlist?.songs.map((song, index) => (
                            <div key={song.id} className='modal-song-items'>
                                <div className='modal-song-number'>{index + 1}</div>
                                <div className='modal-song-cover'>
                                    <img src={song.cover} alt={song.title} />
                                        <button className='play-button' onClick={() => onPlaySong?.(song)}> <RiPlayLargeFill /> </button>
                                    <h4 className='modal-song-title'>{song.title}</h4>
                                    <p className='modal-song-artist'>{song.artist}</p>
                                </div>
                            <div className='modal-song-items'>{song.duration}</div>
                        </div>
                    ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ModalPlaylist;