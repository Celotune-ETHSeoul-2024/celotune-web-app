"use client";

import { useState } from "react";

import arrowLeft from "@/assets/icons/arrow-left.svg";
import buttonRight from "@/assets/icons/button-right.svg";
import clock from "@/assets/icons/clock.svg";
import diamond from "@/assets/icons/diamond.svg";
import pin from "@/assets/icons/pin.svg";
import avatar4 from "@/assets/img/avatars/avatar4.png";
import Link from "next/link";
import Image from "next/image";
import { useCelo } from "@celo/react-celo";
import { writeContract, connect } from "@wagmi/core";
import { injected } from "@wagmi/connectors";
import { abi, contractAddress } from "@/abi/nft/abi";
import { toast } from "react-toastify";
import { config } from "@/app/layout";

interface ITicketCounts {
  standard: number;
  vip: number;
  meetAndGreet: number;
}

type TicketType = "standard" | "vip" | "meetAndGreet";

const _TicketPrice = {
  standard: "5 CELO",
  vip: "10 CELO",
  meetAndGreet: "25 CELO",
};

export default function Event({ params }: { params: { slug: string } }) {
  const { address } = useCelo();

  const eventId = parseInt(params.slug!, 10);

  const eventData = events[eventId];

  const { name, coverSrc } = eventData;

  const [ticketCounts, setTicketCounts] = useState<ITicketCounts>({
    standard: 0,
    vip: 0,
    meetAndGreet: 0,
  });

  const updateTicketCount = (type: TicketType, delta: number) => {
    setTicketCounts((prevCounts) => ({
      ...prevCounts,
      [type]: Math.max(prevCounts[type] + delta, 0), // Prevent negative values
    }));
  };

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

  return (
    <div className="relative w-full text-black">
      <Link href="/events">
        <button className=" absolute z-10 m-2 flex h-[36px] w-[36px] items-center justify-center rounded-[50%] bg-black">
          <Image alt={"<-"} className="h-[20px] w-[20px]" src={arrowLeft} />
        </button>
      </Link>
      <img src={coverSrc} className="relative rounded-3xl" alt={`${name} cover`} />
      <div className="flex items-center justify-between pt-4">
        <div className="flex items-center gap-2">
          <div className="h-[38px] w-[38px] rounded-[50%]">
            <Image width={100} height={100} className="rounded-[50%]" src={avatar4.src} alt="Avatar" />
          </div>
          <div className="flex flex-col">
            <div className="text-[16px] text-slate-900">Concert name</div>
            <div className="text-[12px] text-gray-400">Artist</div>
          </div>
        </div>
        <div>
          <Image alt=">" src={buttonRight} className="h-[24px] w-[24px] text-black" />
        </div>
      </div>

      <div className="pt-4 text-[24px] text-slate-950">{name}</div>

      {/* Description */}

      <div className="flex flex-col justify-start pt-2">
        <div className="text-[18px] text-slate-800">Description</div>
        <div className="pt-1 text-[12px] text-gray-400">
          The fifth concert tour by American singer-songwriter Lana Del Rey in support of the fifth studio album Lust
          for Life.
        </div>
      </div>

      {/* Date & Time */}

      <div className="pt-4">
        <div className="text-[16px] text-slate-800">Data & Time</div>
        <div className="flex items-center gap-0.5">
          <Image alt="pin" src={pin} className="h-[14px] w-[14px] " />
          <div className="text-[12px] text-slate-950">25 August 2024</div>
        </div>
        <div className="flex items-center gap-0.5">
          <Image alt="time" src={clock} className="h-[14px] w-[14px]" />
          <div className="text-[12px] text-slate-950">19:00 PM</div>
        </div>
      </div>

      {/* Tickets */}

      <div className="pt-4">
        <div className="text-[18px] text-slate-800">Tickets</div>
        <div className="flex flex-col gap-2 pt-2">
          {Object.entries(ticketCounts).map(([type, count]) => (
            <div key={type} className="flex h-[40px] justify-between gap-2 pt-1 text-[12px] text-black">
              <button className="w-[110px] rounded-[10px] bg-[#fcff52] p-2 text-start font-semibold text-black">
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
              <button className="w-[90px] rounded-[10px] bg-white p-2">{_TicketPrice[type as TicketType]}</button>
              <button
                className="w-[40px] rounded-[10px] bg-white p-2"
                onClick={() => updateTicketCount(type as TicketType, -1)}
              >
                -
              </button>
              <div className="w-[40px] rounded-[10px] bg-white p-2 text-center">{count}</div>
              <button
                className="w-[40px] rounded-[10px] bg-white p-2"
                onClick={() => updateTicketCount(type as TicketType, 1)}
              >
                +
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={() => {
            handleMintNft(address as string);
          }}
          className="mt-4 flex h-[40px] w-[100%] items-center justify-center gap-2 rounded-[40px] bg-[#fcff52] text-[14px] font-semibold text-black"
        >
          Buy Ticket
        </button>
      </div>
    </div>
  );
}
