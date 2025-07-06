import Image from "next/image";
import Description from "@/app/homepage/description"
import Hero from "@/app/homepage/hero"
import Direction from "@/app/homepage/direction"

export default function Home() {
  return (
    <>
      <Description />
      <Hero />
      <Direction />
    </>
  );
}
