import Card from "@/components/ui/card";
import Link from "next/link";

const HomePages = [
  { title: "Artists", icon: "🎙️", link: "/artists" },
  { title: "Events", icon: "🎟️", link: "/events" },
  { title: "My Tune", icon: "💎", link: "/my-tune" },
];

const HomeBox = ({ title, icon, link }: { title: string; icon: string; link: string }) => {
  return (
    <Link href={link}>
      <Card extra="items-center justify-center flex-col w-full h-[170px] bg-cover cursor-pointer">
        <div
          className="relative flex h-full w-full flex-col items-center justify-center gap-3 rounded-[20px] bg-cover bg-clip-border"
          style={{ background: "linear-gradient(178.09deg, #fcff52 -6.26%, #FFBBEC 94.28%)" }}
        >
          <div className="flex h-[56px] w-[56px] items-center justify-center rounded-full bg-white text-2xl">
            {icon}
          </div>
          <h4 className="text-primary text-xl font-bold capitalize dark:text-white">{title}</h4>
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
