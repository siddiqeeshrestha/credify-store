import React, { useState } from 'react';
import { 
  CogIcon, 
  BellIcon, 
  ShieldCheckIcon, 
  CurrencyDollarIcon,
  GlobeAltIcon,
  EnvelopeIcon,
  KeyIcon,
  CircleStackIcon
} from '@heroicons/react/24/outline';

interface SettingsSection {
  id: string;
  title: string;
  icon: React.ComponentType<React.ComponentProps<'svg'>>;
  description: string;
}

export const AdminSettingsPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState('general');
  
  // General Settings
  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'Credify Store',
    siteDescription: 'Your trusted digital marketplace for gift cards and vouchers',
    siteUrl: 'https://credifystore.com',
    adminEmail: 'admin@credifystore.com',
    supportEmail: 'support@credifystore.com',
    timezone: 'UTC',
    language: 'en',
    currency: 'USD'
  });

  // Notification Settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    orderNotifications: true,
    lowStockAlerts: true,
    newUserAlerts: true,
    systemAlerts: true,
    dailyReports: false,
    weeklyReports: true,
    monthlyReports: true
  });

  // Security Settings
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: '24',
    passwordMinLength: '8',
    requireSpecialChars: true,
    maxLoginAttempts: '5',
    ipWhitelist: '',
    apiRateLimit: '1000'
  });

  // Payment Settings
  const [paymentSettings, setPaymentSettings] = useState({
    stripeEnabled: true,
    paypalEnabled: true,
    processingFee: '2.9',
    minimumOrder: '5.00',
    maximumOrder: '1000.00',
    refundPolicy: '30',
    autoRefund: false
  });

  // Email Settings
  const [emailSettings, setEmailSettings] = useState({
    smtpHost: 'smtp.gmail.com',
    smtpPort: '587',
    smtpUsername: '',
    smtpPassword: '',
    smtpEncryption: 'tls',
    fromEmail: 'noreply@credifystore.com',
    fromName: 'Credify Store'
  });

  const sections: SettingsSection[] = [
    {
      id: 'general',
      title: 'General Settings',
      icon: CogIcon,
      description: 'Basic site configuration and information'
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: BellIcon,
      description: 'Configure alerts and notification preferences'
    },
    {
      id: 'security',
      title: 'Security',
      icon: ShieldCheckIcon,
      description: 'Security and authentication settings'
    },
    {
      id: 'payments',
      title: 'Payment Settings',
      icon: CurrencyDollarIcon,
      description: 'Payment processing and financial configuration'
    },
    {
      id: 'email',
      title: 'Email Configuration',
      icon: EnvelopeIcon,
      description: 'SMTP and email delivery settings'
    },
    {
      id: 'system',
      title: 'System',
      icon: CircleStackIcon,
      description: 'System maintenance and database settings'
    }
  ];

  const handleSaveSettings = (sectionId: string) => {
    // In a real app, this would save to the backend
    alert(`${sections.find(s => s.id === sectionId)?.title} settings saved successfully!`);
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Site Name
          </label>
          <input
            type="text"
            value={generalSettings.siteName}
            onChange={(e) => setGeneralSettings({...generalSettings, siteName: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Admin Email
          </label>
          <input
            type="email"
            value={generalSettings.adminEmail}
            onChange={(e) => setGeneralSettings({...generalSettings, adminEmail: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Site Description
        </label>
        <textarea
          rows={3}
          value={generalSettings.siteDescription}
          onChange={(e) => setGeneralSettings({...generalSettings, siteDescription: e.target.value})}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Timezone
          </label>
          <select
            value={generalSettings.timezone}
            onChange={(e) => setGeneralSettings({...generalSettings, timezone: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="UTC">UTC</option>
            <option value="America/New_York">Eastern Time</option>
            <option value="America/Los_Angeles">Pacific Time</option>
            <option value="Europe/London">London</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Language
          </label>
          <select
            value={generalSettings.language}
            onChange={(e) => setGeneralSettings({...generalSettings, language: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Currency
          </label>
          <select
            value={generalSettings.currency}
            onChange={(e) => setGeneralSettings({...generalSettings, currency: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
            <option value="JPY">JPY (¥)</option>
          </select>
        </div>
      </div>

      <div className="pt-4">
        <button
          onClick={() => handleSaveSettings('general')}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Save General Settings
        </button>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-4">Email Notifications</h4>
        <div className="space-y-4">
          {Object.entries(notificationSettings).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </label>
                <p className="text-sm text-gray-500">
                  {key === 'emailNotifications' && 'Receive email notifications for important events'}
                  {key === 'orderNotifications' && 'Get notified when new orders are placed'}
                  {key === 'lowStockAlerts' && 'Alerts when product inventory is running low'}
                  {key === 'newUserAlerts' && 'Notifications for new user registrations'}
                  {key === 'systemAlerts' && 'Critical system and security alerts'}
                  {key === 'dailyReports' && 'Daily summary reports via email'}
                  {key === 'weeklyReports' && 'Weekly business performance reports'}
                  {key === 'monthlyReports' && 'Monthly analytics and insights'}
                </p>
              </div>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => setNotificationSettings({
                    ...notificationSettings,
                    [key]: e.target.checked
                  })}
                  className="sr-only"
                />
                <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  value ? 'bg-indigo-600' : 'bg-gray-200'
                }`}>
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    value ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </div>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4">
        <button
          onClick={() => handleSaveSettings('notifications')}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Save Notification Settings
        </button>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Session Timeout (hours)
          </label>
          <input
            type="number"
            value={securitySettings.sessionTimeout}
            onChange={(e) => setSecuritySettings({...securitySettings, sessionTimeout: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password Min Length
          </label>
          <input
            type="number"
            value={securitySettings.passwordMinLength}
            onChange={(e) => setSecuritySettings({...securitySettings, passwordMinLength: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          IP Whitelist (comma-separated)
        </label>
        <textarea
          rows={3}
          value={securitySettings.ipWhitelist}
          onChange={(e) => setSecuritySettings({...securitySettings, ipWhitelist: e.target.value})}
          placeholder="192.168.1.1, 10.0.0.1"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Two-Factor Authentication
            </label>
            <p className="text-sm text-gray-500">
              Require 2FA for admin login
            </p>
          </div>
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={securitySettings.twoFactorAuth}
              onChange={(e) => setSecuritySettings({
                ...securitySettings,
                twoFactorAuth: e.target.checked
              })}
              className="sr-only"
            />
            <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              securitySettings.twoFactorAuth ? 'bg-indigo-600' : 'bg-gray-200'
            }`}>
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                securitySettings.twoFactorAuth ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </div>
          </label>
        </div>
      </div>

      <div className="pt-4">
        <button
          onClick={() => handleSaveSettings('security')}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Save Security Settings
        </button>
      </div>
    </div>
  );

  const renderPaymentSettings = () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-4">Payment Methods</h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">Stripe</label>
              <p className="text-sm text-gray-500">Accept credit and debit cards</p>
            </div>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={paymentSettings.stripeEnabled}
                onChange={(e) => setPaymentSettings({
                  ...paymentSettings,
                  stripeEnabled: e.target.checked
                })}
                className="sr-only"
              />
              <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                paymentSettings.stripeEnabled ? 'bg-indigo-600' : 'bg-gray-200'
              }`}>
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  paymentSettings.stripeEnabled ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">PayPal</label>
              <p className="text-sm text-gray-500">Accept PayPal payments</p>
            </div>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={paymentSettings.paypalEnabled}
                onChange={(e) => setPaymentSettings({
                  ...paymentSettings,
                  paypalEnabled: e.target.checked
                })}
                className="sr-only"
              />
              <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                paymentSettings.paypalEnabled ? 'bg-indigo-600' : 'bg-gray-200'
              }`}>
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  paymentSettings.paypalEnabled ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </div>
            </label>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Processing Fee (%)
          </label>
          <input
            type="number"
            step="0.1"
            value={paymentSettings.processingFee}
            onChange={(e) => setPaymentSettings({...paymentSettings, processingFee: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Minimum Order ($)
          </label>
          <input
            type="number"
            step="0.01"
            value={paymentSettings.minimumOrder}
            onChange={(e) => setPaymentSettings({...paymentSettings, minimumOrder: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Maximum Order ($)
          </label>
          <input
            type="number"
            step="0.01"
            value={paymentSettings.maximumOrder}
            onChange={(e) => setPaymentSettings({...paymentSettings, maximumOrder: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="pt-4">
        <button
          onClick={() => handleSaveSettings('payments')}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Save Payment Settings
        </button>
      </div>
    </div>
  );

  const renderEmailSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            SMTP Host
          </label>
          <input
            type="text"
            value={emailSettings.smtpHost}
            onChange={(e) => setEmailSettings({...emailSettings, smtpHost: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            SMTP Port
          </label>
          <input
            type="text"
            value={emailSettings.smtpPort}
            onChange={(e) => setEmailSettings({...emailSettings, smtpPort: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            From Email
          </label>
          <input
            type="email"
            value={emailSettings.fromEmail}
            onChange={(e) => setEmailSettings({...emailSettings, fromEmail: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            From Name
          </label>
          <input
            type="text"
            value={emailSettings.fromName}
            onChange={(e) => setEmailSettings({...emailSettings, fromName: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="pt-4">
        <button
          onClick={() => handleSaveSettings('email')}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Save Email Settings
        </button>
      </div>
    </div>
  );

  const renderSystemSettings = () => (
    <div className="space-y-6">
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <CircleStackIcon className="h-5 w-5 text-yellow-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">
              System Maintenance
            </h3>
            <p className="mt-1 text-sm text-yellow-700">
              These operations can affect system performance. Use with caution.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-left">
          <div className="text-sm font-medium text-gray-900">Clear Cache</div>
          <div className="text-sm text-gray-500 mt-1">Clear application cache</div>
        </button>

        <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-left">
          <div className="text-sm font-medium text-gray-900">Optimize Database</div>
          <div className="text-sm text-gray-500 mt-1">Optimize database tables</div>
        </button>

        <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-left">
          <div className="text-sm font-medium text-gray-900">Export Data</div>
          <div className="text-sm text-gray-500 mt-1">Export system data</div>
        </button>

        <button className="p-4 border border-red-300 rounded-lg hover:bg-red-50 text-left">
          <div className="text-sm font-medium text-red-900">Clear Logs</div>
          <div className="text-sm text-red-500 mt-1">Delete system logs</div>
        </button>

        <button className="p-4 border border-red-300 rounded-lg hover:bg-red-50 text-left">
          <div className="text-sm font-medium text-red-900">Reset Settings</div>
          <div className="text-sm text-red-500 mt-1">Reset to defaults</div>
        </button>

        <button className="p-4 border border-red-300 rounded-lg hover:bg-red-50 text-left">
          <div className="text-sm font-medium text-red-900">System Backup</div>
          <div className="text-sm text-red-500 mt-1">Create full backup</div>
        </button>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="text-sm font-medium text-gray-900 mb-2">System Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
          <div>
            <span className="font-medium">Version:</span> 1.0.0
          </div>
          <div>
            <span className="font-medium">Database:</span> PostgreSQL 13
          </div>
          <div>
            <span className="font-medium">Server:</span> Node.js 18.x
          </div>
          <div>
            <span className="font-medium">Last Backup:</span> 2024-01-15 14:30
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'general':
        return renderGeneralSettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'security':
        return renderSecuritySettings();
      case 'payments':
        return renderPaymentSettings();
      case 'email':
        return renderEmailSettings();
      case 'system':
        return renderSystemSettings();
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Settings</h1>
        <p className="mt-2 text-sm text-gray-600">
          Configure system settings and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <nav className="space-y-1">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeSection === section.id
                      ? 'bg-indigo-100 text-indigo-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className={`mr-3 h-5 w-5 ${
                    activeSection === section.id ? 'text-indigo-500' : 'text-gray-400'
                  }`} />
                  {section.title}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
            <div className="mb-6">
              <h2 className="text-lg font-medium text-gray-900">
                {sections.find(s => s.id === activeSection)?.title}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {sections.find(s => s.id === activeSection)?.description}
              </p>
            </div>
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};