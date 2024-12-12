"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Users } from "lucide-react";

import { useCurrentSession } from "@/src/presentation/hooks/use-current-session";
import { Button } from "@/src/presentation/components/ui/button";
import { Input } from "@/src/presentation/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/presentation/components/ui/popover";
import { User } from "@/src/domain/jee/users";

interface UserAssignmentPopoverProps {
  taskId: string;
  assignedUserIds: string[];
  onAssign: (userId: string) => void;
  onRevoke: (userId: string) => void;
}

const UserAssignmentPopover: React.FC<UserAssignmentPopoverProps> = ({
  taskId,
  assignedUserIds,
  onAssign,
  onRevoke,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const user = useCurrentSession();

  const { data: users = [] } = useQuery<Omit<User, "token">[]>({
    queryKey: ["users", searchQuery],
    queryFn: async () => {
      if (!searchQuery) return [];

      const response = await fetch(
        `http://localhost:8080/api/users/search?search=${searchQuery}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      return await response.json();
    },
    enabled: searchQuery.length > 0,
  });

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm">
          <Users className="mr-2 h-4 w-4" />
          {assignedUserIds.length} assignee(s)
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <Input
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="space-y-2">
            {users.map((user) => (
              <div key={user.id}>
                {user.name}
                {assignedUserIds.includes(user.id) ? (
                  <Button onClick={() => onRevoke(user.id)}>Revoke</Button>
                ) : (
                  <Button onClick={() => onAssign(user.id)}>Assign</Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default UserAssignmentPopover;
