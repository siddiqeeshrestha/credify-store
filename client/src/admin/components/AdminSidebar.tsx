import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { 
  HomeIcon, 
  UsersIcon, 
  ShoppingBagIcon, 
  ClipboardDocumentListIcon,
  TagIcon,
  ChartBarIcon,
  CogIcon,
  GiftIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<React.ComponentProps<'svg'>>;
}

const navigation: NavItem[] = [
  { name: 'Dashboard', href: '/admin', icon: HomeIcon },
  { name: 'Categories', href: '/admin/categories', icon: TagIcon },
  { name: 'Products', href: '/admin/products', icon: ShoppingBagIcon },
  { name: 'Orders', href: '/admin/orders', icon: ClipboardDocumentListIcon },
  { name: 'Coupons', href: '/admin/coupons', icon: GiftIcon },
  { name: 'Users', href: '/admin/users', icon: UsersIcon },
  { name: 'Analytics', href: '/admin/analytics', icon: ChartBarIcon },
  { name: 'Settings', href: '/admin/settings', icon: CogIcon },
];

export const AdminSidebar: React.FC = () => {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '/admin') {
      return location === '/admin' || location === '/admin/';
    }
    return location.startsWith(href);
  };

  const SidebarContent = () => (
    <>
      <div className="flex items-center h-16 px-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-900">Credify Admin</h1>
      </div>
      <nav className="mt-5 px-2 space-y-1">
        {navigation.map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;
          
          return (
            <Link key={item.name} href={item.href}>
              <a 
                className={`
                  group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer
                  ${active 
                    ? 'bg-indigo-100 text-indigo-900' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }
                `}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Icon
                  className={`
                    mr-3 h-5 w-5
                    ${active ? 'text-indigo-500' : 'text-gray-400 group-hover:text-gray-500'}
                  `}
                  aria-hidden="true"
                />
                {item.name}
              </a>
            </Link>
          );
        })}
      </nav>
    </>
  );

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          type="button"
          className="bg-white p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>

      {/* Mobile sidebar overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                type="button"
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="sr-only">Close sidebar</span>
                <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
              </button>
            </div>
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1 bg-white border-r border-gray-200">
            <SidebarContent />
          </div>
        </div>
      </div>
    </>
  );
};