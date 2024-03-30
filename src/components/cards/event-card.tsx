import clock from "@/assets/icons/clock.svg";
import pin from "@/assets/icons/pin.svg";
import Image from "next/image";

export const EventCard = (props: any) => {
  const { time, location, coverSrc, name } = props;

  return (
    <div className="relative w-full text-white">
      <img src={coverSrc} className="relative rounded-3xl" alt={`${name} cover`} />
      <div className="absolute bottom-0 isolate w-full rounded-bl-3xl rounded-br-3xl bg-transparent p-[16px] backdrop-blur-[4px] backdrop-brightness-75">
        <div className="text-lg font-semibold">{name}</div>
        <div className="flex w-full flex-row items-center justify-between text-sm">
          <div className="flex items-center">
            <Image src={pin} className="h-4 w-4" alt="Location icon" />
            <div className="ml-2 flex ">
              <div className="text-wrap">{location.placement},&nbsp;</div>
              <div>{location.city}</div>
            </div>
          </div>
          <div className="flex items-center">
            <Image src={clock} className="h-4 w-4" alt="Clock icon" />
            <div className="ml-2">{time}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
