import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Intervention, Client, Site, Technician, KPI, Notification } from '../types';

interface DataContextType {
  interventions: Intervention[];
  clients: Client[];
  sites: Site[];
  technicians: Technician[];
  kpis: KPI[];
  notifications: Notification[];
  addIntervention: (intervention: Omit<Intervention, 'id' | 'createdAt' | 'timeline'>) => void;
  updateIntervention: (id: string, updates: Partial<Intervention>) => void;
  markNotificationRead: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Données de démonstration
const mockClients: Client[] = [
  { id: '1', name: 'Sonatrach', contact: 'Mohamed Kara', phone: '+213 555 123 456' },
  { id: '2', name: 'Air Algérie', contact: 'Fatima Bensalem', phone: '+213 555 789 012' },
  { id: '3', name: 'Sonelgaz', contact: 'Youcef Amrani', phone: '+213 555 345 678' },
];

const mockSites: Site[] = [
  { id: '1', name: 'Siège Social Alger', address: 'Rue Didouche Mourad, Alger', clientId: '1' },
  { id: '2', name: 'Aéroport Houari Boumediene', address: 'Dar El Beida, Alger', clientId: '2' },
  { id: '3', name: 'Centrale Électrique Oran', address: 'Zone Industrielle, Oran', clientId: '3' },
];

const mockTechnicians: Technician[] = [
  { id: '1', name: 'Karim Messaoudi', speciality: 'Climatisation', available: true, phone: '+213 555 111 222' },
  { id: '2', name: 'Sara Boualem', speciality: 'Électricité', available: false, phone: '+213 555 333 444' },
  { id: '3', name: 'Omar Belhadj', speciality: 'Plomberie', available: true, phone: '+213 555 555 666' },
];

export function DataProvider({ children }: { children: ReactNode }) {
  const [interventions, setInterventions] = useState<Intervention[]>([
    {
      id: '1',
      title: 'Maintenance préventive climatisation',
      description: 'Contrôle et nettoyage des unités de climatisation',
      clientId: '1',
      siteId: '1',
      type: 'preventive',
      priority: 'medium',
      status: 'in_progress',
      assignedTo: '1',
      createdAt: new Date('2025-01-15T09:00:00'),
      scheduledDate: new Date('2025-01-16T14:00:00'),
      attachments: ['maintenance-checklist.pdf'],
      timeline: [
        {
          id: '1',
          type: 'created',
          description: 'Intervention créée',
          timestamp: new Date('2025-01-15T09:00:00'),
          user: 'Ahmed Benali'
        },
        {
          id: '2',
          type: 'assigned',
          description: 'Assignée à Karim Messaoudi',
          timestamp: new Date('2025-01-15T09:15:00'),
          user: 'Ahmed Benali'
        }
      ]
    }
  ]);

  const [kpis] = useState<KPI[]>([
    { label: 'Interventions en cours', value: 12, change: 5, trend: 'up' },
    { label: 'Interventions terminées', value: 45, change: -2, trend: 'down' },
    { label: 'Temps moyen résolution', value: 2.3, change: 0.1, trend: 'stable' },
    { label: 'Satisfaction client', value: 94, change: 3, trend: 'up' },
  ]);

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Intervention urgente',
      message: 'Nouvelle intervention priorité élevée assignée',
      type: 'warning',
      timestamp: new Date('2025-01-15T10:30:00'),
      read: false,
      actionUrl: '/interventions/2'
    },
    {
      id: '2',
      title: 'Rapport généré',
      message: 'Rapport mensuel prêt pour téléchargement',
      type: 'success',
      timestamp: new Date('2025-01-15T08:15:00'),
      read: false,
      actionUrl: '/reports'
    }
  ]);

  const addIntervention = (interventionData: Omit<Intervention, 'id' | 'createdAt' | 'timeline'>) => {
    const newIntervention: Intervention = {
      ...interventionData,
      id: Date.now().toString(),
      createdAt: new Date(),
      timeline: [
        {
          id: '1',
          type: 'created',
          description: 'Intervention créée',
          timestamp: new Date(),
          user: 'Ahmed Benali'
        }
      ]
    };
    setInterventions(prev => [...prev, newIntervention]);
  };

  const updateIntervention = (id: string, updates: Partial<Intervention>) => {
    setInterventions(prev => 
      prev.map(intervention => 
        intervention.id === id ? { ...intervention, ...updates } : intervention
      )
    );
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  return (
    <DataContext.Provider value={{
      interventions,
      clients: mockClients,
      sites: mockSites,
      technicians: mockTechnicians,
      kpis,
      notifications,
      addIntervention,
      updateIntervention,
      markNotificationRead
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}