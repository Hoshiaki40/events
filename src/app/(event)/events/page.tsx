import Link from "next/link";
import { auth } from "@/auth";

import { Button } from "@/src/presentation/components/ui/button";
import { EventList } from "@/src/presentation/event/EventList";

export default async function HomePage() {
  return (
    <div className="container space-y-8 py-6">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">All Events</h1>
        <Link href="/events/create">
          <Button>Create Event</Button>
        </Link>
      </div>

      <EventList />
    </div>
  );
}
