export default async function handler(req, res) {
  const data = req.body.uplink_message?.decoded_payload;

  if (!data) {
    return res.status(400).send("Missing payload");
  }

  // Channel 1: A, B, C, D, E, F, G
  const ch1 = new URLSearchParams({
    api_key: "634EO17BBSG1LMWB",
    field1: data.A,
    field2: data.B,
    field3: data.C,
    field4: data.D,
    field5: data.E,
    field6: data.F,
    field7: data.G,
  });

  // Channel 2: H, I, J, K, L, M
  const ch2 = new URLSearchParams({
    api_key: "9UKZC78LEBCDM961",
    field1: data.H,
    field2: data.I,
    field3: data.J,
    field4: data.K,
    field5: data.L,
    field6: data.M,
  });

  try {
    await Promise.all([
      fetch("https://api.thingspeak.com/update?" + ch1),
      fetch("https://api.thingspeak.com/update?" + ch2),
    ]);

    res.status(200).send("Data forwarded to ThingSpeak");
  } catch (e) {
    console.error("ThingSpeak forwarding failed:", e);
    res.status(500).send("Forwarding failed");
  }
}
