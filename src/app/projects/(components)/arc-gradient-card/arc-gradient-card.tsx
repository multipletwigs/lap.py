"use client";
import { InputWithButton } from "@/components/file-input/file-input";
import Image from "next/image";
import React from "react";

const ArcGradientCards = () => {
  const [imageUrl, setImageUrl] = React.useState("/gradient-card-1.jpg");

  return (
    <div className="flex flex-col items-center justify-center my-16 gap-6">
      <div
        className={
          "w-[320px] h-[320px] flex items-center justify-center bg-secondary relative overflow-clip"
        }
      >
        <Image
          src={imageUrl}
          alt={""}
          width={300}
          height={300}
          className="object-cover w-[250px] h-[250px] z-10"
        ></Image>
        <Image
          src={imageUrl}
          alt={""}
          width={300}
          height={300}
          className="object-cover w-[250px] h-[300px] absolute blur-[50px] top-[70px] saturate-[250%] animate-slow-spin brightness-200 [animation-play-state: paused]"
        ></Image>
        <Image
          src={imageUrl}
          alt={""}
          width={300}
          height={300}
          className="object-cover w-[300px] h-[300px] absolute blur-[50px] bottom-0 rounded-lg saturate-[250%] animate-slow-spin-reverse brightness-200 hover:[animation-play-state:paused]"
        ></Image>
      </div>
      <InputWithButton setImageUrl={setImageUrl} />
    </div>
  );
};

export default ArcGradientCards;
