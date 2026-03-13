import {Carousel} from 'react-bootstrap';
import '../styles/compStyle.css';
import '../styles/App.css';
import slide1 from '../assets/images/jpg.jpg';
import slide2 from '../assets/images/asd.jpg';
import slide3 from "../assets/images/zxc.jpg";
interface Slide {
  id: number;
  image: string;
  title: string;
  description: string;
}
function ImgCarousel(){
    const slides: Slide[]=[
        {
            id:1,
            image: slide1,
            title: 'Согрели этой зимой.',
            description: 'Новые исполнители начала года.'
        },
        {
            id:2,
            image: slide2,
            title: 'Концептуально, современно, лирично.',
            description: 'Кто удивил новыми альбомами?.'
        },
        {
            id:3,
            image: slide3,
            title: 'Будь с нами, ведь:',
            description: 'Тебе по вкусу!'
        }
       ]
    return(
<div className="carousel-container">
       <Carousel>
        {slides.map((slide)=>(
            <Carousel.Item key={slide.id}>
                <img className="d-block w-100"
                src={slide.image}
                alt={slide.title}
                style={{height: '400px', objectFit: 'cover'}}/>
                <Carousel.Caption>
                    <h3>{slide.title}</h3>
                    <p>{slide.description}</p>
                </Carousel.Caption>
            </Carousel.Item>
        ))}
       </Carousel>
</div>
    )
}
export default ImgCarousel