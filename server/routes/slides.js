const express = require("express");
const multer = require("multer");
const path = require("path");
const db = require("../config/db");
const { verifyAdmin } = require("../middleware/auth");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, "slide_" + Date.now() + path.extname(file.originalname)),
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowed = /image\/(jpeg|jpg|png|webp|gif)|video\/(mp4|webm|ogg)/;
    cb(null, allowed.test(file.mimetype));
  },
});

// GET toutes les slides (public)
router.get("/", async (req, res) => {
  const [rows] = await db.promise().query(
    "SELECT * FROM hero_slides ORDER BY position ASC, created_at ASC"
  );
  res.json(rows);
});

// POST ajouter une slide (admin)
router.post("/", verifyAdmin, upload.single("file"), async (req, res) => {
  if (!req.file) return res.status(400).json({ message: "Fichier requis" });

  const type = req.file.mimetype.startsWith("video") ? "video" : "image";
  const url = `/uploads/${req.file.filename}`;
  const { title, subtitle } = req.body;

  const [count] = await db.promise().query("SELECT COUNT(*) AS n FROM hero_slides");
  const position = count[0].n;

  await db.promise().query(
    "INSERT INTO hero_slides (type, url, title, subtitle, position) VALUES (?, ?, ?, ?, ?)",
    [type, url, title || null, subtitle || null, position]
  );

  res.status(201).json({ message: "Slide ajoutée" });
});

// DELETE supprimer une slide (admin)
router.delete("/:id", verifyAdmin, async (req, res) => {
  await db.promise().query("DELETE FROM hero_slides WHERE id = ?", [req.params.id]);
  res.json({ message: "Slide supprimée" });
});

module.exports = router;
