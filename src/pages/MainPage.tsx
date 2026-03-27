//import React from "react";
import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";
import ImgCarousel from "../components/Carousel.tsx";
import ListeningNow from "../components/ListeningNow.tsx";
import NewRelease from "../components/NewRelease.tsx";
import "../styles/compStyle.css";
import { newReleases, listeningNow } from "../data/songs.ts";
function MainPage() {
  return (
    <div id="allPage">
      <Header showSearch={true} />
      <main>
        <ImgCarousel />
        <ListeningNow title = "Слушают сейчас!" songs={listeningNow} />
        <NewRelease title = "Новые релизы!" songs={newReleases} />
        <p>aaaa</p>
        <p>aaaa</p>
        <p>aaaa</p>
        <p>aaaa</p>

        <p>aaaa</p>
        <p>aaaa</p>
        <p>aaaa</p>
        <p>aaaa</p>
        <p>aaaa</p>
        <p>aaaa</p>
        <p>aaaa</p>
        <p>aaaa</p>
        <p>aaaa</p>
        <p>aaaa</p>
        <p>aaaa</p>
        <p>aaaa</p>
        <p>aaaa</p>
        <p>aaaa</p>
        <p>aaaa</p>

        <p>aaaa</p>
        <p>aaaa</p>

        
      </main>
      <Footer />
    </div>
  );
}
export default MainPage;
