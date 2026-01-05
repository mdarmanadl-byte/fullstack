import axios from "axios";
import { useEffect, useState } from "react";

const MyWatchlist = () => {
  const [favorites, setFavorites] = useState([]);

  // Fetch list
  const fetchWatchlist = () => {
    axios.get("http://127.0.0.1:8000/api/watchlist/")
      .then(res => setFavorites(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchWatchlist();
  }, []);

  // NEW: Delete Function
  const removeCoin = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/watchlist/${id}/`);
      // Update the UI immediately by filtering out the deleted coin
      setFavorites(favorites.filter(coin => coin.id !== id));
    } catch (error) {
      console.error("Error deleting coin:", error);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
      <table className="w-full text-left">
        <thead className="bg-slate-800/50 text-slate-400 text-sm uppercase">
          <tr>
            <th className="p-5">Saved Coin</th>
            <th className="p-5 text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {favorites.map((coin) => (
            <tr key={coin.id} className="hover:bg-slate-800/30">
              <td className="p-5 font-bold text-white uppercase">{coin.coin_name}</td>
              <td className="p-5 text-right">
                <button 
                  onClick={() => removeCoin(coin.id)} // Call delete function
                  className="bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white px-4 py-2 rounded-lg transition-all text-sm font-medium"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {favorites.length === 0 && (
        <div className="p-10 text-center text-slate-500">Your watchlist is empty.</div>
      )}
    </div>
  );
};

export default MyWatchlist;
