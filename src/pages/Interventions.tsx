import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useData } from '../context/DataContext';
import { InterventionTable } from '../components/InterventionTable';
import { InterventionSidepanel } from '../components/InterventionSidepanel';
import { Button } from '../components/ui/Button';

export function Interventions() {
  const navigate = useNavigate();
  const { interventions, clients, sites, technicians, updateIntervention } = useData();
  const [selectedInterventionId, setSelectedInterventionId] = useState<string | null>(null);

  const selectedIntervention = selectedInterventionId 
    ? interventions.find(i => i.id === selectedInterventionId) || null
    : null;

  const handleCompleteIntervention = (id: string) => {
    updateIntervention(id, { 
      status: 'completed', 
      completedAt: new Date()
    });
  };

  const handleAssignTechnician = (interventionId: string) => {
    // En production, ouvrir une modal d'assignation
    updateIntervention(interventionId, { 
      status: 'assigned',
      assignedTo: technicians.find(t => t.available)?.id
    });
  };

  return (
    <div className="flex h-full relative">
      <div className={`flex-1 transition-all duration-300 ${selectedIntervention ? 'lg:mr-96' : ''}`}>
        <div className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Interventions</h1>
              <p className="text-gray-600">Gérez vos demandes d'intervention</p>
            </div>
            <Button onClick={() => navigate('/interventions/new')}>
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle intervention
            </Button>
          </div>

          <InterventionTable
            interventions={interventions}
            clients={clients}
            sites={sites}
            technicians={technicians}
            onViewIntervention={setSelectedInterventionId}
            onAssignTechnician={handleAssignTechnician}
            onCompleteIntervention={handleCompleteIntervention}
          />
        </div>
      </div>

      {/* Sidepanel */}
      {selectedIntervention && (
        <div className="fixed lg:absolute inset-0 lg:inset-auto lg:right-0 lg:top-0 lg:bottom-0 z-50">
        <InterventionSidepanel
          intervention={selectedIntervention}
          clients={clients}
          sites={sites}
          technicians={technicians}
          onClose={() => setSelectedInterventionId(null)}
          onComplete={handleCompleteIntervention}
        />
        </div>
      )}
    </div>
  );
}