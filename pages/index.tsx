import { useState } from "react";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchTerm) return;

    setLoading(true);
    setResults([]);

    try {
      const res = await fetch("https://deploy-render-1g9w.onrender.com/api/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: searchTerm })
      });

      const data = await res.json();
      if (data.results) {
        // Optional: sort results by USD price
        const sorted = data.results.sort((a: any, b: any) => a.usd_price - b.usd_price);
        setResults(sorted);
      } else {
        alert("No results found.");
      }
    } catch (err) {
      console.error("❌ Fetch error:", err);
      alert("Error fetching from backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Hermès Price Comparator</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
      >
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search product e.g. Oran sandal"
          style={{ padding: "0.5rem", width: "300px" }}
        />
        <button type="submit" style={{ padding: "0.5rem", marginLeft: "1rem" }}>
          Search
        </button>
      </form>

      {loading && <p>🔄 Searching...</p>}

      <div style={{ marginTop: "2rem" }}>
        {results.map((item: any, i: number) => (
          <div key={i} style={{ marginBottom: "1rem", borderBottom: "1px solid #ccc", paddingBottom: "1rem" }}>
            <h3>{item.name}</h3>
            <p>
              <strong>{item.country}</strong>: {item.local_price} → <strong>${item.usd_price}</strong>
            </p>
            <a href={item.link} target="_blank" rel="noopener noreferrer">
              View on Hermès
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
