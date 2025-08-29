import React, { useState } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Search, Filter, Eye, User, CheckCircle } from 'lucide-react';
import { Intervention, Client, Site, Technician } from '../types';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';

interface InterventionTableProps {
  interventions: Intervention[];
  clients: Client[];
  sites: Site[];
  technicians: Technician[];
  onViewIntervention: (id: string) => void;
  onAssignTechnician: (interventionId: string) => void;
  onCompleteIntervention: (interventionId: string) => void;
}

export function InterventionTable({ 
  interventions, 
  clients, 
  sites, 
  technicians,
  onViewIntervention,
  onAssignTechnician,
  onCompleteIntervention
}: InterventionTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');

  const getClientName = (clientId: string) => {
    return clients.find(c => c.id === clientId)?.name || 'Client inconnu';
  };

  const getSiteName = (siteId: string) => {
    return sites.find(s => s.id === siteId)?.name || 'Site inconnu';
  };

  const getTechnicianName = (technicianId?: string) => {
    if (!technicianId) return 'Non assigné';
    return technicians.find(t => t.id === technicianId)?.name || 'Technicien inconnu';
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

  const filteredInterventions = interventions.filter(intervention => {
    const matchesSearch = intervention.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         getClientName(intervention.clientId).toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || intervention.status === statusFilter;
    const matchesPriority = !priorityFilter || intervention.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0 sm:space-x-4">
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Rechercher une intervention..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-[#EE2635] focus:border-[#EE2635] sm:text-sm"
            />
          </div>
          
          <div className="flex space-x-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#EE2635] focus:border-[#EE2635]"
            >
              <option value="">Tous les statuts</option>
              <option value="draft">Brouillon</option>
              <option value="assigned">Assignée</option>
              <option value="in_progress">En cours</option>
              <option value="completed">Terminée</option>
            </select>
            
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#EE2635] focus:border-[#EE2635]"
            >
              <option value="">Toutes les priorités</option>
              <option value="urgent">Urgent</option>
              <option value="high">Élevée</option>
              <option value="medium">Moyenne</option>
              <option value="low">Faible</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto min-w-full">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Intervention
                </th>
                <th className="hidden sm:table-cell px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client / Site
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priorité
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="hidden md:table-cell px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Technicien
                </th>
                <th className="hidden lg:table-cell px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date prévue
                </th>
                <th className="px-3 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInterventions.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center">
                    <div className="text-gray-500">
                      <Filter className="w-8 h-8 mx-auto mb-2" />
                      <p>Aucun résultat trouvé</p>
                      <p className="text-sm mt-1">Essayez de modifier vos filtres</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredInterventions.map((intervention) => (
                  <tr 
                    key={intervention.id}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => onViewIntervention(intervention.id)}
                  >
                    <td className="px-3 sm:px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900 truncate max-w-[200px]">{intervention.title}</div>
                        <div className="text-xs text-gray-500">{intervention.type === 'preventive' ? 'Préventive' : 'Corrective'}</div>
                        <div className="sm:hidden text-xs text-gray-500 mt-1">
                          {getClientName(intervention.clientId)}
                        </div>
                      </div>
                    </td>
                    <td className="hidden sm:table-cell px-3 sm:px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{getClientName(intervention.clientId)}</div>
                      <div className="text-sm text-gray-500">{getSiteName(intervention.siteId)}</div>
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                      <Badge variant={getPriorityBadge(intervention.priority)}>
                        {getPriorityLabel(intervention.priority)}
                      </Badge>
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                      <Badge variant={getStatusBadge(intervention.status)}>
                        {getStatusLabel(intervention.status)}
                      </Badge>
                    </td>
                    <td className="hidden md:table-cell px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {getTechnicianName(intervention.assignedTo)}
                    </td>
                    <td className="hidden lg:table-cell px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {format(intervention.scheduledDate, 'dd/MM/yyyy HH:mm', { locale: fr })}
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2" onClick={(e) => e.stopPropagation()}>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onViewIntervention(intervention.id)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        {intervention.status !== 'completed' && !intervention.assignedTo && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onAssignTechnician(intervention.id)}
                            className="hidden sm:inline-flex"
                          >
                            <User className="w-4 h-4" />
                          </Button>
                        )}
                        {intervention.status === 'in_progress' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onCompleteIntervention(intervention.id)}
                            className="hidden sm:inline-flex"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}