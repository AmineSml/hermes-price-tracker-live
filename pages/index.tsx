import { useState } from 'react';

export default function Home() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const searchPrices = async () => {
    setLoading(true);
    setResults([]);
    try {
      const res = await fetch("https://deploy-render-1g9w.onrender.com/api/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query })
      });
      const data = await res.json();
      setResults(data.results);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      <h1>Hermès Global Price Comparator</h1>
      <input
        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
        placeholder="Enter item name or code (e.g., Birkin 25 Epsom)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={searchPrices} disabled={loading || !query}>
        {loading ? "Loading..." : "Search"}
      </button>

      {!loading && results.length > 0 && (
        <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Country</th>
              <th>Local Price</th>
              <th>Price in USD</th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r, i) => (
              <tr key={i}>
                <td>{r.country}</td>
                <td>{r.local_price}</td>
                <td>${r.usd_price.toLocaleString()}</td>
                <td><a href={r.link} target="_blank">View</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
