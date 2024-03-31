"use client";

import { useCallback } from "react";
import { ArrowDownIcon, ArrowUpIcon, MinusIcon } from "@heroicons/react/24/outline";

import Card from "@/components/ui/card";

const gradientColors = [
  "linear-gradient(180deg, #fcff52 0%, #FFBBEC 96.24%)",
  "linear-gradient(180deg, #FDFFA8, #FFBBEC 104.71%)",
  "linear-gradient(168.94deg, #FEFFDC -10.77%, #FFBBEC 106.09%)",
];

const leadersMock = [
  {
    name: "Evelyn",
    delta: 1,
  },
  {
    name: "Liam",
    delta: -1,
  },
  {
    name: "Sophia",
    delta: 0,
  },
  {
    name: "Charlotte",
    delta: 2,
  },
  {
    name: "Isabella",
    delta: 1,
  },
  {
    name: "Mason",
    delta: -1,
  },
  {
    name: "Olivia",
    delta: 2,
  },
  {
    name: "James",
    delta: -4,
  },
];

type Leader = {
  name: string;
  delta: number;
};

interface LeaderboardProps {
  leaders: Leader[];
}

export default function Leaderboard() {
  const getDeltaInfo = useCallback((delta: number) => {
    const deltaInfoMap: Record<number, { color: string; icon: JSX.Element }> = {
      0: {
        color: "var(--tg-theme-grey-color)",
        icon: <MinusIcon className="h-6 w-6 text-[color:var(--tg-theme-grey-color)]" />,
      },
      1: {
        color: "var(--tg-theme-green-color)",
        icon: <ArrowUpIcon className="h-6 w-6 text-[color:var(--tg-theme-green-color)]" />,
      },
      "-1": {
        color: "var(--tg-theme-red-color)",
        icon: <ArrowDownIcon className="h-6 w-6 text-[color:var(--tg-theme-red-color)]" />,
      },
    };

    const { color, icon } = deltaInfoMap[Math.sign(delta)] || deltaInfoMap[0];

    return (
      <div className={`flex items-center gap-1 text-[color:${color}]`}>
        {icon}
        <span className="text-xl font-extrabold text-black">{Math.abs(delta)}</span>
      </div>
    );
  }, []);

  return (
    <div className="flex h-full w-full flex-col gap-6">
      <h1 className="text-navy-700 text-center text-2xl font-bold dark:text-white">Community Leaderboard 🏆</h1>
      <div className="flex flex-col gap-2">
        {leadersMock.map((leader, index) => (
          <Card
            key={index}
            extra={`p-6 justify-center text-left w-auto h-[80px] p-1 bg-cover cursor-pointer shadow-xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none`}
            onClick={() => {}}
            style={{ background: index < 3 ? gradientColors[index] : "" }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div>
                  <span className="h-[48px] w-[48px] text-2xl font-bold text-black">{index + 1}</span>
                </div>
                <div className="flex flex-col text-black">
                  <span className="text-lg font-bold">{leader.name}</span>
                </div>
              </div>
              {getDeltaInfo(leader.delta)}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
