const express = require("express");
const router = express.Router();

const UPU_BASE = "https://upu.api.post/ips-web-tracking/v1/items";

// GET /api/tracking/:id
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (!process.env.UPU_API_KEY) {
    return res.status(503).json({ message: "Clé API UPU non configurée" });
  }

  try {
    const response = await fetch(`${UPU_BASE}/${encodeURIComponent(id)}`, {
      headers: {
        Authorization: `Bearer ${process.env.UPU_API_KEY}`,
        Accept: "application/json",
      },
    });

    if (response.status === 404) {
      return res.status(404).json({ message: "Numéro de suivi introuvable" });
    }

    if (!response.ok) {
      return res.status(response.status).json({ message: "Erreur API UPU" });
    }

    const data = await response.json();
    res.json(data);
  } catch {
    res.status(500).json({ message: "Impossible de contacter le service de suivi" });
  }
});

module.exports = router;
