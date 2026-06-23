const express = require("express");
const multer = require("multer");
const path = require("path");
const db = require("../config/db");
const { verifyAdmin } = require("../middleware/auth");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// GET tous les articles (public)
router.get("/", async (req, res) => {
  const { category } = req.query;
  const query = category
    ? "SELECT a.*, u.name AS author FROM articles a LEFT JOIN users u ON a.author_id = u.id WHERE a.category = ? ORDER BY a.created_at DESC"
    : "SELECT a.*, u.name AS author FROM articles a LEFT JOIN users u ON a.author_id = u.id ORDER BY a.created_at DESC";

  const [rows] = await db.promise().query(query, category ? [category] : []);
  res.json(rows);
});

// GET un article par id (public)
router.get("/:id", async (req, res) => {
  const [rows] = await db.promise().query(
    "SELECT a.*, u.name AS author FROM articles a LEFT JOIN users u ON a.author_id = u.id WHERE a.id = ?",
    [req.params.id]
  );
  if (rows.length === 0) return res.status(404).json({ message: "Introuvable" });
  res.json(rows[0]);
});

// POST créer un article (admin)
router.post("/", verifyAdmin, upload.single("image"), async (req, res) => {
  const { title, content, category } = req.body;

  if (!title || !content)
    return res.status(400).json({ message: "Titre et contenu requis" });

  const image = req.file ? `/uploads/${req.file.filename}` : null;

  await db.promise().query(
    "INSERT INTO articles (title, content, image, category, author_id) VALUES (?, ?, ?, ?, ?)",
    [title, content, image, category || "actualite", req.user.id]
  );

  res.status(201).json({ message: "Article publié" });
});

// PUT modifier un article (admin)
router.put("/:id", verifyAdmin, upload.single("image"), async (req, res) => {
  const { title, content, category } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  const fields = [];
  const values = [];

  if (title) { fields.push("title = ?"); values.push(title); }
  if (content) { fields.push("content = ?"); values.push(content); }
  if (category) { fields.push("category = ?"); values.push(category); }
  if (image) { fields.push("image = ?"); values.push(image); }

  if (fields.length === 0)
    return res.status(400).json({ message: "Rien à modifier" });

  values.push(req.params.id);
  await db.promise().query(
    `UPDATE articles SET ${fields.join(", ")} WHERE id = ?`,
    values
  );

  res.json({ message: "Article mis à jour" });
});

// DELETE supprimer un article (admin)
router.delete("/:id", verifyAdmin, async (req, res) => {
  await db.promise().query("DELETE FROM articles WHERE id = ?", [req.params.id]);
  res.json({ message: "Article supprimé" });
});

module.exports = router;
