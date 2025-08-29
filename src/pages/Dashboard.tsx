import React, { useState } from 'react';
import { Plus, Calendar, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { KPICard } from '../components/KPICard';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export function Dashboard() {
  const { kpis, interventions } = useData();
  const [selectedKPI, setSelectedKPI] = useState<any>(null);
  const navigate = useNavigate();

  const urgentInterventions = interventions.filter(i => i.priority === 'urgent' || i.priority === 'high');
  const todayInterventions = interventions.filter(i => 
    format(i.scheduledDate, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
  );

  const getPriorityBadge = (priority: string) => {
    const variants = {
      urgent: 'error',
      high: 'warning', 
      medium: 'info',
      low: 'default'
    };
    return variants[priority as keyof typeof variants] || 'default';
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

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
          <p className="text-gray-600">Aperçu de votre activité maintenance</p>
        </div>
        <Button onClick={() => navigate('/interventions/new')}>
          <Plus className="w-4 h-4 mr-2" />
          Créer intervention
        </Button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => (
          <KPICard 
            key={index} 
            kpi={kpi} 
            onClick={() => setSelectedKPI(kpi)} 
          />
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interventions urgentes */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-[#EE2635]" />
              <h3 className="text-lg font-medium">Interventions urgentes</h3>
            </div>
          </CardHeader>
          <CardContent>
            {urgentInterventions.length === 0 ? (
              <p className="text-gray-500 text-center py-4">Aucune intervention urgente</p>
            ) : (
              <div className="space-y-3">
                {urgentInterventions.slice(0, 3).map(intervention => (
                  <div 
                    key={intervention.id}
                    className="p-3 border border-red-200 rounded-lg bg-red-50 cursor-pointer hover:bg-red-100 transition-colors"
                    onClick={() => navigate(`/interventions/${intervention.id}`)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-sm text-gray-900">{intervention.title}</p>
                        <p className="text-xs text-gray-600 mt-1">
                          {format(intervention.scheduledDate, 'dd/MM/yyyy HH:mm', { locale: fr })}
                        </p>
                      </div>
                      <Badge variant={getPriorityBadge(intervention.priority)}>
                        {getPriorityLabel(intervention.priority)}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Planning du jour */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-[#003751]" />
              <h3 className="text-lg font-medium">Planning du jour</h3>
            </div>
          </CardHeader>
          <CardContent>
            {todayInterventions.length === 0 ? (
              <p className="text-gray-500 text-center py-4">Aucune intervention prévue aujourd'hui</p>
            ) : (
              <div className="space-y-3">
                {todayInterventions.slice(0, 4).map(intervention => (
                  <div 
                    key={intervention.id}
                    className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => navigate(`/interventions/${intervention.id}`)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-sm text-gray-900">{intervention.title}</p>
                        <p className="text-xs text-gray-600 mt-1">
                          {format(intervention.scheduledDate, 'HH:mm', { locale: fr })}
                        </p>
                      </div>
                      <Badge variant={getStatusBadge(intervention.status)}>
                        {getStatusLabel(intervention.status)}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Activité récente */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-medium">Activité récente</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-[#EE2635] rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">Nouvelle intervention créée</p>
                  <p className="text-xs text-gray-500">Il y a 2 minutes</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">Intervention terminée</p>
                  <p className="text-xs text-gray-500">Il y a 15 minutes</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">Technicien assigné</p>
                  <p className="text-xs text-gray-500">Il y a 1 heure</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* KPI Detail Modal */}
      <Modal
        isOpen={selectedKPI !== null}
        onClose={() => setSelectedKPI(null)}
        title={selectedKPI?.label || ''}
        size="md"
      >
        {selectedKPI && (
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-4xl font-bold text-gray-900">{selectedKPI.value}</p>
              <div className="flex items-center justify-center space-x-2 mt-2">
                <span className={`text-sm ${selectedKPI.trend === 'up' ? 'text-green-600' : selectedKPI.trend === 'down' ? 'text-red-600' : 'text-gray-500'}`}>
                  {selectedKPI.change > 0 ? '+' : ''}{selectedKPI.change} par rapport au mois dernier
                </span>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <h4 className="font-medium text-gray-900 mb-2">Détails</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <p>• Période : Janvier 2025</p>
                <p>• Objectif mensuel : {selectedKPI.value + 5}</p>
                <p>• Performance : {Math.round((selectedKPI.value / (selectedKPI.value + 5)) * 100)}%</p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}