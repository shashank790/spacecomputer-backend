import crypto from "crypto";
import { OrbitportSDK } from "@spacecomputer-io/orbitport-sdk-ts";

/**
 * Verifies a signature using a public key.
 * Returns true or false.
 */
export function verifySignature(publicKey: string, data: string, signature: string): boolean {
  try {
    const verify = crypto.createVerify("SHA256");
    verify.update(data);
    verify.end();
    return verify.verify(publicKey, signature, "base64");
  } catch (err) {
    console.error("❌ Error verifying signature:", err);
    return false;
  }
}

const orbitport = new OrbitportSDK({
  config: {
    clientId: "1Lh24kCYv2hxXbDWvI7aZgdduLeMn8GG",
    clientSecret: "5CZ0AfjpvD6BnLClwydfmxIV1_gB7mmNBuU69kCj1rOK47IZVRB_WWAlSa-SeZQM",
  },
});

/**
 * Fetches cosmic randomness from SpaceComputer
 */
export async function getTrueRandom(): Promise<string> {
  try {
    const response = await orbitport.ctrng.random();
    const value = response.data.data;
    console.log("🌌 Cosmic randomness:", value);
    return value;
  } catch (err) {
    console.error("❌ Failed to fetch cosmic randomness:", err);
    throw err;
  }
}