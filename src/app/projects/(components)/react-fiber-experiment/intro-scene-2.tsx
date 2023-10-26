"use client";

import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Image } from "@react-three/drei";
import { easing } from "maath";
import CanvasWrapper from "./canvas-wrapper";
import { HeartIcon } from "@radix-ui/react-icons";

interface ImageMeshProp {
  position?: [number, number, number];
}

const ImageMesh = (prop: ImageMeshProp) => {
  const imageRef = useRef<any>(null);
  const [clicked, setclicked] = useState(false);
  const [hovered, sethovered] = useState(false);

  useFrame((_, delta) => {
    // Animates the expansion of the image
    easing.damp3(imageRef.current.scale, [clicked ? 10 : 1, 8, 1], 0.15, delta);
    imageRef.current.material.scale[0] = imageRef.current.scale.x;
    imageRef.current.material.scale[1] = imageRef.current.scale.y;

    // Animates the hover y scretch of the image
    easing.damp(imageRef.current.scale, "y", hovered ? 6 : 5, 0.15, delta);

    // Only scale the image to the needed size when clicked due to hover
    if (!clicked) imageRef.current.material.scale[1] = imageRef.current.scale.y;
  });

  return (
    <>
      <Image
        ref={imageRef}
        onClick={() => setclicked(!clicked)}
        onPointerOver={() => sethovered(true)}
        onPointerOut={() => sethovered(false)}
        scale={[1, 5]}
        position={prop.position || [0, 0, 0]}
        url="/monga-photoshoot/image-1.jpeg"
      />
    </>
  );
};

const IntroScene2 = () => {
  return (
    <CanvasWrapper
      height={"medium"}
      alertProps={{
        title: "Image Mesh",
        description: "Try clicking on the image or hovering over it!",
        icon: <HeartIcon className="h-4 w-4" />,
      }}
    >
      <Canvas>
        <ImageMesh />
      </Canvas>
    </CanvasWrapper>
  );
};

export default IntroScene2;
