import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

// Pages
import { SplashScreen } from "./pages/SplashScreen";
import { LoginPage } from "./pages/LoginPage";
// Admin Pages
import { ResortFlowDashboard} from "./pages/admin/Dashboard";
import { ActivitiesPage } from "./pages/admin/ActivitiesPage";
import { AnimateursPage } from "./pages/admin/AnimateursPage";
import { ReservationsPage } from "./pages/admin/ReservationsPage";
import { QRCodesPage } from "./pages/admin/QRCodesPage";
import { NotificationsAdminPage } from "./pages/admin/NotificationsAdminPage";
import { SettingsPage } from "./pages/admin/SettingsPage";

// Client Pages (avec ClientLayout intégré)
import { ClientHome } from "./pages/client/ClientHome";
import { ClientActivities } from "./pages/client/ClientActivities";
import { ClientReservations } from "./pages/client/ClientReservations";
import { ClientNotifications } from "./pages/client/ClientNotifications";
import { ClientProfile } from "./pages/client/ClientProfile";

// TV & Leaderboard
// import { TVScreen } from "./pages/TVScreen";
// import { Leaderboard } from "./pages/Leaderboard";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  return (
    <AnimatePresence mode="wait">
      <Routes>
        {/* Route par défaut - redirige vers login */}
        <Route path="/" element={<LoginPage />} />

        {/* Authentification */}
        <Route path="/login" element={<LoginPage />} />

        {/* Routes Admin - PAS de BottomNav ici */}
        <Route path="/admin" element={<ResortFlowDashboard />} />
        <Route path="/admin/dashboard" element={<ResortFlowDashboard />} />
        <Route path="/admin/activites" element={<ActivitiesPage />} />
        <Route path="/admin/animateurs" element={<AnimateursPage />} />
        <Route path="/admin/reservations" element={<ReservationsPage />} />
        <Route path="/admin/qrcodes" element={<QRCodesPage />} />
        <Route path="/admin/notifications" element={<NotificationsAdminPage />} />
        <Route path="/admin/parametres" element={<SettingsPage />} />

        {/* Routes Client - BottomNav est DANS ClientLayout */}
        {/* Routes Client (Mobile) */}
// App.tsx - Routes Client
<Route path="/client" element={<ClientHome />} />

<Route path="/client/home" element={<ClientHome />} />
<Route path="/client/activites" element={<ClientActivities />} />
<Route path="/client/activities" element={<ClientActivities />} />  {/* Ajoutez cette ligne */}
<Route path="/client/reservations" element={<ClientReservations />} />
<Route path="/client/notifications" element={<ClientNotifications />} />
<Route path="/client/profile" element={<ClientProfile />} />
        {/* Routes Publiques - PAS de BottomNav */}
        {/* <Route path="/tv" element={<TVScreen />} />
        <Route path="/leaderboard" element={<Leaderboard />} /> */}
      </Routes>
    </AnimatePresence>
  );
}