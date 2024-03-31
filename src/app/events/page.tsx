import { EventCard } from "@/components/cards/event-card";

import event2 from "@/assets/img/backgrounds/event2.png";
import event3 from "@/assets/img/backgrounds/event3.png";
import Link from "next/link";

export const events = [
  {
    id: "1",
    name: "Lil uzi vert’s concert",
    location: {
      city: "Lisbon",
      placement: "Rolling Loud",
    },
    time: "21:00 AM",
    coverSrc: event2.src,
  },
  {
    id: "2",
    name: "Lana Del Rey’s concert",
    location: {
      city: "Leeds",
      placement: "Leeds Festival",
    },
    time: "19:00 AM",
    coverSrc: event3.src,
  },
];

export default function Events() {
  return (
    <div className="flex h-auto w-full flex-col gap-6">
      <h2 className="text-navy-700 mb-4 text-2xl font-bold dark:text-white">Upcoming Events</h2>
      <div className="flex flex-col gap-4">
        {events.map((props, i) => (
          <Link key={props.id} href={`/events/${i}`}>
            <EventCard key={props.name} {...props} />
          </Link>
        ))}
      </div>
    </div>
  );
}
