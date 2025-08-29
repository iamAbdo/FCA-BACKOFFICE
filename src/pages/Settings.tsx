import React, { useState } from 'react';
import { Save, User, Bell, Shield, Database, Mail } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';

export function Settings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);

  const tabs = [
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Sécurité', icon: Shield },
    { id: 'system', label: 'Système', icon: Database }
  ];

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    alert('Paramètres sauvegardés avec succès !');
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Paramètres</h1>
        <p className="text-gray-600">Configurez votre application GMAO</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-0">
              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-none first:rounded-t-lg last:rounded-b-lg transition-colors ${
                        activeTab === tab.id
                          ? 'bg-[#EE2635] text-white'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-5 h-5 mr-3" />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-medium">
                {tabs.find(t => t.id === activeTab)?.label}
              </h3>
            </CardHeader>
            <CardContent>
              {activeTab === 'profile' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input label="Nom" defaultValue="Ahmed Benali" />
                    <Input label="Email" type="email" defaultValue="admin@future-clim.dz" />
                  </div>
                  <Input label="Téléphone" defaultValue="+213 555 123 456" />
                  <Select
                    label="Rôle"
                    value="admin"
                    options={[
                      { value: 'admin', label: 'Administrateur' },
                      { value: 'maintenance_manager', label: 'Chef de maintenance' },
                      { value: 'project_manager', label: 'Responsable projet' }
                    ]}
                    onChange={() => {}}
                  />
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Notifications par email</h4>
                    <div className="space-y-3">
                      <label className="flex items-center space-x-3">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span className="text-sm text-gray-700">Nouvelles interventions urgentes</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span className="text-sm text-gray-700">Interventions en retard</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm text-gray-700">Rapports hebdomadaires</span>
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Notifications push</h4>
                    <div className="space-y-3">
                      <label className="flex items-center space-x-3">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span className="text-sm text-gray-700">Assignations d'interventions</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm text-gray-700">Mises à jour de statut</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="space-y-4">
                  <Input label="Mot de passe actuel" type="password" />
                  <Input label="Nouveau mot de passe" type="password" />
                  <Input label="Confirmer le mot de passe" type="password" />
                  
                  <div className="border-t pt-4">
                    <h4 className="font-medium text-gray-900 mb-3">Sessions actives</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="text-sm font-medium">Session actuelle</p>
                          <p className="text-xs text-gray-500">Chrome sur Windows • Alger, Algérie</p>
                        </div>
                        <span className="text-xs text-green-600 font-medium">Actif</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'system' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Configuration générale</h4>
                    <div className="space-y-4">
                      <Select
                        label="Fuseau horaire"
                        value="Africa/Algiers"
                        options={[
                          { value: 'Africa/Algiers', label: 'Alger (GMT+1)' },
                          { value: 'Europe/Paris', label: 'Paris (GMT+1)' },
                          { value: 'UTC', label: 'UTC (GMT+0)' }
                        ]}
                        onChange={() => {}}
                      />
                      <Select
                        label="Langue"
                        value="fr"
                        options={[
                          { value: 'fr', label: 'Français' },
                          { value: 'ar', label: 'العربية' },
                          { value: 'en', label: 'English' }
                        ]}
                        onChange={() => {}}
                      />
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Sauvegarde</h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">Dernière sauvegarde</p>
                          <p className="text-xs text-gray-500">15/01/2025 à 03:00</p>
                        </div>
                        <Button variant="secondary" size="sm">
                          <Database className="w-4 h-4 mr-2" />
                          Sauvegarder maintenant
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-end pt-6 border-t">
                <Button onClick={handleSave} loading={isSaving}>
                  <Save className="w-4 h-4 mr-2" />
                  Sauvegarder les modifications
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}