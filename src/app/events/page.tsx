import { EventCard } from "@/components/cards/event-card";
import { events } from "@/mocks/events";

import Link from "next/link";

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
