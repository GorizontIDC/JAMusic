import { RiPlayLargeFill } from 'react-icons/ri';
import { useRef, useState, useEffect } from 'react';
import { FaChevronCircleRight, FaChevronCircleLeft } from 'react-icons/fa';
import { FaHeartCirclePlus } from "react-icons/fa6";
import "../styles/forEverySingle.css";
import "../styles/compStyle.css"
import '../styles/App.css';
import FavoriteButton from './Functions/FavoriteButton.jsx';
function ListeningNow({title, songs, onPlaySong, userId}){
    const scrollRef = useRef(null);
    const titleRefs = useRef({});
    const [Distance, setDistance] = useState({})
    useEffect(()=>{
        const distanceScroll = {};
        songs.forEach(song => {
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
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setDistance(distanceScroll);
    }, [songs]);
    const handleFavoriteToggle = (trackId, isFavorite) => {
        console.log(`Трек ${trackId} ${isFavorite ? 'добавлен в' : 'удалён из'} избранного`)
    }
    const song_in_col = 4;
        const columns = [];
    for (let i = 0; i < songs.length; i += song_in_col) {
        columns.push(songs.slice(i, i + song_in_col));
    }
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
        <div className='listen-section'>
            <h2 className='listen-title'>{title}</h2>
            <div className="song-list-controls">
                <button onClick={scrollLeft} className='scroll-button scroll-button-left'>
                    <FaChevronCircleLeft />
                </button>
                <button onClick={scrollRight} className='scroll-button scroll-button-right'>
                    <FaChevronCircleRight />
                </button>
            </div>
            <div className='listen-grid' ref={scrollRef}>
                {columns.map((column, colIndex) => (
                    <div key={colIndex} className="single-column">
                        {column.map((song) => (
                        <div key={song.id} className='single-song-card'>
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
                                <div className='single-onFavorite' /*onClick={}*/>
                                    <FavoriteButton
                                        userId={userId}
                                        trackId={song.id}
                                        onToggle={handleFavoriteToggle} />
                                </div>
                                <h3 className='single-song-duration'>{song.duration}</h3>
                            </div>
                        </div>
                        ))}
                    </div>
                    ))}
            </div>
        </div>
    )
}
export default ListeningNow;