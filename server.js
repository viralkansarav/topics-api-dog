import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { fsync } from 'fs';

const app = express();
app.use(cors());
app.use(express.json());

// 1️⃣ Path helpers
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicPath = path.join(__dirname, 'public');

app.use(express.static(publicPath));

// 4️⃣ Track endpoint
app.post('/collect', (req, res) => {
  const topicsHeader = req.get('Sec-Browsing-Topics') || null;
  console.log('📥  Data received:\n', JSON.stringify({
    ...req.body,
    topics_header: topicsHeader
  }, null, 2));
  res.setHeader('Sec-Browsing-Topics', topicsHeader || '');
  res.sendStatus(204);

});
app.get("/script", (req, res) => {
    const scriptPath = path.join(publicPath, 'script.js');
    res.sendFile(scriptPath);
});
// 5️⃣ Start
const PORT = process.env.PORT || 3085;
app.listen(PORT, () => {
  console.log(`🟢  Topics playground running at http://localhost:${PORT}`);
});
