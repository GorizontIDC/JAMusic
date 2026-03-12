import {Carousel} from 'react-bootstrap';
import '../styles/compStyle.css';
import slide1 from '../assets/images/qwe.png';
import slide2 from '../assets/images/asd.png';
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
            title: 'test first slide',
            description: 'Новые исполнители лета!'
        },
        {
            id:2,
            image: slide2,
            title: 'test second slide',
            description: 'Качёвые альбомы.'
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