//import React from "react";
import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";
import ImgCarousel from "../components/Carousel.tsx";
function MainPage() {
  return (
    <div id="allPage">
      <Header showSearch={true} />
      <main>
        <ImgCarousel />
      </main>
      <Footer />
    </div>
  );
}
export default MainPage;
