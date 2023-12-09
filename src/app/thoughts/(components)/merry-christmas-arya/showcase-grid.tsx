import Image from "next/image";
import React from "react";

import Image1 from "public/arya-christmas/flower-plants-1.jpg";
import Image2 from "public/arya-christmas/flower-plants-2.jpg";
import Image3 from "public/arya-christmas/flower-plants-3.jpg";
import Image4 from "public/arya-christmas/flower-plants-4.jpg";

const Images = [Image1, Image2, Image3, Image4];

const ImageGrid = () => {
  return (
    <div className="flex flex-col gap-4">
      {Images.map((image, index) => (
        <div key={index}>
          <Image src={image} alt="Flower plants" fill={false} />
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;
