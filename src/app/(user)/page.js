import Image from "next/image";
import Description from "@/src/app/(user)/homepage/description"
import Hero from "@/src/app/(user)/homepage/hero";
import Direction from "@/src/app/(user)/homepage/direction";

export default function Home() {
  return (
    <>
      <Description />
      <Hero />
      <Direction />
    </>
  );
}
