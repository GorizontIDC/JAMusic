import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import ImgCarousel from "../components/Carousel.jsx";
import ListeningNow from "../components/ListeningNow.jsx";
import NewSingls from "../components/NewSingls.jsx";
import NewAlbums from "../components/NewAlbums.jsx"
import PlaylistSection from "../components/PlaylistSection.jsx";
import ModalPlaylist from "../components/ModalWindows/ModalPlaylist.jsx";
import ModalAlbums from "../components/ModalWindows/ModalAlbums.jsx";
import ModalRegLog from "../components/ModalWindows/ModalLogReg.jsx";
import {supabase} from "../utils/supabaseClient.js"
import { useNavigate } from 'react-router-dom';
import {logicalAudioPlayer} from "../utils/logicalAudioPlayer.js";
import { newReleases, listeningNow} from "../data/songs.js";
import { useState, useEffect } from "react";
import { useAuth } from '../utils/providerAUTH';
//import { playlist } from "../data/Playlist.js";
//import { albums } from "../data/albums.js";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function MainPage(){
  /*Админка*/
  const [ListeningNowADM, setListeningNowADM] = useState([]);
  const [NewSinglesADM, setNewSinglesADM] = useState([]);
  const [newAlbums, setnewAlbums] = useState([]);
  const [AdminPlaylistts, setAdminPlaylists] = useState([]);
  /*Хуки*/
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [isPlaylistModalOpen, setIsPlaylistModalOpen] = useState(false);
  const [isAlbumModalOpen, setIsAlbumModalOpen] = useState(false);
  const { playSong } = logicalAudioPlayer();
  const [isRegLogOpen, setIsRegLogOpen] = useState(false);
  const {user} = useAuth();
        console.log('MainPage user:', user);
        const auth = useAuth();
      console.log('auth:', auth);
      console.log('auth.user:', auth?.user);
  /*Хуки*/
  const navigate = useNavigate();
  const handleLogin = () => {
    console.log('Пользователь авторизован');
    navigate('/profile');
  }
  /*Админ панель и все для неее*/
  //треки для секций
  useEffect(() => {
    const fetchTracks = async () => {
      const {data} = await supabase.from('featured_tracks').select('*').order('position');
      setListeningNowADM(data?.filter(t => t.section === "listening_now") || []);
      setNewSinglesADM(data?.filter(t => t.section === "new_singles") || [])
    }
    const fetchPlaylists = async () => {
      const {data} = await supabase.from('admin_playlists').select('*').order("position");
      setAdminPlaylists(data || []);
    }
    const fetchAlbums = async () => {
      const {data} = await supabase.from('featured_albums').select("*").order('position');
      setnewAlbums(data || [])
    }
    fetchTracks();
    fetchAlbums();
    fetchPlaylists();
  }, []);
  /**Админ панель и все для неее*/
  /*Обработка*/
  const handlePlaylistClick = (playlist) => {
    setSelectedPlaylist(playlist);
    setIsPlaylistModalOpen(true);
  };
  const handleAlbumClick = (albums) => {
    setSelectedAlbum(albums);
    setIsAlbumModalOpen(true);
  }
  const handleClosePlaylistModal = () => {
    setSelectedPlaylist(null);
    setIsPlaylistModalOpen(false);
  }
  const handleCloseAlbumModal =() => {
    setSelectedAlbum(null);
    setIsAlbumModalOpen(false);
  } 
  const RLOpen = () => setIsRegLogOpen(true);
  const RLclose = () => setIsRegLogOpen(false);
  return (
    <div id="allPage">
      <Header
        onRLClick={RLOpen}/>
      <main>
        <ImgCarousel />
        <ListeningNow title="Слушают сейчас!" songs={listeningNow} 
            onPlaySong={playSong}
            userId={user?.id}
          />
        <NewSingls title="Новые синглы!" songs={newReleases} />
          <NewAlbums title="Новые альбомы!" 
            albums={newAlbums} 
            onPlaylistClick={handlePlaylistClick} 
          />
        <>
        {AdminPlaylistts.map(playlist => (
            <PlaylistSection 
              title="Выбор редакции" 
              playlists={playlist}
              onPlaylistClick={handleAlbumClick} 
            />
          ))}
          <ModalPlaylist 
            playlist={selectedPlaylist} 
            isOpen={isPlaylistModalOpen} 
            onClose={handleClosePlaylistModal} 
            onPlaySong={playSong} 
          />
          <ModalRegLog 
            isOpen={isRegLogOpen}   
            onClose={RLclose} 
            onLogin={handleLogin}
          />
          <ModalAlbums
            albums={selectedAlbum}
            isOpen={isAlbumModalOpen}
            onClose={handleCloseAlbumModal}
            onPlaySong={playSong}
          />
        </>
      </main>
      <Footer />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
export default MainPage;
