import { paymentProxy } from "@x402/next";
import { x402ResourceServer, HTTPFacilitatorClient } from "@x402/core/server";
import { ExactEvmScheme } from "@x402/evm/exact/server";
const EVM_ADDRESS = process.env.EVM_ADDRESS;
const FACILITATOR_URL = process.env.FACILITATOR_URL;

if (!EVM_ADDRESS || !FACILITATOR_URL) throw new Error("Missing env vars");

const NETWORK = "eip155:8453" as const;
const facilitatorClient = new HTTPFacilitatorClient({ url: FACILITATOR_URL });
const server = new x402ResourceServer(facilitatorClient);
server.register(NETWORK, new ExactEvmScheme());

export const proxy = paymentProxy({
  "POST /api/weather": {
    accepts: [{ scheme: "exact" as const, price: "$0.01", network: NETWORK, payTo: EVM_ADDRESS }],
    description: "Weather data", mimeType: "application/json",
  },
  "POST /api/search": {
    accepts: [{ scheme: "exact" as const, price: "$0.01", network: NETWORK, payTo: EVM_ADDRESS }],
    description: "Web search", mimeType: "application/json",
  },
  "POST /api/joke": {
    accepts: [{ scheme: "exact" as const, price: "$0.01", network: NETWORK, payTo: EVM_ADDRESS }],
    description: "Random joke", mimeType: "application/json",
  },
  "POST /api/quote": {
    accepts: [{ scheme: "exact" as const, price: "$0.01", network: NETWORK, payTo: EVM_ADDRESS }],
    description: "Inspirational quote", mimeType: "application/json",
  },
}, server);

export const config = { matcher: ["/api/:path*"] };
