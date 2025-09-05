export interface Batch {
  id: string;
  name: string;
  time: string; // e.g. "6:00AM - 7:00AM"
  members: number;
  maxMembers?: number;
  linkedPlanIds: string[];
}

export interface BatchMember {
  id: string;
  name: string;
  planName: string;
  endDate: string;
}

export interface Plan {
  id: string;
  name: string;
  duration: string;
  price: number;
  description: string;
  linkedBatchIds: string[];
} 