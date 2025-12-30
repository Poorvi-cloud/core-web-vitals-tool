import express from 'express';
import cors from 'cors';
import { db, initDatabase } from './config/database.ts';
import { auditQueue, addAuditJob, getJobStatus } from './config/queue.ts';
import { initWorkers } from './workers/index.ts';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start audit
app.post('/api/audits', async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    const jobId = await addAuditJob(url);

    res.json({
      message: 'Audit started',
      jobId,
      statusUrl: `/api/audits/${jobId}`,
    });
  } catch (error) {
    console.error('❌ Error starting audit:', error);
    res.status(500).json({ error: 'Failed to start audit' });
  }
});

// Get audit status
app.get('/api/audits/:jobId', async (req, res) => {
  try {
    const { jobId } = req.params;
    const status = await getJobStatus(jobId);

    if (!status) {
      return res.status(404).json({ error: 'Job not found' });
    }

    res.json(status);
  } catch (error) {
    console.error('❌ Error fetching status:', error);
    res.status(500).json({ error: 'Failed to fetch status' });
  }
});

// Initialize and start server
const startServer = async () => {
  try {
    // Initialize database
    await initDatabase();
    console.log('✅ Database initialized');

    // Initialize workers
    await initWorkers();
    console.log('✅ Workers initialized');

    // Start server
    app.listen(PORT, () => {
      console.log(`✅ API Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
