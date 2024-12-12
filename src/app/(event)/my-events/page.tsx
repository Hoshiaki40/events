import Link from "next/link";
import { auth } from "@/auth";

import { Button } from "@/src/presentation/components/ui/button";
import { EventList } from "@/src/presentation/event/EventList";

export default async function MyEventsPage() {
  const session = await auth();
  return (
    <div className="container space-y-8 py-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Events</h1>
        <Link href="/events/create">
          <Button>Create New Event</Button>
        </Link>
      </div>

      <EventList userId={session?.user.id} />
    </div>
  );
}
