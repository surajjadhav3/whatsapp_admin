export interface Group {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  createdAt: string;
  ownerId: string;
  userCount?: number;
  capacity?: number;
  link?: string;
  admin?: string;
} 