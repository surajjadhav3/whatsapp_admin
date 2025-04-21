import { useState, useEffect } from "react";
import { Group } from "../types";
import GroupsService from "../../../services/GroupsService";

// Mock data for demonstration
const mockGroups: Group[] = [
  {
    id: "1",
    name: "Group 1",
    userCount: 45,
    capacity: 50,
    link: "https://example.com/group1",
    admin: "Admin User",
    createdAt: "2023-01-15T00:00:00Z",
    description: "This is group 1 description",
    memberCount: 45,
    ownerId: "user1"
  },
  // Add more mock groups as needed
];

export const useGroups = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setGroups(mockGroups);
      setLoading(false);
    }, 500);
  }, []);

  return { groups, loading, error };
}; 