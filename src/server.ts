import express from "express";
import { verifySignature } from "./services/cryptoService.js";
import randomRoutes from "./routes/random.js";

const app = express();
app.use(express.json());

/**
 * POST /verify-signal
 * Verifies a signed beacon payload using stored public keys
 */
app.post("/verify-signal", async (req, res) => {
  try {
    const { publicKey, data, signature } = req.body;

    if (!publicKey || !data || !signature) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const isValid = verifySignature(publicKey, data, signature);
    res.json({ verified: isValid });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * GET /verify-signal
 * Provides an example curl command for testing the POST endpoint
 */
app.get("/verify-signal", (req, res) => {
  const exampleCurl = `To test this endpoint, open a terminal and run:

curl -X POST http://localhost:3000/verify-signal \
  -H "Content-Type: application/json" \
  -d '{
    "publicKey": "abc123",
    "data": "hello world",
    "signature": "valid"
  }'

Replace 'localhost:3000' with other hosted address if it's running elsewhere.
i.e 

curl -X POST https://spacecomputer-backend.onrender.com/verify-signal \
  -H "Content-Type: application/json" \
  -d '{
    "publicKey": "abc123",
    "data": "hello world",
    "signature": "valid"
  }'

`;
  res.type("text").send(exampleCurl);
});

app.use("/random", randomRoutes);
/**
 * GET /random/cosmic → SpaceComputer cosmic entropy
 * GET /random/local - local cryptographic random bytes
 * Returns a cryptographically secure random number
 */

app.get("/", (req, res) => {
  res.send("🚀 SpaceComputer Backend Active — Endpoints: /verify-signal, /random/cosmic (Orbitport cosmic entropy), /random/local (crypto fallback)");
});
/**
 * Start the server
 */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
