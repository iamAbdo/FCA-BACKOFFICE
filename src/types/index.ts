export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'maintenance_manager' | 'project_manager';
}

export interface Client {
  id: string;
  name: string;
  contact: string;
  phone: string;
}

export interface Site {
  id: string;
  name: string;
  address: string;
  clientId: string;
}

export interface Technician {
  id: string;
  name: string;
  speciality: string;
  available: boolean;
  phone: string;
}

export interface Intervention {
  id: string;
  title: string;
  description: string;
  clientId: string;
  siteId: string;
  type: 'preventive' | 'corrective';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'draft' | 'assigned' | 'in_progress' | 'completed' | 'cancelled';
  assignedTo?: string;
  createdAt: Date;
  scheduledDate: Date;
  completedAt?: Date;
  attachments: string[];
  timeline: TimelineEvent[];
}

export interface TimelineEvent {
  id: string;
  type: 'created' | 'assigned' | 'started' | 'updated' | 'completed';
  description: string;
  timestamp: Date;
  user: string;
}

export interface KPI {
  label: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
}