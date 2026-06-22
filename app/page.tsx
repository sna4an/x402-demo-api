export default function Home() {
  return (
    <main style={{ fontFamily: "system-ui", maxWidth: 600, margin: "80px auto", padding: 20 }}>
      <h1>x402 Demo API</h1>
      <p>Paid API on Base mainnet. All endpoints $0.01.</p>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead><tr style={{ borderBottom: "2px solid #333" }}>
          <th style={{ textAlign: "left", padding: 8 }}>Endpoint</th>
          <th style={{ textAlign: "right", padding: 8 }}>Price</th>
        </tr></thead>
        <tbody>
          <tr style={{ borderBottom: "1px solid #eee" }}><td style={{ padding: 8 }}>POST /api/weather</td><td style={{ padding: 8, textAlign: "right" }}>$0.01</td></tr>
          <tr style={{ borderBottom: "1px solid #eee" }}><td style={{ padding: 8 }}>POST /api/search</td><td style={{ padding: 8, textAlign: "right" }}>$0.01</td></tr>
          <tr style={{ borderBottom: "1px solid #eee" }}><td style={{ padding: 8 }}>POST /api/joke</td><td style={{ padding: 8, textAlign: "right" }}>$0.01</td></tr>
          <tr style={{ borderBottom: "1px solid #eee" }}><td style={{ padding: 8 }}>POST /api/quote</td><td style={{ padding: 8, textAlign: "right" }}>$0.01</td></tr>
        </tbody>
      </table>
    </main>
  );
}