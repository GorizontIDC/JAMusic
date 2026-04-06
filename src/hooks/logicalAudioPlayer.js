/* eslint-disable react-hooks/rules-of-hooks */
import {useState, useRef, useEffect} from 'react'
export function logicalAudioPlayer() {
    const [currentSong, setCurrentSong] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);
    useEffect(() => {
        return () => {
            if(audioRef.current) {
                audioRef.current.pause();
                audioRef.current.src = '';
                audioRef.current = null;
            } 
        };
    }, []);
    const stopSong = () => {
        if(audioRef.current){
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            setIsPlaying(false);
            setCurrentSong(null);
        }
    };
    
    const playSong = (song) => {
        if (currentSong?.id === song.id) {
            if (isPlaying){
                audioRef.current?.pause();
                setIsPlaying(false);
            } else {
                audioRef.current?.play()
                    .then (()=> setIsPlaying(true))
                    .catch(err => console.log('Ошибка воспроизведения', err));
            }
            return;
        }
        if (audioRef.current){
        audioRef.current.pause();
        audioRef.current.src = '';
        }
        const audio = new Audio(song.audioUrl || '');
        audio.addEventListener('canplaythrough', () => {
            audio.play()
                .then(()=> {
            setIsPlaying(true);
            setCurrentSong(song);
        })
        .catch(err => console.log('Ошибка воспроизведения', err));
        });
        audio.onended = () => {
            setIsPlaying(false);
            setCurrentSong(null);
        };
        audioRef.current = audio;
    };
    return {
        playSong,
        stopSong,
        isPlaying,
        currentSong
        };
}