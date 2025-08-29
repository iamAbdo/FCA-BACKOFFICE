import React, { useState } from 'react';
import { Plus, Phone, User, CheckCircle, XCircle, Search } from 'lucide-react';
import { useData } from '../context/DataContext';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { Input } from '../components/ui/Input';

export function Technicians() {
  const { technicians } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedTechnician, setSelectedTechnician] = useState<any>(null);

  const filteredTechnicians = technicians.filter(tech =>
    tech.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tech.speciality.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des techniciens</h1>
          <p className="text-gray-600">Gérez votre équipe de maintenance</p>
        </div>
        <Button onClick={() => setShowAddModal(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Ajouter technicien
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Rechercher un technicien..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-[#EE2635] focus:border-[#EE2635] sm:text-sm"
        />
      </div>

      {/* Technicians Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTechnicians.map((technician) => (
          <Card key={technician.id} onClick={() => setSelectedTechnician(technician)}>
            <CardContent>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-[#003751] rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{technician.name}</h3>
                    <p className="text-sm text-gray-500">{technician.speciality}</p>
                    <div className="flex items-center space-x-1 mt-1">
                      <Phone className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-500">{technician.phone}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <Badge variant={technician.available ? 'success' : 'error'}>
                    {technician.available ? (
                      <>
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Disponible
                      </>
                    ) : (
                      <>
                        <XCircle className="w-3 h-3 mr-1" />
                        Occupé
                      </>
                    )}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Technician Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Ajouter un technicien"
        size="md"
      >
        <div className="space-y-4">
          <Input label="Nom complet" placeholder="Ex: Karim Messaoudi" />
          <Input label="Spécialité" placeholder="Ex: Climatisation" />
          <Input label="Téléphone" placeholder="Ex: +213 555 123 456" />
          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="ghost" onClick={() => setShowAddModal(false)}>
              Annuler
            </Button>
            <Button onClick={() => setShowAddModal(false)}>
              Ajouter
            </Button>
          </div>
        </div>
      </Modal>

      {/* Technician Detail Modal */}
      <Modal
        isOpen={selectedTechnician !== null}
        onClose={() => setSelectedTechnician(null)}
        title={selectedTechnician?.name || ''}
        size="md"
      >
        {selectedTechnician && (
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-[#003751] rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-medium">{selectedTechnician.name}</h3>
                <p className="text-gray-600">{selectedTechnician.speciality}</p>
                <p className="text-sm text-gray-500">{selectedTechnician.phone}</p>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <h4 className="font-medium text-gray-900 mb-2">Statistiques</h4>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-2xl font-bold text-gray-900">12</p>
                  <p className="text-sm text-gray-600">Interventions ce mois</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-2xl font-bold text-gray-900">4.8</p>
                  <p className="text-sm text-gray-600">Note moyenne</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}