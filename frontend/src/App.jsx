import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import SidebarLayout from "./components/SidebarLayout.jsx"
import DashboardPage from "./components/DashboardPage.jsx"
import AchievementsPage from "./pages/AchievementsPage.jsx"
import GoalFormPage from "./components/GoalFormPage.jsx"
import SettingsPage from "./components/SettingsPage.jsx"
import { AppProvider } from "./state/AppState.jsx"

export default function App() {
    return (
        <AppProvider>
            <BrowserRouter>
                <Routes>
                    <Route element={<SidebarLayout />}>
                        <Route path="/dashboard" element={<DashboardPage />} />
                        <Route path="/achievements" element={<AchievementsPage />} />
                        <Route path="/goals/new" element={<GoalFormPage />} />
                        <Route path="/settings" element={<SettingsPage />} />
                    </Route>
                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
            </BrowserRouter>
        </AppProvider>
    )
}
