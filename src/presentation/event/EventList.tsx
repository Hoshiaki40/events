"use client";

import { useEffect, useRef, useState } from "react";
import { getEvents } from "@/src/server-actions/event/getEvents";
import { useQuery } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";

import { Input } from "@/src/presentation/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/presentation/components/ui/select";
import { EventCard } from "@/src/presentation/event/EventCard";

import { Button } from "../components/ui/button";

interface EventListProps {
  userId?: string;
  showActions?: boolean;
}

export function useEventList(options?: {
  userId?: string;
  status?: string;
  search?: string;
}) {
  return useQuery({
    queryKey: ["events", options],
    queryFn: () => getEvents(options),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function EventList({ userId }: EventListProps) {
  const [filter, setFilter] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSearch, setActiveSearch] = useState("");

  const { data, isLoading, error } = useEventList({
    userId,
    status: filter === "ALL" ? undefined : filter,
    search: activeSearch,
  });

  const handleSearch = () => {
    setActiveSearch(searchTerm);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  if (isLoading) return <div>Chargement...</div>;
  if (error) return <div>Erreur de chargement</div>;

  const filteredEvents = data?.data || [];

  return (
    <div className="space-y-6">
      <div className="flex gap-4 rounded-lg bg-muted p-4">
        <Input
          placeholder="Search events..."
          className="flex-1"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Statuses</SelectItem>
            <SelectItem value="DRAFT">Draft</SelectItem>
            <SelectItem value="UPCOMING">Upcoming</SelectItem>
            <SelectItem value="ONGOING">Ongoing</SelectItem>
            <SelectItem value="COMPLETED">Completed</SelectItem>
            <SelectItem value="CANCELLED">Cancelled</SelectItem>
          </SelectContent>
        </Select>

        <Button onClick={handleSearch}>Search</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center text-muted-foreground">
          Aucun événement trouvé
        </div>
      )}
    </div>
  );
}
