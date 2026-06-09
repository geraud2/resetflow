// src/pages/client/ClientLayout.tsx
import { BottomNav } from "../../components/layout/BottomNav";  // ← Vérifiez le chemin

interface ClientLayoutProps {
  children: React.ReactNode;
}

export function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 pb-20">
      <div className="p-4">
        {children}
      </div>
      <BottomNav />  {/* ← Assurez-vous que cette ligne existe */}
    </div>
  );
}