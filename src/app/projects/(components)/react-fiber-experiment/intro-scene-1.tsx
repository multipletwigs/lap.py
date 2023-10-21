"use client";

import React, { useRef } from "react";
import CanvasWrapper from "./canvas-wrapper";
import { Canvas, useFrame } from "@react-three/fiber";
import { Edges, OrbitControls } from "@react-three/drei";
import { BoxGeometry } from "three";
import { RocketIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

const RotatingBox = () => {
  const boxRef = useRef<BoxGeometry>(null);
  const edgeRef = useRef<any>(null);
  const { theme } = useTheme();

  const rotateBox = (delta: number) => {
    if (boxRef) {
      boxRef.current?.rotateX(delta);
      boxRef.current?.rotateY(delta);
    }
  };

  const rotateEdge = (delta: number, offset?: number) => {
    if (edgeRef) {
      edgeRef.current?.rotateX(delta + (offset || 0));
      edgeRef.current?.rotateY(delta + (offset || 0));
    }
  };

  useFrame((_, delta) => {
    rotateBox(delta);
    rotateEdge(delta, 0.02);
  });

  return (
    <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
      <meshStandardMaterial color={theme === "dark" ? "#4B0082" : "blue"} />
      <boxGeometry args={[2, 2, 2]} ref={boxRef} />
      <Edges ref={edgeRef} color={theme === "dark" ? "white" : "black"} />
    </mesh>
  );
};

const IntroScene1 = () => {
  return (
    <CanvasWrapper
      height={200}
      alertProps={{
        title: "Rotating Box",
        description:
          "You may rotate the box by dragging the mouse as OrbitControls is enabled.",
        icon: <RocketIcon className="h-4 w-4" />,
      }}
    >
      <Canvas>
        <ambientLight intensity={10} />
        <directionalLight />
        <RotatingBox />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </CanvasWrapper>
  );
};

export default IntroScene1;
