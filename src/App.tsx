import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Page from "./pages/landing/Hero";
// import AvatarOnboarding, { NewSession } from "./pages/onbording/AvatarOnboarding";
import AvatarOnboarding from "./pages/onbording/AvatarOnboarding";
import { BlueGradient } from "./components/ui/SVGs";
import SessionTimer from "./pages/session/SessionTimer";
import SessionEnd from "./pages/session/SessionEnd";
import Leaderboard from "./pages/leaderboard/Leaderboard";
import Profile from "./pages/profile/Profile";
import SessionSettings from "./pages/onbording/SessionSettings";

function App() {
  return (
    <Router>
      <div className="h-screen relative bg-white/80 backdrop-blur-xl w-screen overflow-x-hidden overflow-y-scroll invisible-scrollbar">
        {/* Background Gradient */}
        <div className="absolute flex justify-center inset-0 -top-0 -z-10">
          <BlueGradient />
        </div>

        {/* Fixed Header */}
        <header className="sticky top-0 bg-none z-10">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-xl/6 tracking-[-0.04em] font-semibold text-gray-900 text-center">MicroDeadline</h1>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="absolute inset-0 flex items-center justify-center">
          <Routes>
            <Route path="/" element={<Page />} />
            <Route path="/setup" element={<AvatarOnboarding />} />
            {/* <Route path="/session" element={<NewSession />} /> */}
            <Route path="/session-settings" element={<SessionSettings />} />
            <Route path="/session-timer" element={<SessionTimer />} />
            <Route path="/session-end" element={<SessionEnd />} />
            {/* <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/profile" element={<Profile />} /> */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;