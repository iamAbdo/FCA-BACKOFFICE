import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  Home, 
  Wrench, 
  FileText, 
  Users, 
  BarChart3, 
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const navigation = [
  { name: 'Tableau de bord', href: '/dashboard', icon: Home },
  { name: 'Interventions', href: '/interventions', icon: Wrench },
  { name: 'Rapports', href: '/reports', icon: FileText },
  { name: 'Techniciens', href: '/technicians', icon: Users },
  { name: 'Statistiques', href: '/analytics', icon: BarChart3 },
  { name: 'Paramètres', href: '/settings', icon: Settings },
];

export function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const location = useLocation();

  return (
    <div className={`bg-[#003751] text-white transition-all duration-300 flex flex-col h-full ${isCollapsed ? 'w-16' : 'w-64'}`}>
      {/* Header */}
      <div className="p-4 border-b border-[#004d6b]">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-16 bg-white rounded-lg flex items-center justify-center">
                <img src="/FCA.png" alt="Future Clim logo" className="w-full h-full object-cover" />
              </div>
              <span className="font-semibold text-lg">Future Clim</span>
            </div>
          )}
          <button
            onClick={onToggle}
            className="p-1 rounded hover:bg-[#004d6b] transition-colors"
          >
            {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2">
        <ul className="space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            const Icon = item.icon;
            
            return (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive 
                      ? 'bg-[#EE2635] text-white' 
                      : 'text-gray-300 hover:text-white hover:bg-[#004d6b]'
                  }`}
                  title={isCollapsed ? item.name : undefined}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!isCollapsed && <span className="ml-3">{item.name}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Info */}
      {!isCollapsed && (
        <div className="p-4 border-t border-[#004d6b]">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">AB</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">Ahmed Benali</p>
              <p className="text-xs text-gray-400 truncate">Administrateur</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}