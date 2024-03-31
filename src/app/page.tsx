import Card from "@/components/ui/card";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

const HomePages = [
  { title: "Artists", icon: "🎙️", link: "/artists" },
  { title: "Events", icon: "🎟️", link: "/events" },
  { title: "My Tune", icon: "💎", link: "/profile" },
  { title: "Leaderboard", icon: "🏆", link: "/leaderboard" },
  { title: "Market", icon: "🛍️", link: "/", disabled: true },
  { title: "Battles", icon: "⚔️", link: "/", disabled: true },
];

const HomeBox = ({
  title,
  icon,
  link,
  disabled,
}: {
  title: string;
  icon: string;
  link: string;
  disabled?: boolean;
}) => {
  return (
    <Link href={link}>
      <Card extra="items-center justify-center flex-col w-full h-[170px] bg-cover cursor-pointer">
        <div
          className="relative flex h-full w-full flex-col items-center justify-center gap-3 rounded-[20px] bg-cover bg-clip-border"
          style={{
            background: !disabled
              ? "linear-gradient(178.09deg, #fcff52 -6.26%, #FFBBEC 94.28%)"
              : "linear-gradient(178.09deg, #FEFFDC -6.26%, #FFE3F7 94.28%)",
          }}
        >
          <div className="flex h-[56px] w-[56px] items-center justify-center rounded-full bg-white text-2xl">
            {icon}
          </div>
          <h4
            className={twMerge(
              "text-primary text-xl font-bold capitalize dark:text-white",
              !disabled
                ? "cursor-pointer font-bold"
                : "cursor-not-allowed font-semibold text-gray-500 dark:text-gray-400"
            )}
          >
            {title}
          </h4>
        </div>
      </Card>
    </Link>
  );
};

export default function Home() {
  return (
    <>
      <div className="grid h-full grid-cols-2 gap-4">
        {HomePages.map((item, index) => (
          <HomeBox key={index} {...item} />
        ))}
      </div>
    </>
  );
}
