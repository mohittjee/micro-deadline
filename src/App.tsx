import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Page from "./pages/landing/Hero";
import AvatarOnboarding, { NewSession } from "./pages/onbording/AvatarOnboarding";
import { BlueGradient } from "./components/ui/SVGs";
import SessionTimer from "./pages/session/SessionTimer";

function App() {
  return (
    <Router>
      <div className="h-screen bg-white/80 backdrop-blur-xl flex flex-col w-screen overflow-x-hidden">
        <div className="absolute inset-0 -top-32 -z-10">
          <BlueGradient />
        </div>

        {/* Fixed Header */}
        <header className="sticky top-0 bg-none z-10">
          <div className="container mx-auto px-4 py-4">
            <h1 className="text-xl font-semibold text-gray-900 text-center">MicroDeadline</h1>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Page />} />
            <Route path="/setup" element={<AvatarOnboarding />} />
            <Route path="/session" element={<NewSession />} />
            <Route path="/session-timer" element={<SessionTimer />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
