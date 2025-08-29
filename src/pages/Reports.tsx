import React, { useState } from 'react';
import { Download, FileText, BarChart3, Calendar, Filter } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';

export function Reports() {
  const [dateFrom, setDateFrom] = useState('2025-01-01');
  const [dateTo, setDateTo] = useState('2025-01-31');
  const [reportType, setReportType] = useState('summary');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    // Simulation de génération
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsGenerating(false);
    
    // En production, déclencher le téléchargement
    alert('Rapport généré avec succès !');
  };

  const reportTypes = [
    { value: 'summary', label: 'Rapport de synthèse' },
    { value: 'interventions', label: 'Détail des interventions' },
    { value: 'performance', label: 'Performance des techniciens' },
    { value: 'client', label: 'Rapport par client' }
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Rapports</h1>
        <p className="text-gray-600">Générez et exportez vos rapports d'activité</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Configuration */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-medium flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Configuration du rapport
              </h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Select
                  label="Type de rapport"
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  options={reportTypes}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Date de début"
                    type="date"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                  />
                  <Input
                    label="Date de fin"
                    type="date"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                  />
                </div>

                <div className="pt-4">
                  <Button
                    onClick={handleGenerateReport}
                    loading={isGenerating}
                    className="w-full sm:w-auto"
                  >
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Générer l'aperçu
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Aperçu */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-medium">Aperçu</h3>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              {isGenerating ? (
                <div>
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#EE2635] mx-auto mb-4"></div>
                  <p className="text-sm text-gray-600">Génération en cours...</p>
                </div>
              ) : (
                <div>
                  <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-sm text-gray-600 mb-4">
                    Sélectionnez vos paramètres et générez l'aperçu
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Aperçu graphique */}
      {!isGenerating && (
        <Card>
          <CardHeader>
            <h3 className="text-lg font-medium">Aperçu graphique</h3>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gradient-to-r from-[#003751]/10 to-[#EE2635]/10 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Graphique d'activité</p>
                <p className="text-sm text-gray-500 mt-2">
                  Les données seront affichées ici après génération
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Actions d'export */}
      <Card>
        <CardContent>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div>
              <h4 className="font-medium text-gray-900">Exporter le rapport</h4>
              <p className="text-sm text-gray-600">Téléchargez votre rapport au format souhaité</p>
            </div>
            <div className="flex space-x-3">
              <Button variant="secondary">
                <Download className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
              <Button variant="ghost">
                <FileText className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}