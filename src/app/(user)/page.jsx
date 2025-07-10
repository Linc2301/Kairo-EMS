import Image from "next/image";
import Description from "@/src/app/(user)/home/description"
import Hero from "@/src/app/(user)/home/hero";
import Direction from "@/src/app/(user)/home/direction";

export default function Home() {
  return (
    <>
      <Description />
      <Hero />
      <Direction />
    </>
  );
}
