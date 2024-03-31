"use client";

import avatar1 from "@/assets/img/avatars/avatar1.png";
import avatar2 from "@/assets/img/avatars/avatar2.png";
import avatar3 from "@/assets/img/avatars/avatar3.png";
import avatar4 from "@/assets/img/avatars/avatar4.png";
import Card from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import { useCelo } from "@celo/react-celo";
import { useWriteContract } from "wagmi";
import { abi, contractAddress } from "@/abi/mint/abi";

export default function MyTune() {
  const router = useRouter();
  const { writeContract } = useWriteContract();
  const { address } = useCelo();

  function handleMintTokens() {
    if (!address) return console.error("No address found");

    writeContract({
      abi,
      address: contractAddress,
      functionName: "mint",
      args: [address as any, BigInt(10 * 10 ** 18)],
    });
  }

  return (
    <div className="flex h-full w-full flex-col gap-6">
      <h2 className="text-navy-700 mb-4 text-2xl font-bold dark:text-white">My Tune</h2>
      <div className="mx-auto mb-4 flex flex-col gap-6">
        <div className="mx-auto flex flex-row gap-4">
          <Card
            extra="items-center text-center justify-center flex-col w-[96px] min-w-[96px] h-[96px] p-1 bg-cover cursor-pointer shadow-xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none"
            onClick={() => {}}
          >
            <span className="text-xl font-bold">3</span>
            <span className="text-gray-400">Tracks Liked</span>
          </Card>
          <Card
            extra="items-center text-center justify-center flex-col w-[96px] min-w-[96px] h-[96px] p-1 bg-cover cursor-pointer shadow-xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none"
            onClick={() => {}}
            style={{ boxShadow: "0px 2px 10px 0px rgba(168, 85, 247, 1), 0px -2px 10px 0px rgba(14, 165, 233, 0.7)" }}
          >
            <span className="text-xl font-bold">105</span>
            <span className="text-gray-400">Tune points</span>
          </Card>
          <Card
            extra="items-center text-center justify-center flex-col w-[96px] min-w-[96px] h-[96px] p-1 bg-cover cursor-pointer shadow-xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none"
            onClick={() => {}}
          >
            <span className="text-xl font-bold">5</span>
            <span className="text-gray-400">Artist Supporting</span>
          </Card>
        </div>

        <Button className="w-full" onClick={() => handleMintTokens()}>
          Mint Tokens
        </Button>
      </div>

      <h2 className="text-navy-700 mb-4 pt-4 text-2xl font-bold dark:text-white">Registered events</h2>
      <div className="mx-2 mb-4 flex flex-col gap-4">
        <Card
          extra="items-start p-6 text-left justify-center flex-col h-[118px] p-1 bg-cover cursor-pointer shadow-md shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none"
          onClick={() => {
            router.push("/events/1");
          }}
          style={{ boxShadow: "0px 2px 10px 0px rgba(168, 85, 247, 1), 0px -2px 10px 0px rgba(14, 165, 233, 0.7)" }}
        >
          <span className="text-xl font-bold">Lana Del Rey’s concert</span>
          <span className="text-gray-400">Lana Del Rey</span>
          <div className="mt-3 h-px w-full bg-gray-300 dark:bg-white/20" />
          <span className="text-gray-500">Purchased with $TUNE tokens</span>
          <span className="font-semibold text-gray-700">26.04.2024</span>
        </Card>
        <Card
          extra="items-start p-6 text-left justify-center w-auto flex-col h-[118px] p-1 bg-cover cursor-pointer shadow-md shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none"
          onClick={() => {
            router.push("/events/0");
          }}
        >
          <span className="text-xl font-bold">Lil uzi vert’s concert</span>
          <span className="text-gray-400">Lil uzi vert</span>
          <div className="mt-3 h-px w-full bg-gray-300 dark:bg-white/20" />
          <span className="font-semibold text-gray-700">23.06.2024</span>
        </Card>
      </div>

      <div className="mb-4 flex justify-between pt-4">
        <h2 className="text-navy-700 mb-1 text-2xl font-bold dark:text-white">You liked </h2>
      </div>
      <div className="mx-auto flex flex-col gap-2">
        <Card
          extra="p-6 justify-center text-left w-auto h-[80px] p-1 bg-cover cursor-pointer shadow-xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none"
          onClick={() => {}}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-[48px] w-[48px]">
                <img className="h-full w-full rounded-full" src={avatar1.src} alt="" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold">Dark Realize Sound</span>
                <span className="text-gray-400">Logan Benton</span>
              </div>
            </div>
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 32 32"
                strokeWidth="1.5"
                stroke="#82D616"
                className="mt-1 h-6 w-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
              </svg>
              <span className="text-xl text-lime-500">3</span>
            </div>
          </div>
        </Card>
        <Card
          extra="p-6 justify-center text-left w-auto h-[80px] p-1 bg-cover cursor-pointer shadow-xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none"
          onClick={() => {}}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-[48px] w-[48px]">
                <img className="h-full w-full rounded-full" src={avatar2.src} alt="" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold">Light Realize Protect</span>
                <span className="text-gray-400">Logan Benton</span>
              </div>
            </div>
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 32 32"
                strokeWidth="1.5"
                stroke="#82D616"
                className="mt-1 h-6 w-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
              </svg>
              <span className="text-xl text-lime-500">12</span>
            </div>
          </div>
        </Card>
      </div>

      <div className="mb-4 flex justify-between pt-8">
        <h2 className="text-navy-700 mb-1 text-2xl font-bold dark:text-white">You have supported</h2>
      </div>
      <div className="mx-auto flex flex-col gap-2">
        <Card
          extra="p-6 justify-center text-left w-auto h-[80px] p-1 bg-cover cursor-pointer shadow-xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none"
          onClick={() => {}}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-[48px] w-[48px]">
                <img className="h-full w-full rounded-full" src={avatar3.src} alt="" />
              </div>
              <span className="text-lg font-bold">Dark Realize Protect</span>
            </div>
          </div>
        </Card>
        <Card
          extra="p-6 justify-center text-left w-auto h-[80px] p-1 bg-cover cursor-pointer shadow-xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none"
          onClick={() => {}}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-[48px] w-[48px]">
                <img className="h-full w-full rounded-full" src={avatar4.src} alt="" />
              </div>
              <span className="text-lg font-bold">Light Music</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
