// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "./state/AppState.jsx";
import SidebarLayout from "./components/SidebarLayout.jsx";
import Sidebar from "./components/Sidebar.jsx"; // used by AppYasy
import DashboardPage from "./components/DashboardPage.jsx";
import AchievementsPage from "./components/AchievementsPage.jsx";
import SettingsPage from "./components/SettingsPage.jsx";
import GoalFormPage from "./components/GoalFormPage.jsx";
import GoalsPage from "./pages/GoalsPage.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

// 1) Single source of truth for the child routes
const appRoutes = [
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Register /> },
  { path: "/dashboard", element: <DashboardPage /> },
  { path: "/achievements", element: <AchievementsPage /> },
  { path: "/goals", element: <GoalsPage /> },                 // list (GET)
  { path: "/goals/new", element: <GoalFormPage /> },          // create (POST)
  { path: "/goals/:id/edit", element: <GoalFormPage /> },     // edit (PUT)
  { path: "/settings", element: <SettingsPage /> },
];

// 2) Your version (uses SidebarLayout + <Outlet />)
export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<SidebarLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            {appRoutes.map(r => (
              <Route key={r.path} path={r.path} element={r.element} />
            ))}
          </Route>
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

// 3) Teammate's layout preserved as a named export (compiles, not used by default)
export function AppYasy() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-100 flex">
          <Sidebar />
          <div className="flex-1">
            <Routes>
              {/* allow "/" to land on dashboard just like their version */}
              <Route path="/" element={<DashboardPage />} />
              {appRoutes.map(r => (
                <Route key={r.path} path={r.path} element={r.element} />
              ))}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}
