export type TimelineEventType = 
  | 'joined_plan'
  | 'payment_completed'
  | 'group_joined'
  | 'reminder_sent'
  | 'plan_renewed'
  | 'plan_expired';

export interface TimelineEvent {
  id: string;
  userId: string;
  type: TimelineEventType;
  title: string;
  description?: string;
  timestamp: string;
  metadata?: Record<string, any>;
}