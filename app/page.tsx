import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 animate-gradient bg-[length:200%_200%]">
      <h1 className="text-4xl md:text-6xl font-bold text-white text-center px-4 animate-pulse">
        Rotfests beste leilighet!
      </h1>
    </div>
  );
}
