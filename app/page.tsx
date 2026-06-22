export default function Home() {
  return (
    <main style={{ fontFamily: "system-ui", maxWidth: 600, margin: "80px auto", padding: 20 }}>
      <h1>x402 Demo API</h1>
      <p>Paid API endpoints using x402 protocol on Base mainnet.</p>
      <h2>Endpoints</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid #333" }}>
            <th style={{ textAlign: "left", padding: 8 }}>Path</th>
            <th style={{ textAlign: "left", padding: 8 }}>Price</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: "1px solid #eee" }}>
            <td style={{ padding: 8 }}><code>POST /api/weather</code></td>
            <td style={{ padding: 8 }}>$0.05</td>
          </tr>
          <tr style={{ borderBottom: "1px solid #eee" }}>
            <td style={{ padding: 8 }}><code>POST /api/search</code></td>
            <td style={{ padding: 8 }}>$0.10</td>
          </tr>
          <tr style={{ borderBottom: "1px solid #eee" }}>
            <td style={{ padding: 8 }}><code>POST /api/quote</code></td>
            <td style={{ padding: 8 }}>$0.08</td>
          </tr>
        </tbody>
      </table>
    </main>
  );
}