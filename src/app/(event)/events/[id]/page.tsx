"use client";

import { getEventById } from "@/src/server-actions/event/getEventById";
import { useQuery } from "@tanstack/react-query";
import { CalendarDays, MapPin, Tag, Users } from "lucide-react";

import { Button } from "@/src/presentation/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/presentation/components/ui/card";

export function useEventDetails(eventId: string) {
  return useQuery({
    queryKey: ["event", eventId],
    queryFn: () => getEventById(eventId),
    enabled: !!eventId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export default function EventPage({ params }: { params: { id: string } }) {
  const { data, isLoading, error } = useEventDetails(params.id);

  if (isLoading) return <div>Chargement...</div>;
  if (error) return <div>Erreur de chargement</div>;
  if (!data?.success) return <div>Événement non trouvé</div>;

  const event = data.data!;

  return (
    <div className="container space-y-8 py-6">
      <main>
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>{event.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative aspect-[16/9]">
                <img
                  src={
                    event.imageUrl || "/placeholder.svg?height=400&width=800"
                  }
                  alt={event.title}
                  className="h-full w-full rounded-md object-cover"
                />
              </div>
              <p>{event.description}</p>
              <div className="flex flex-wrap gap-2">
                {event.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-muted px-2 py-1 text-sm text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Event Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-5 w-5 text-muted-foreground" />
                <span>
                  {event.date.toLocaleDateString()} at{" "}
                  {event.date.toLocaleTimeString()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-muted-foreground" />
                <span>{event.capacity} attendees</span>
              </div>
              <div className="flex items-center gap-2">
                <Tag className="h-5 w-5 text-muted-foreground" />
                <span>{event.category}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Register for Event</Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
}
