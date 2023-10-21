"use client";

import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Image, ImageProps } from "@react-three/drei";
import { easing } from "maath";

interface ImageMeshProp {
  position?: [number, number, number];
}

const ImageMesh = (prop: ImageMeshProp) => {
  const imageRef = useRef<any>(null);
  const [clicked, setclicked] = useState(false);
  const [hovered, sethovered] = useState(false);

  useFrame((_, delta) => {
    easing.damp3(
      imageRef.current.scale,
      [clicked ? 4 : 1, clicked ? 4 : 4, 1],
      0.15,
      delta
    );
    imageRef.current.material.scale[0] = imageRef.current.scale.x;
    imageRef.current.material.scale[1] = imageRef.current.scale.y;
    easing.damp(imageRef.current.scale, "y", hovered ? 6 : 5, 0.15, delta);

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
      ></Image>
    </>
  );
};

const IntroScene = () => {
  return (
    <div className="h-[400px] w-full">
      <Canvas>
        <ambientLight intensity={10} />
        <directionalLight />
        <ImageMesh />
        <ImageMesh position={[1.25, 0, 0]} />
        {/* <OrbitControls /> */}
      </Canvas>
    </div>
  );
};

export default IntroScene;
