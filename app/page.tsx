export default function Home() {
  const endpoints = [
    { path: "POST /api/weather", price: "$0.02", desc: "Weather data" },
    { path: "POST /api/search", price: "$0.05", desc: "Web search" },
    { path: "POST /api/quote", price: "$0.02", desc: "Inspirational quote" },
    { path: "POST /api/crypto-price", price: "$0.02", desc: "Real-time crypto prices" },
    { path: "POST /api/web-search", price: "$0.05", desc: "Web search with real results" },
    { path: "POST /api/translate", price: "$0.04", desc: "Translate text" },
    { path: "POST /api/url-info", price: "$0.03", desc: "URL info lookup" },
  ];

  return (
    <main style={{ fontFamily: "system-ui", maxWidth: 700, margin: "80px auto", padding: 20 }}>
      <h1>x402 Demo API</h1>
      <p>Paid API endpoints using x402 protocol on Base mainnet.</p>
      <h2>Endpoints</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid #333" }}>
            <th style={{ textAlign: "left", padding: 8 }}>Path</th>
            <th style={{ textAlign: "left", padding: 8 }}>Description</th>
            <th style={{ textAlign: "right", padding: 8 }}>Price</th>
          </tr>
        </thead>
        <tbody>
          {endpoints.map((ep) => (
            <tr key={ep.path} style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: 8 }}><code>{ep.path}</code></td>
              <td style={{ padding: 8 }}>{ep.desc}</td>
              <td style={{ padding: 8, textAlign: "right" }}>{ep.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}