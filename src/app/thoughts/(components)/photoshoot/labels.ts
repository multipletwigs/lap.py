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
import { StaticImageData } from "next/image";

interface PhotoItem {
  src: StaticImageData;
  alt: string;
  dialogContent: {
    title: string;
    description: string;
  };
}

const PHOTO_ITEMS: PhotoItem[] = [
  {
    src: photo1,
    alt: "Crusty Buildings",
    dialogContent: {
      title: "Crusty Buildings",
      description:
        "I think we didn't really have an idea on what to do for this photo, but it reminds me of staring randomly into space to trick ghosts into thinking you see them hahaha",
    },
  },
  {
    src: photo2,
    alt: "Side Profile :<",
    dialogContent: {
      title: "Side Profile :<",
      description:
        "What was on my mind honestly? I just remembered it was hot and humid because it rained.",
    },
  },
  {
    src: photo3,
    alt: "Me!!!",
    dialogContent: {
      title: "Me!!!",
      description: "0 thoughts behind this one. But the scenery looked cool.",
    },
  },
  {
    src: photo4,
    alt: "Walking down to the river",
    dialogContent: {
      title: "Walking down to the river",
      description:
        "Okay I guess there's some planning to this one, it was actually a long shot of me walking down towards the river. It looked really aesthetically pleasing at the end.",
    },
  },
  {
    src: photo5,
    alt: "I found some leaves",
    dialogContent: {
      title: "I found some leaves",
      description:
        "The story here is after walking down from the previous pic, I found some leaves. ",
    },
  },
  {
    src: photo6,
    alt: "Anyone know what this is?",
    dialogContent: {
      title: "Anyone know what this is?",
      description:
        "I was pretty facinated by this thing. Google says it's an albino spider. However, this close up was one of my favourite shots.",
    },
  },
  {
    src: photo7,
    alt: "Spider on a stick",
    dialogContent: {
      title: "Spider on a stick",
      description: "I picked it up :3",
    },
  },
  {
    src: photo8,
    alt: "Thoughts",
    dialogContent: {
      title: "Thoughts",
      description:
        "Actually I was wondering about a lot of things. My life, my job, my emotions and future? However i was too captivated by the city view to think about it actually.",
    },
  },
  {
    src: photo9,
    alt: "CITY!",
    dialogContent: {
      title: "CITY!",
      description:
        "Dystopian vibes. What a good day to die in the middle of it.",
    },
  },
  {
    src: photo10,
    alt: "Damn I have to walk back up?",
    dialogContent: {
      title: "Damn I have to walk back up?",
      description:
        "At that point we spent 2 hours there already and I think I was really tired.",
    },
  },
  {
    src: photo11,
    alt: "An alley",
    dialogContent: {
      title: "An alley",
      description:
        "When I was a kid, I used to sneak into my neighbours house, ahem. Through this alley way. I'm happy to see nothing changed, except for more moss and kittens.",
    },
  },
];

export default PHOTO_ITEMS;
