import { useState } from "react";
import CryptoDashboard from "./components/CryptoDashboard";
import MyWatchlist from "./components/MyWatchlist";
function App() {
  const [activeView, setActiveView] = useState("dashboard");
  return (
    <div className="flex min-h-screen bg-slate-950 text-white font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 p-6 hidden md:block">
        <h1 className="text-2xl font-bold text-cyan-400 mb-10">CryptoPro</h1>
        <nav className="space-y-4">
       <div 
            onClick={() => setActiveView("dashboard")}
            className={`p-3 rounded-lg cursor-pointer transition ${
              activeView === "dashboard" ? "bg-slate-800 text-cyan-400" : "text-slate-400 hover:text-white"
            }`}
          >
            Dashboard
          </div>
          <div 
            onClick={() => setActiveView("watchlist")}
            className={`p-3 rounded-lg cursor-pointer transition ${
              activeView === "watchlist" ? "bg-slate-800 text-cyan-400" : "text-slate-400 hover:text-white"
            }`}
          >
            Watchlist
          </div>
          <div className="p-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg cursor-pointer transition">
            Portfolio
          </div>
        </nav>
        
      </aside>

      {/* Main Content */}
    
        <main className="flex-1 p-8">
        <header className="mb-10">
          <h2 className="text-3xl font-bold">
            {activeView === "dashboard" ? "Market Overview" : "My Favorites"}
          </h2>
        </header>

        {/* The Table Component */}
        {activeView === "dashboard" && <CryptoDashboard />}
        {activeView === "watchlist" && <MyWatchlist />}
        
      </main>
    </div>
  );
}

export default App;