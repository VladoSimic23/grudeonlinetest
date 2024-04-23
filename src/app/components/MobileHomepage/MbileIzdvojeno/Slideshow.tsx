import styles from "../../../css/mobile/mobile.module.css";
import Image from "next/image";
import Link from "next/link";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.css";

const Slideshow = ({ images }: any) => {
  return (
    <div className={styles.slideshowContainer}>
      <div className={styles.izdvojenoTop}></div>
      <div className={`${styles.slides} slides`}>
        <Carousel
          transitionTime={500}
          showThumbs={false}
          showIndicators={true}
          showArrows={false}
          showStatus={false}
          infiniteLoop={true}
          autoPlay={true}
          className={styles.carouselEdit}
        >
          {images.map((image: any, index: number) => (
            <Link key={index} href={`/${image?.slug}`}>
              <div className={styles.slide}>
                <h3>{image.title}</h3>

                <Image
                  src={image?.featuredImage?.node?.sourceUrl}
                  width={300}
                  height={250}
                  alt={image?.title}
                  priority={true}
                />
              </div>
            </Link>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Slideshow;
