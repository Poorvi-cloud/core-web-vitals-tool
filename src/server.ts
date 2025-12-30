import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running' });
});

app.post('/api/audit', (req, res) => {
  const { url } = req.body;
  res.json({ 
    message: 'Audit endpoint working',
    url: url,
    timestamp: new Date().toISOString()
  });
});

// Serve static files (React frontend)
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));

// SPA fallback
app.use((req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

server.on('error', (err) => {
  console.error('Server error:', err);
  process.exit(1);
});
