"use client";

import { useEffect, useState } from "react";
import { RiLockUnlockFill } from "react-icons/ri";
import { toast } from "react-toastify";

import Card from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import bannerDefault from "@/assets/img/banners/banner.png";
import avatar1 from "@/assets/img/avatars/avatar1.png";
import playlistImg2 from "@/assets/img/nfts/NFT-2.jpg";
import playlistImg3 from "@/assets/img/nfts/NFT-3.jpg";
import Image from "next/image";
import { useCelo } from "@celo/react-celo";
import { config } from "@/app/layout";
import { writeContract, connect } from "@wagmi/core";
import { injected } from "@wagmi/connectors";
import { abi, contractAddress } from "@/abi/nft/abi";

function Loader() {
  return (
    <div role="status">
      <svg
        aria-hidden="true"
        className="mr-2 h-8 w-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export default function Artist() {
  const { address } = useCelo();

  const [isLoading, setIsLoading] = useState(false);
  const [isFollowed, setIsFollowed] = useState(() => sessionStorage.getItem("followArtist"));

  async function handleMintNft(address: string) {
    if (!address) return console.error("No address found");

    try {
      await connect(config, { connector: injected() });

      writeContract(config, {
        abi,
        address: contractAddress,
        functionName: "safeMint",
        args: [address as any],
      }).then(() => {
        toast("🦄 Song NFT has been minted!", {
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

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  return (
    <div className="flex h-full w-full flex-col gap-6">
      <Card extra="items-center flex-col w-full h-full p-[16px] bg-cover">
        <Link href="/artists">
          <Button variant="default" className="absolute left-2 z-10 text-xs">
            &#x2190;
          </Button>
        </Link>

        {/* Background and profile */}
        <div
          className="relative mt-1 flex h-32 w-full justify-center rounded-xl bg-cover"
          style={{ backgroundImage: `url(${bannerDefault.src})` }}
        >
          <div className="dark:!border-navy-700 absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400">
            <Image
              height={200}
              width={200}
              className="h-full w-full rounded-full"
              style={{ backgroundSize: "", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}
              src={avatar1.src}
              alt="Artist's Profile Image"
            />
          </div>
        </div>

        {/* Name and genre */}
        <div className="mt-16 flex flex-col items-center">
          <h4 className="text-navy-700 text-xl font-bold dark:text-white">Drake</h4>
          <h5 className="text-base font-normal text-gray-600">Pop / Rap</h5>
        </div>

        {/* Follow */}
        <div className="mt-4 flex">
          <Button
            variant={isFollowed ? "secondary" : "default"}
            className="w-[125px]"
            onClick={() => {
              if (isFollowed) {
                setIsFollowed(null);
                sessionStorage.removeItem("followArtist");
              } else {
                setIsFollowed("true");
                sessionStorage.setItem("followArtist", "true");

                toast(`🧑‍🎤 Thanks for supporting the artist! +10 Tune coins added`, {
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
              }
            }}
          >
            {isFollowed ? "Unfollow" : "Follow"}
          </Button>
        </div>

        {/* Post followers */}
        <div className="mb-3 mt-6 flex gap-4 md:!gap-14">
          <div className="flex flex-col items-center justify-center">
            <h4 className="text-navy-700 text-2xl font-bold dark:text-white">3</h4>
            <p className="text-sm font-normal text-gray-600">Tracks</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <h4 className="text-navy-700 text-2xl font-bold dark:text-white">123,000</h4>
            <p className="text-sm font-normal text-gray-600">Followers</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <h4 className="text-navy-700 text-2xl font-bold dark:text-white">138</h4>
            <p className="text-sm font-normal text-gray-600">NFTs Minted</p>
          </div>
        </div>
      </Card>

      <div className="flex flex-col">
        <h2 className="text-navy-700 mb-1 text-2xl font-bold dark:text-white">Music</h2>

        <div className="overflow-y-none flex gap-3 overflow-x-auto py-3">
          {isLoading ? (
            <div className="flex w-full items-center justify-center">
              <Loader />
            </div>
          ) : (
            <>
              <Card extra="items-center flex-col w-[118px] min-w-[118px] h-[118px] p-1 bg-cover cursor-pointer">
                <div
                  className="relative flex h-full w-full items-center justify-center rounded-[16px] bg-cover bg-clip-border bg-center"
                  style={{ backgroundImage: `url(${playlistImg2.src})` }}
                />
              </Card>

              <Card
                onClick={() => {
                  handleMintNft(address as string);
                }}
                extra="animate-pulse flex flex-col justify-center items-center w-[118px] min-w-[118px] h-[118px] p-1 bg-cover cursor-pointer"
              >
                <div
                  className="relative flex h-full w-full items-center justify-center rounded-[16px] bg-[#000] bg-cover bg-clip-border !opacity-30"
                  style={{ backgroundImage: `url(${playlistImg3.src})` }}
                />
                <RiLockUnlockFill className="text-navy-700 absolute h-10 w-10 text-inherit" />
              </Card>
            </>
          )}
        </div>
      </div>

      <hr className="h-px border-0 bg-gray-200 dark:bg-gray-700" />

      <div className="flex flex-col">
        <h2 className="text-navy-700 mb-1 text-2xl font-bold dark:text-white">Upcoming Event</h2>

        <div className="flex gap-3 overflow-x-auto py-3">
          <Card extra="items-center flex-col w-full p-1 bg-cover">
            <div className="relative flex h-full w-full flex-col justify-start gap-3 p-5">
              <div>
                <h3 className="text-navy-700 text-base font-bold dark:text-white">Date & Time:</h3>
                <p className="text-sm font-normal text-gray-700">23.06.2024 7PM - 10PM</p>
              </div>

              <div>
                <h3 className="text-navy-700 text-base font-bold dark:text-white">Venue:</h3>
                <p className="text-sm font-normal text-gray-700">Roger's Center</p>
              </div>

              <div>
                <h3 className="text-navy-700 text-base font-bold dark:text-white">Description:</h3>
                <p className="text-sm font-normal text-gray-700">The biggest show ever!</p>
              </div>

              <div>
                <h3 className="text-navy-700 text-base font-bold dark:text-white">Ticketing:</h3>
                <p className="text-sm font-normal text-gray-700">
                  <strong>Standard Access:</strong> 20 CELO
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
