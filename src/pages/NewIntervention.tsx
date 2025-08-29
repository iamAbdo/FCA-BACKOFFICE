import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { useData } from '../context/DataContext';
import { InterventionForm } from '../components/forms/InterventionForm';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';

export function NewIntervention() {
  const navigate = useNavigate();
  const { addIntervention } = useData();
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [createdInterventionId, setCreatedInterventionId] = useState<string>('');

  const handleSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      // Simulation de l'API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const intervention = {
        ...data,
        status: data.assignedTo ? 'assigned' : 'draft' as const,
        scheduledDate: new Date(data.scheduledDate),
      };
      
      addIntervention(intervention);
      const interventionId = Date.now().toString();
      setCreatedInterventionId(interventionId);
      setShowSuccess(true);
    } catch (error) {
      alert('Erreur lors de la création de l\'intervention');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    navigate('/interventions');
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour
        </Button>
        <h1 className="text-2xl font-bold text-gray-900">Nouvelle intervention</h1>
        <p className="text-gray-600">Créez une nouvelle demande d'intervention</p>
      </div>

      <InterventionForm
        onSubmit={handleSubmit}
        onCancel={() => navigate(-1)}
        isLoading={isLoading}
      />

      {/* Success Modal */}
      <Modal
        isOpen={showSuccess}
        onClose={handleSuccessClose}
        title="Intervention créée avec succès"
        size="md"
      >
        <div className="text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <p className="text-gray-600 mb-6">
            Votre intervention a été créée et enregistrée dans le système.
          </p>
          <div className="flex justify-center space-x-3">
            <Button variant="ghost" onClick={handleSuccessClose}>
              Retour à la liste
            </Button>
            <Button onClick={() => navigate(`/interventions/${createdInterventionId}`)}>
              Voir la fiche
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}