import axios from 'axios'; // Add this at the very top
import { useEffect, useState } from "react";

const addToWatchlist = async (coin) => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/watchlist/', {
      coin_id: coin.id,
      coin_name: coin.name
    });
    alert(`${coin.name} added to your database!`);
  } catch (error) {
    console.error("Error saving to Django:", error);
    alert("Check if your Django server is running!");
  }
};
const CryptoDashboard = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  // 1. Fetching Data from CoinGecko API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // We fetch the top 10 coins in USD
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1"
        );
        const data = await response.json();
        setCoins(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching crypto data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 2. Loading State
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-cyan-500"></div>
      </div>
    );
  }
  const filteredCoins = coins.filter((coin) =>
  coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
);

// Now use filteredCoins.map(...) instead of coins.map(...)
  // 3. The UI Table
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
      <div className="mb-6 relative">
  <input
    type="text"
    placeholder="Search by name or symbol..."
    className="w-full bg-slate-900 border border-slate-700 p-3 pl-10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
    onChange={(e) => setSearchTerm(e.target.value)}
  />
  {/* A small search icon inside the bar */}
  <span className="absolute left-3 top-3.5 text-slate-500">🔍</span>
</div>
      <table className="w-full text-left border-collapse">
        <thead className="bg-slate-800/50 text-slate-400 text-sm uppercase">
          <tr>
            <th className="p-5 font-semibold">Coin</th>
            <th className="p-5 font-semibold">Price</th>
            <th className="p-5 font-semibold">24h Change</th>
            <th className="p-5 font-semibold text-right">Market Cap</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {filteredCoins.map((coin) => (
            <tr key={coin.id} className="hover:bg-slate-800/30 transition-colors">
              <td className="p-5 flex items-center gap-2">
                <img src={coin.image} alt={coin.name} className="w-6 h-6 rounded-full" />
                <div>
                  <p className="font-bold text-blue-500">{coin.name}</p>
                  <p className="text-xs text-slate-500 uppercase">{coin.symbol}</p>
                </div>
              </td>
              <td className="p-5 font-mono text-slate-200">
                ${coin.current_price.toLocaleString()}
              </td>
              <td className={`p-5 font-medium ${
                coin.price_change_percentage_24h > 0 ? "text-emerald-400" : "text-rose-400"
              }`}>
                {coin.price_change_percentage_24h?.toFixed(2)}%
              </td>
              <td className="p-5 text-right text-slate-400">
                ${(coin.market_cap / 1000000000).toFixed(2)}B
              </td>
              <td className="p-4">
                <button 
                    onClick={() => addToWatchlist(coin)}
                    className="bg-cyan-600 hover:bg-cyan-500 text-white text-xs px-3 py-1 rounded-lg transition-colors"
                >
                    + Watch
                </button>
                </td>
            </tr>
            
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoDashboard;