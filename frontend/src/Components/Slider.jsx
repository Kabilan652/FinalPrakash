import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Slider = () => {
	const responsive = {

		desktop: {
			breakpoint: { max: 3000, min: 1024 },
			items: 1
		},
		tablet: {
			breakpoint: { max: 1024, min: 464 },
			items: 1
		},
		mobile: {
			breakpoint: { max: 464, min: 0 },
			items: 1
		}
	}
	return (
		<div className="relative overflow-hidden z-10">
			<Carousel
				responsive={responsive}
				showDots={true}
				infinite={true}
				autoPlay={true}
				autoPlaySpeed={3000}
			>
		
				<div><img src="../src/assets/images/slider1.png" alt="slider1"  /></div>
				<div><img src="../src/assets/images/slider2.png" alt="slider2" /></div>
				<div><img src="../src/assets/images/slider3.png" alt="slider3" /></div>
 			</Carousel>
		</div>
	)
}

export default Slider