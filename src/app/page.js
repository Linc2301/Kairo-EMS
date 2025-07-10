import Image from "next/image";
import Description from "@/src/app/homepage/description"
import Hero from "@/src/app/homepage/hero";
import Direction from "@/src/app/homepage/direction";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


export default function Home() {
  return (
    <>
      <Description/>
      <Hero />
      <Direction />
    </>
  );
}
