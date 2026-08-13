"use client";

import Link from "next/link";
import Image from "next/image";


interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Sidebar({
  isOpen,
  onClose,
  activeTab,
  setActiveTab,
}: SidebarProps) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard" },
    { id: "movies", label: "Films" },
    { id: "users", label: "Utilisateurs" },
  ];
  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* 2. Le conteneur de la Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-100 p-6 flex flex-col
        transform transition-transform duration-300 ease-in-out
        
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        

        lg:translate-x-0 lg:static lg:h-screen flex-shrink-0
      `}>
        
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/admin-rotten_logo.png"
              alt="Rotten Oranges"
              width={140}
              height={44}
              className="object-contain"
              priority
            />
          </Link>
          
          <button onClick={onClose} className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg lg:hidden">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

      <nav className="space-y-1 px-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setActiveTab(item.id);
              onClose();
            }}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              activeTab === item.id
                ? "bg-[#0047AB] text-white"
                : "text-gray-600 hover:bg-gray-100" 
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>
      </aside>
    </>
  );
}