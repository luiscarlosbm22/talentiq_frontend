import { Carousel } from "@material-tailwind/react";
import page1 from "../assets/carousel_inicio/page1.png"
import page2 from "../assets/carousel_inicio/page2.png"
import page3 from "../assets/carousel_inicio/page3.png"

const CarouselInicio = () => {
    return (
        <Carousel
            transition={{ duration: 1 }}
            loop={true}
            autoplay={true}
            autoplayDelay={7000}
            className="rounded-xl max-w-6xl overflow-hidden"
            navigation={({ setActiveIndex, activeIndex, length }) => (
                <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                    {new Array(length).fill("").map((_, i) => (
                        <span
                            key={i}
                            className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                                }`}
                            onClick={() => setActiveIndex(i)}
                        />
                    ))}
                </div>
            )}
        >
            <img
                src={page1}
                alt="image 1"
                className="w-full object-cover sm:h-[700px] md:h-[500px] lg:h-[700px]"
            />
            <img
                src={page2}
                alt="image 2"
                className="w-full object-cover sm:h-[700px] md:h-[500px] lg:h-[700px]"
            />
            <img
                src={page3}
                alt="image 3"
                className="w-full object-cover sm:h-[700px] md:h-[500px] lg:h-[700px]"
            />
        </Carousel>
    )
}

export default CarouselInicio