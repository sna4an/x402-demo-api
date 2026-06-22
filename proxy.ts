import { paymentProxy } from "@x402/next";
import { x402ResourceServer, HTTPFacilitatorClient } from "@x402/core/server";
import { ExactEvmScheme } from "@x402/evm/exact/server";
import { declareDiscoveryExtension } from "@x402/extensions/bazaar";

const EVM_ADDRESS = process.env.EVM_ADDRESS as `0x${string}`;
const FACILITATOR_URL = process.env.FACILITATOR_URL;

if (!EVM_ADDRESS) throw new Error("EVM_ADDRESS env var required");
if (!FACILITATOR_URL) throw new Error("FACILITATOR_URL env var required");

const NETWORK = "eip155:8453" as const;

const facilitatorClient = new HTTPFacilitatorClient({ url: FACILITATOR_URL });
const server = new x402ResourceServer(facilitatorClient);
server.register(NETWORK, new ExactEvmScheme());

const ext = declareDiscoveryExtension({ bodyType: "json" });

export const proxy = paymentProxy(
  {
    "POST /api/weather": {
      accepts: [{ scheme: "exact" as const, price: "$0.02", network: NETWORK, payTo: EVM_ADDRESS }],
      description: "Get weather data for any city",
      mimeType: "application/json",
      extensions: ext,
    },
    "POST /api/search": {
      accepts: [{ scheme: "exact" as const, price: "$0.05", network: NETWORK, payTo: EVM_ADDRESS }],
      description: "Search the web",
      mimeType: "application/json",
      extensions: ext,
    },
    "POST /api/quote": {
      accepts: [{ scheme: "exact" as const, price: "$0.02", network: NETWORK, payTo: EVM_ADDRESS }],
      description: "Get an inspirational quote",
      mimeType: "application/json",
      extensions: ext,
    },
    "POST /api/crypto-price": {
      accepts: [{ scheme: "exact" as const, price: "$0.02", network: NETWORK, payTo: EVM_ADDRESS }],
      description: "Get real-time crypto prices",
      mimeType: "application/json",
      extensions: ext,
    },
    "POST /api/web-search": {
      accepts: [{ scheme: "exact" as const, price: "$0.05", network: NETWORK, payTo: EVM_ADDRESS }],
      description: "Web search with real results",
      mimeType: "application/json",
      extensions: ext,
    },
    "POST /api/translate": {
      accepts: [{ scheme: "exact" as const, price: "$0.04", network: NETWORK, payTo: EVM_ADDRESS }],
      description: "Translate text between languages",
      mimeType: "application/json",
      extensions: ext,
    },
    "POST /api/url-info": {
      accepts: [{ scheme: "exact" as const, price: "$0.03", network: NETWORK, payTo: EVM_ADDRESS }],
      description: "Get info about a URL",
      mimeType: "application/json",
      extensions: ext,
    },
    "POST /api/aggregator": {
      accepts: [{ scheme: "exact" as const, price: "$0.08", network: NETWORK, payTo: EVM_ADDRESS }],
      description: "Aggregate data from multiple sources (crypto, weather, news)",
      mimeType: "application/json",
      extensions: ext,
    },
    "POST /api/sentiment": {
      accepts: [{ scheme: "exact" as const, price: "$0.05", network: NETWORK, payTo: EVM_ADDRESS }],
      description: "Analyze text sentiment (positive/negative/neutral)",
      mimeType: "application/json",
      extensions: ext,
    },
    "POST /api/trending": {
      accepts: [{ scheme: "exact" as const, price: "$0.04", network: NETWORK, payTo: EVM_ADDRESS }],
      description: "Get trending topics from Reddit, Hacker News, GitHub",
      mimeType: "application/json",
      extensions: ext,
    },
    "POST /api/llm": {
      accepts: [{ scheme: "exact" as const, price: "$0.10", network: NETWORK, payTo: EVM_ADDRESS }],
      description: "AI/LLM gateway powered by Google Gemini",
      mimeType: "application/json",
      extensions: ext,
    },
  },
  server,
);

export const config = { matcher: ["/api/:path*"] };
