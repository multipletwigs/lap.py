"use client";

import Image, { StaticImageData } from "next/image";
import { Button } from "@/components/ui/button";
import {
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import PHOTO_ITEMS from "./labels";

interface ImageItemProps {
  src: StaticImageData;
  alt: string;
  dialog: any;
}

const ImageItem = (props: ImageItemProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Image
          src={props.src}
          alt={props.alt}
          placeholder="blur"
          fill={false}
          className={"hover:cursor-pointer"}
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{props.dialog.title}</DialogTitle>
          <div className="my-4">
            <Image
              fill={false}
              placeholder={"blur"}
              src={props.src}
              alt={props.alt}
            />
          </div>
          <DialogDescription>{props.dialog.description}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

const ImageGrid = () => {
  return (
    <div className="grid grid-cols-1 gap-4 my-8 sm:grid-cols-2">
      {PHOTO_ITEMS.map((image, index) => (
        <ImageItem
          src={image.src}
          alt={image.alt}
          key={index}
          dialog={image.dialogContent}
        />
      ))}
    </div>
  );
};

export default ImageGrid;
