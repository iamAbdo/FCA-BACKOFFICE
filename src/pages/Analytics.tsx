import { useState } from 'react';
import { BarChart3, CheckCircle, TrendingUp, Calendar, Users, Wrench, Clock } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Select } from '../components/ui/Select';

export function Analytics() {
  const [period, setPeriod] = useState('month');

  const periodOptions = [
    { value: 'week', label: 'Cette semaine' },
    { value: 'month', label: 'Ce mois' },
    { value: 'quarter', label: 'Ce trimestre' },
    { value: 'year', label: 'Cette année' }
  ];

  const stats = [
    { icon: Wrench, label: 'Interventions totales', value: '156', change: '+12%', trend: 'up' },
    { icon: Clock, label: 'Temps moyen résolution', value: '2.3h', change: '-15%', trend: 'down' },
    { icon: Users, label: 'Techniciens actifs', value: '8', change: '+1', trend: 'up' },
    { icon: TrendingUp, label: 'Taux de satisfaction', value: '94%', change: '+3%', trend: 'up' }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Statistiques</h1>
          <p className="text-gray-600">Analysez les performances de votre équipe</p>
        </div>
        <div className="flex items-center space-x-4">
          <Select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            options={periodOptions}
          />
          <Button variant="secondary">
            <Calendar className="w-4 h-4 mr-2" />
            Période personnalisée
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <Icon className="w-8 h-8 text-[#003751] mb-2" />
                    <span className={`text-sm font-medium ${
                      stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-medium">Interventions par mois</h3>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gradient-to-r from-[#003751]/10 to-[#EE2635]/10 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Graphique des interventions</p>
                <p className="text-sm text-gray-500 mt-2">Données en temps réel</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-medium">Performance par technicien</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Karim Messaoudi</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-[#EE2635] h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <span className="text-sm text-gray-600">85%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Sara Boualem</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-[#EE2635] h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                  <span className="text-sm text-gray-600">92%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Omar Belhadj</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-[#EE2635] h-2 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                  <span className="text-sm text-gray-600">78%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-medium">Analyse détaillée</h3>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h4 className="font-medium text-gray-900">Taux de résolution</h4>
              <p className="text-2xl font-bold text-green-600">96.5%</p>
              <p className="text-sm text-gray-500">+2.1% ce mois</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="w-10 h-10 text-blue-600" />
              </div>
              <h4 className="font-medium text-gray-900">Temps moyen</h4>
              <p className="text-2xl font-bold text-blue-600">2.3h</p>
              <p className="text-sm text-gray-500">-0.5h ce mois</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-[#EE2635]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-10 h-10 text-[#EE2635]" />
              </div>
              <h4 className="font-medium text-gray-900">Satisfaction</h4>
              <p className="text-2xl font-bold text-[#EE2635]">4.8/5</p>
              <p className="text-sm text-gray-500">+0.2 ce mois</p>
            </div>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}