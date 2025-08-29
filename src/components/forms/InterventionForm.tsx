import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Upload, X } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Card, CardContent } from '../ui/Card';

interface InterventionFormData {
  title: string;
  description: string;
  clientId: string;
  siteId: string;
  type: 'preventive' | 'corrective';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  scheduledDate: string;
  assignedTo?: string;
}

interface InterventionFormProps {
  onSubmit: (data: InterventionFormData & { attachments: string[] }) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function InterventionForm({ onSubmit, onCancel, isLoading = false }: InterventionFormProps) {
  const { clients, sites, technicians } = useData();
  const { register, handleSubmit, watch, formState: { errors } } = useForm<InterventionFormData>();
  const [attachments, setAttachments] = useState<string[]>([]);
  const [dragOver, setDragOver] = useState(false);

  const selectedClientId = watch('clientId');
  const filteredSites = sites.filter(site => site.clientId === selectedClientId);
  const availableTechnicians = technicians.filter(tech => tech.available);

  const clientOptions = [
    { value: '', label: 'Sélectionner un client' },
    ...clients.map(client => ({ value: client.id, label: client.name }))
  ];

  const siteOptions = [
    { value: '', label: 'Sélectionner un site' },
    ...filteredSites.map(site => ({ value: site.id, label: site.name }))
  ];

  const technicianOptions = [
    { value: '', label: 'Assigner plus tard' },
    ...availableTechnicians.map(tech => ({ value: tech.id, label: `${tech.name} (${tech.speciality})` }))
  ];

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const newAttachments = files.map(file => file.name);
    setAttachments(prev => [...prev, ...newAttachments]);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const handleFormSubmit = (data: InterventionFormData) => {
    // Validation basique
    if (!data.title || !data.clientId || !data.siteId || !data.type || !data.priority || !data.scheduledDate) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }
    
    onSubmit({ 
      ...data, 
      attachments,
      scheduledDate: data.scheduledDate // Garder comme string pour le moment
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newAttachments = files.map(file => file.name);
    setAttachments(prev => [...prev, ...newAttachments]);
  };
  return (
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Input
                label="Titre de l'intervention"
                {...register('title', { required: 'Le titre est obligatoire' })}
                error={errors.title?.message}
                placeholder="Ex: Maintenance préventive climatisation"
              />
            </div>

            <Select
              label="Client"
              {...register('clientId', { required: 'Le client est obligatoire' })}
              options={clientOptions}
              error={errors.clientId?.message}
            />

            <Select
              label="Site"
              {...register('siteId', { required: 'Le site est obligatoire' })}
              options={siteOptions}
              error={errors.siteId?.message}
              disabled={!selectedClientId}
            />

            <Select
              label="Type d'intervention"
              {...register('type', { required: 'Le type est obligatoire' })}
              options={[
                { value: '', label: 'Sélectionner un type' },
                { value: 'preventive', label: 'Préventive' },
                { value: 'corrective', label: 'Corrective' }
              ]}
              error={errors.type?.message}
            />

            <Select
              label="Priorité"
              {...register('priority', { required: 'La priorité est obligatoire' })}
              options={[
                { value: '', label: 'Sélectionner une priorité' },
                { value: 'low', label: 'Faible' },
                { value: 'medium', label: 'Moyenne' },
                { value: 'high', label: 'Élevée' },
                { value: 'urgent', label: 'Urgent' }
              ]}
              error={errors.priority?.message}
            />

            <Input
              label="Date et heure prévue"
              type="datetime-local"
              {...register('scheduledDate', { required: 'La date est obligatoire' })}
              error={errors.scheduledDate?.message}
            />

            <Select
              label="Assigner à un technicien"
              {...register('assignedTo')}
              options={technicianOptions}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description détaillée
            </label>
            <textarea
              {...register('description')}
              rows={4}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#EE2635] focus:border-[#EE2635] sm:text-sm"
              placeholder="Décrivez l'intervention à effectuer..."
            />
          </div>

          {/* Drag & Drop pour pièces jointes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pièces jointes
            </label>
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                dragOver ? 'border-[#EE2635] bg-red-50' : 'border-gray-300 hover:border-gray-400'
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">
                Glissez-déposez vos fichiers ici ou{' '}
                <label className="text-[#EE2635] hover:underline cursor-pointer">
                  <input
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleFileUpload}
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                  parcourir
                </label>
              </p>
              <p className="text-xs text-gray-400 mt-1">PDF, JPG, PNG jusqu'à 10MB</p>
            </div>
            
            {attachments.length > 0 && (
              <div className="mt-3 space-y-2">
                {attachments.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                    <span className="text-sm text-gray-700">{file}</span>
                    <button
                      type="button"
                      onClick={() => removeAttachment(index)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button type="button" variant="ghost" onClick={onCancel}>
              Annuler
            </Button>
            <Button type="submit" loading={isLoading}>
              Créer intervention
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}