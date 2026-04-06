//import React from "react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import ImgCarousel from "../components/Carousel.jsx";
import ListeningNow from "../components/ListeningNow.jsx";
import NewRelease from "../components/NewRelease.jsx";
import PlaylistSection from "../components/PlaylistSection.jsx";
import ModalPlaylist from "../components/ModalWindows/ModalPlaylist.jsx";
import {logicalAudioPlayer} from "../hooks/logicalAudioPlayer.js";
import "../styles/compStyle.css";
import "../styles/playlists.css";
import { newReleases, listeningNow} from "../data/songs.js";
import { useState } from "react";
import { playlist } from "../data/playlist.js";
function MainPage(){
  /*Хуки*/
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { playSong } = logicalAudioPlayer();
  /*Хуки*/
  /*Обработка*/
  const handlePlaylistClick = (playlist) => {
    setSelectedPlaylist(playlist);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setSelectedPlaylist(null);
    setIsModalOpen(false);
  }
  return (
    <div id="allPage">
      <Header showSearch={true} />
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
        </>
        <p>aaaa</p>
        <p>aaaa</p>
        <p>aaaa</p>
      </main>
      <Footer />
    </div>
  );
}
export default MainPage;
