/* eslint-disable react/prop-types */
import { Image } from "@nextui-org/react";

const NextImage = ({ className = "", alt = "Image not found", src }) => {
  return (
    <Image
      className={`opacity-100 ${className || "w-[50px] rounded-md h-auto"}`}
      alt={alt}
      src={
        src ||
        "https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
      }
    />
  );
};

export default NextImage;
