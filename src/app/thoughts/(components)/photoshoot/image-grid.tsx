import Image, { StaticImageData } from "next/image";
import photo1 from "public/monga-photoshoot/image-1.jpg";
import photo2 from "public/monga-photoshoot/image-2.jpg";
import photo3 from "public/monga-photoshoot/image-3.jpg";
import photo4 from "public/monga-photoshoot/image-4.jpg";
import photo5 from "public/monga-photoshoot/image-5.jpg";
import photo6 from "public/monga-photoshoot/image-6.jpg";
import photo7 from "public/monga-photoshoot/image-7.jpg";
import photo8 from "public/monga-photoshoot/image-8.jpg";
import photo9 from "public/monga-photoshoot/image-9.jpg";
import photo10 from "public/monga-photoshoot/image-10.jpg";
import photo11 from "public/monga-photoshoot/image-11.jpg";

interface ImageItemProps {
  src: StaticImageData;
  alt: string;
}

const ImageItem = (props: ImageItemProps) => {
  return (
    <Image
      src={props.src}
      alt={props.alt}
      width={500}
      height={500}
      placeholder="blur"
    />
  );
};

const ImageGrid = () => {
  return (
    <div className="grid grid-cols-1 gap-4 my-8 sm:grid-cols-2">
      <ImageItem src={photo1} alt="monga-photoshoot-1" />
      <ImageItem src={photo2} alt="monga-photoshoot-2" />
      <ImageItem src={photo3} alt="monga-photoshoot-3" />
      <ImageItem src={photo4} alt="monga-photoshoot-4" />
      <ImageItem src={photo5} alt="monga-photoshoot-5" />
      <ImageItem src={photo6} alt="monga-photoshoot-6" />
      <ImageItem src={photo7} alt="monga-photoshoot-7" />
      <ImageItem src={photo8} alt="monga-photoshoot-8" />
      <ImageItem src={photo9} alt="monga-photoshoot-9" />
      <ImageItem src={photo10} alt="monga-photoshoot-10" />
      <ImageItem src={photo11} alt="monga-photoshoot-11" />
    </div>
  );
};

export default ImageGrid;
