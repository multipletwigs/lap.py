"use client";

import CanvasWrapper from "@/app/projects/(components)/react-fiber-experiment/canvas-wrapper";
import { useScroll, Image, ScrollControls, Scroll } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { useRef, useState } from "react";

/**
 * Probably not in use anymore, maybe for pure threejs styles
 */
interface ImageItemProps {
  index: number;
  position: [number, number, number];
  scale: [number, number];
  c?: THREE.Color;
  url: number;
}

function Item({ index, position, scale, c, url, ...props }: ImageItemProps) {
  const ref = useRef<any>();
  const scroll = useScroll();
  const [hovered, hover] = useState(false);
  const over = () => hover(true);
  const out = () => hover(false);

  return (
    <Image
      ref={ref}
      url={`/monga-photoshoot/image-${url}.jpg`}
      scale={scale}
      {...props}
      position={position}
      onPointerOver={over}
      onPointerOut={out}
    />
  );
}

function Items({ h = 1, gap = 0.2 }) {
  const urls = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const { height, width } = useThree((state) => state.viewport);
  const hW = h + gap;

  return (
    <ScrollControls damping={0.1} pages={(urls.length * hW + 1.5) / height}>
      <Scroll>
        {urls.map((url, i) => (
          <Item
            key={i}
            index={i}
            position={[0, -(hW * i) + 2.5, 0]}
            scale={[width, 1]}
            url={url}
          />
        ))}
      </Scroll>
    </ScrollControls>
  );
}

const CanvasItem = () => {
  return (
    <CanvasWrapper height={"medium"} background="none">
      <Canvas>
        <Items />
      </Canvas>
    </CanvasWrapper>
  );
};

export default CanvasItem;
