import Link from "next/link";
import { CalendarDays, Edit, MapPin, Trash2, Users } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/src/presentation/components/ui/alert-dialog";
import { Button } from "@/src/presentation/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/src/presentation/components/ui/card";
import { Event } from "@/src/domain/event/event";

interface EventCardProps {
  event: Event;
  featured?: boolean;
  showActions?: boolean;
  onDelete?: (id: string) => void;
}

export function EventCard({
  event,
  featured = false,
  showActions = false,
  onDelete,
}: EventCardProps) {
  return (
    <Card
      className={`overflow-hidden transition-all hover:shadow-lg ${
        featured ? "border-2 border-primary" : ""
      }`}
    >
      <div className="relative aspect-[16/9]">
        <img
          src={event.imageUrl || "/placeholder.svg?height=400&width=600"}
          alt={event.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute right-4 top-4 flex gap-2">
          <span className="rounded-full bg-background/80 px-2 py-1 text-xs font-semibold text-foreground backdrop-blur-sm">
            {event.category}
          </span>
          {event.status === "UPCOMING" && (
            <span className="rounded-full bg-primary/80 px-2 py-1 text-xs font-semibold text-primary-foreground backdrop-blur-sm">
              Upcoming
            </span>
          )}
        </div>
      </div>
      <CardHeader className="space-y-2">
        <div className="space-y-1">
          <h3 className="line-clamp-1 text-xl font-semibold">{event.title}</h3>
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {event.description}
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm">
          <div className="flex items-center text-muted-foreground">
            <CalendarDays className="mr-2 h-4 w-4 text-primary" />
            <span>{event.date.toLocaleDateString()}</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <MapPin className="mr-2 h-4 w-4 text-primary" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <Users className="mr-2 h-4 w-4 text-primary" />
            <span>{event.capacity} attendees</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="gap-2">
        {showActions ? (
          <>
            <Link href={`/events/${event.id}/edit`} className="flex-1">
              <Button variant="outline" className="w-full">
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
            </Link>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="flex-1 text-destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your event.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => onDelete && onDelete(event.id)}
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </>
        ) : (
          <Link href={`/events/${event.id}`} className="w-full">
            <Button
              className={`w-full ${featured ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""}`}
              variant={featured ? "default" : "outline"}
            >
              View Details
            </Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  );
}
