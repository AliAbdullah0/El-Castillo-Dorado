import { motion } from "framer-motion";
import React from "react";
import { ImagesSlider } from "./ui/ImageSlider";
import { Link } from "react-router-dom";

export function  Hero() {
  const images = [
    "/photo3.jpg",
    "/photo 1.webp",
    "/photo2.jpeg",
  ];
  return (
    (<ImagesSlider className="h-[40rem]" images={images}>
      <motion.div
        initial={{
          opacity: 0,
          y: -80,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="z-50 flex flex-col justify-center items-center">
        <motion.p
          className="font-bold text-lg p-2 md:p-0 md:text-2xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">
          "Descubre sabores exquisitos y una experiencia inolvidable en el corazón de nuestra cocina."<br />
(Discover exquisite flavors and an unforgettable experience at the heart of our cuisine.)
        </motion.p>
        <button
          className="px-4 py-2 backdrop-blur-sm border bg-emerald-300/10 border-emerald-500/20 text-white mx-auto text-center rounded-full relative mt-4">
          <Link to='explore'>Explore →</Link>
          <div
            className="absolute inset-x-0  h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-emerald-500 to-transparent" />
        </button>
      </motion.div>
    </ImagesSlider>)
  );
}
