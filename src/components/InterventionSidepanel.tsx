import React, { useState } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { X, Clock, User, MapPin, FileText, Camera, CheckCircle2, AlertCircle } from 'lucide-react';
import { Intervention, Client, Site, Technician } from '../types';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { Modal } from './ui/Modal';

interface InterventionSidepanelProps {
  intervention: Intervention | null;
  clients: Client[];
  sites: Site[];
  technicians: Technician[];
  onClose: () => void;
  onComplete: (id: string) => void;
}

export function InterventionSidepanel({ 
  intervention, 
  clients, 
  sites, 
  technicians, 
  onClose, 
  onComplete 
}: InterventionSidepanelProps) {
  const [showCompleteModal, setShowCompleteModal] = useState(false);

  if (!intervention) return null;

  const client = clients.find(c => c.id === intervention.clientId);
  const site = sites.find(s => s.id === intervention.siteId);
  const technician = technicians.find(t => t.id === intervention.assignedTo);

  const getStatusBadge = (status: string) => {
    const variants = {
      draft: 'default',
      assigned: 'info',
      in_progress: 'warning',
      completed: 'success',
      cancelled: 'error'
    };
    return variants[status as keyof typeof variants] || 'default';
  };

  const getPriorityBadge = (priority: string) => {
    const variants = {
      urgent: 'error',
      high: 'warning',
      medium: 'info',
      low: 'default'
    };
    return variants[priority as keyof typeof variants] || 'default';
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      draft: 'Brouillon',
      assigned: 'Assignée',
      in_progress: 'En cours',
      completed: 'Terminée',
      cancelled: 'Annulée'
    };
    return labels[status as keyof typeof labels] || status;
  };

  const getPriorityLabel = (priority: string) => {
    const labels = {
      urgent: 'Urgent',
      high: 'Élevée',
      medium: 'Moyenne',
      low: 'Faible'
    };
    return labels[priority as keyof typeof labels] || priority;
  };

  const handleComplete = () => {
    onComplete(intervention.id);
    setShowCompleteModal(false);
    onClose();
  };

  return (
    <>
      <div className="w-full lg:w-96 bg-white shadow-xl flex flex-col h-full">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">Fiche d'intervention</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Title and Status */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{intervention.title}</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant={getStatusBadge(intervention.status)}>
                  {getStatusLabel(intervention.status)}
                </Badge>
                <Badge variant={getPriorityBadge(intervention.priority)}>
                  {getPriorityLabel(intervention.priority)}
                </Badge>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{client?.name}</p>
                  <p className="text-sm text-gray-500">{site?.name}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Prévue le {format(intervention.scheduledDate, 'dd/MM/yyyy à HH:mm', { locale: fr })}
                  </p>
                  <p className="text-sm text-gray-500">
                    Créée le {format(intervention.createdAt, 'dd/MM/yyyy à HH:mm', { locale: fr })}
                  </p>
                </div>
              </div>

              {technician && (
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{technician.name}</p>
                    <p className="text-sm text-gray-500">{technician.speciality}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            {intervention.description && (
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Description</h4>
                <p className="text-sm text-gray-600">{intervention.description}</p>
              </div>
            )}

            {/* Timeline */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-3">Historique</h4>
              <div className="space-y-3">
                {intervention.timeline.map((event, index) => (
                  <div key={event.id} className="flex space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-2 h-2 bg-[#EE2635] rounded-full mt-2"></div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{event.description}</p>
                      <p className="text-xs text-gray-500">
                        {format(event.timestamp, 'dd/MM/yyyy à HH:mm', { locale: fr })} par {event.user}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Attachments */}
            {intervention.attachments.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Pièces jointes</h4>
                <div className="space-y-2">
                  {intervention.attachments.map((attachment, index) => (
                    <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded-md">
                      <FileText className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{attachment}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Photos section placeholder */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Photos</h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                  <Camera className="w-6 h-6 text-gray-400" />
                </div>
                <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                  <Camera className="w-6 h-6 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Checklist */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Checklist</h4>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm text-gray-600">Vérification des filtres</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm text-gray-600">Nettoyage des unités</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm text-gray-600">Test de fonctionnement</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
          {intervention.status === 'in_progress' && (
            <Button
              className="w-full"
              onClick={() => setShowCompleteModal(true)}
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Clôturer l'intervention
            </Button>
          )}
        </div>
      </div>

      {/* Complete Modal */}
      <Modal
        isOpen={showCompleteModal}
        onClose={() => setShowCompleteModal(false)}
        title="Clôturer l'intervention"
        size="md"
      >
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-6 h-6 text-yellow-500 mt-0.5" />
            <div>
              <p className="text-sm text-gray-900 font-medium">
                Confirmer la clôture de l'intervention ?
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Cette action marquera l'intervention comme terminée. Vous pourrez toujours consulter les détails plus tard.
              </p>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="ghost" onClick={() => setShowCompleteModal(false)}>
              Annuler
            </Button>
            <Button onClick={handleComplete}>
              Confirmer la clôture
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}