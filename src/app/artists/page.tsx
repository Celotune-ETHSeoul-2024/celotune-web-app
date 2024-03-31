"use client";

import { Button } from "@/components/ui/button";
import Card from "@/components/ui/card";

import { useCelo } from "@celo/react-celo";
import { writeContract } from "@wagmi/core";
import { abi, contractAddress } from "@/abi/nft/abi";
import { toast } from "react-toastify";
import { config } from "../layout";
import Link from "next/link";

const artistsMock = [
  {
    name: "Ariana Grande",
    img: "https://plus.unsplash.com/premium_photo-1673639729701-c903b5d2be4b?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "/artist/ariana-grande",
  },
  {
    name: "Billie Eilish",
    img: "https://plus.unsplash.com/premium_photo-1673266633993-013acd448898?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "/artist/billie-eilish",
  },
  {
    name: "Drake",
    img: "https://images.unsplash.com/photo-1565909562682-aa6cdb2b81a7?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "/artist/drake",
  },
  {
    name: "Ed Sheeran",
    img: "https://images.unsplash.com/photo-1520986606214-8b456906c813?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "/artist/ed-sheeran",
  },
  {
    name: "Justin Bieber",
    img: "https://images.unsplash.com/photo-1615288283030-0e966c5688c2?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "/artist/justin-bieber",
  },
];
const ArtistBox = ({ name, img, link }: { name: string; img: string; link: string }) => {
  return (
    <Card extra="items-center justify-center flex-col w-full h-[170px] bg-cover cursor-pointer">
      <div
        className="relative flex h-full w-full flex-col items-center justify-center rounded-[20px]"
        style={{
          background: `url(${img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h4 className="text-xl font-bold capitalize text-[#FCF6F1] dark:text-white">{name}</h4>
      </div>
    </Card>
  );
};

export default function Artist() {
  const { address } = useCelo();

  async function handleMintNft() {
    if (!address) return console.error("No address found");

    try {
      writeContract(config, {
        abi,
        address: contractAddress,
        functionName: "safeMint",
        args: [address as any],
      }).then(() => {
        toast("🦄 NFT has been minted!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <>
      <h2 className="text-navy-700 mb-4 text-2xl font-bold dark:text-white">Artists</h2>

      <div className="grid h-full grid-cols-2 gap-4">
        {artistsMock.map((artist, index) => (
          <Link key={index} href={`/artists/${index}`}>
            <ArtistBox {...artist} />
          </Link>
        ))}
      </div>

      <Button
        className="pt-2"
        onClick={() => {
          handleMintNft();
        }}
      >
        Mint artist's NFT 🦄
      </Button>
    </>
  );
}
