import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import SidebarLayout from "./components/SidebarLayout.jsx"
import DashboardPage from "./components/DashboardPage.jsx"
import AchievementsPage from "./components/AchievementsPage.jsx"
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

//Yasy below is your code for this component please work on fitting your work into P's version above
function Yasy (){
    import React from 'react';
    import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
    import Sidebar from './components/Sidebar';
    import Dashboard from './pages/Dashboard';
    import AchievementsPage from './pages/AchievementsPage';
    import GoalsPage from './pages/GoalsPage';

    function App() {
        return (
            <Router>
                <div className="min-h-screen bg-gray-100 flex">
                    <Sidebar />
                    <div className="flex-1">
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/achievements" element={<AchievementsPage />} />
                            <Route path="/goals" element={<GoalsPage />} />
                            <Route path="/settings" element={<div className="p-8"><h1 className="text-3xl font-bold">Settings Page</h1><p>Settings content coming soon...</p></div>} />
                        </Routes>
                    </div>
                </div>
            </Router>
        );
    }

    export default App;
}
