import '../styles/compStyle.css';
import '../styles/App.css';
import { useRef } from 'react';
import { FaChevronCircleRight, FaChevronCircleLeft } from 'react-icons/fa';
import { RiPlayLargeFill } from "react-icons/ri";
import { RiAlbumFill } from 'react-icons/ri';
function NewRelease({title, songs}){
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
        <div className="song-list-container">
            <h2 className="scroll-list-title">{title}</h2>
            <div className="song-list-controls">
                <button onClick={scrollLeft} className='scroll-button scroll-button-left'>
                    <FaChevronCircleLeft />
                </button>
                <button onClick={scrollRight} className='scroll-button scroll-button-right'>
                    <FaChevronCircleRight />
                </button>
            </div>
            <div className="song-wrapper" ref={scrollRef}>
                <ul className="songUl"> 
                    {songs.map((song) => (
                        <li key = {song.id} className="song-item">
                            <div className="song-cover">
                                <img src={song.cover} alt={song.title} />
                                <button className="play-button">
                                        <RiPlayLargeFill size={42} />
                                </button>
                            </div>
                            <div className="song-info"> 
                                <h3 className='song-title'>{song.title}</h3>
                                <h4 className='songs-artist-album'>{song.artist} <RiAlbumFill /> {song.album}</h4>
                                <p className='song-duration'>{song.duration}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
export default NewRelease;