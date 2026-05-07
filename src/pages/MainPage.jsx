//import React from "react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import ImgCarousel from "../components/Carousel.jsx";
import ListeningNow from "../components/ListeningNow.jsx";
import NewRelease from "../components/NewRelease.jsx";
import PlaylistSection from "../components/PlaylistSection.jsx";
import ModalPlaylist from "../components/ModalWindows/ModalPlaylist.jsx";
import ModalRegLog from "../components/ModalWindows/ModalLogReg.jsx";
import { useNavigate } from 'react-router-dom';
import {logicalAudioPlayer} from "../utils/logicalAudioPlayer.js";
import { newReleases, listeningNow} from "../data/songs.js";
import { useState } from "react";
import { playlist } from "../data/Playlist.js";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function MainPage(){
  /*Хуки*/
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { playSong } = logicalAudioPlayer();
  const [isRegLogOpen, setIsRegLogOpen] = useState(false);
  /*Хуки*/
  const navigate = useNavigate();
  const handleLogin = () => {
    console.log('Пользователь авторизован');
    navigate('/profile');
  }
  /*Обработка*/
  const handlePlaylistClick = (playlist) => {
    setSelectedPlaylist(playlist);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setSelectedPlaylist(null);
    setIsModalOpen(false);
  }
  const RLOpen = () => setIsRegLogOpen(true);
  const RLclose = () => setIsRegLogOpen(false);
  return (
    <div id="allPage">
      <Header
        onRLClick={RLOpen}/>
      <main>
        <ImgCarousel />
        <ListeningNow title="Слушают сейчас!" songs={listeningNow} />
        <NewRelease title="Новые релизы!" songs={newReleases} />
        <>
          <PlaylistSection 
            title="Выбор редакции" 
            playlists={playlist}
            onPlaylistClick={handlePlaylistClick} 
          />
          <ModalPlaylist 
            playlist={selectedPlaylist} 
            isOpen={isModalOpen} 
            onClose={handleCloseModal} 
            onPlaySong={playSong} 
          />
          <ModalRegLog 
            isOpen={isRegLogOpen}   
            onClose={RLclose} 
            onLogin={handleLogin}
          />
        </>
      </main>
      <Footer />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
export default MainPage;
