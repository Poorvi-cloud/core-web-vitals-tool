import { Worker } from 'bullmq';
import Redis from 'ioredis';
import { runPSIAudit } from './psiWorker.ts';
import { runPlaywrightAudit } from './playwrightWorker.ts';
import { runRUMAudit } from './rumWorker.ts';

const redis = new Redis({
  host: 'localhost',
  port: 6379,
  maxRetriesPerRequest: null,
});

export const initWorkers = async () => {
  const worker = new Worker('web-vitals-audit', async (job) => {
    const { url } = job.data;
    console.log(`🔄 Processing audit for: ${url}`);

    try {
      const [psiResult, playwrightResult, rumResult] = await Promise.all([
        runPSIAudit(url),
        runPlaywrightAudit(url),
        runRUMAudit(url),
      ]);

      console.log(`✅ Audit completed for: ${url}`);

      return {
        url,
        psi: psiResult,
        playwright: playwrightResult,
        rum: rumResult,
        completedAt: new Date().toISOString(),
      };
    } catch (error) {
      console.error(`❌ Audit failed for ${url}:`, error);
      throw error;
    }
  }, { connection: redis });

  worker.on('completed', (job) => {
    console.log(`✅ Job ${job.id} completed`);
  });

  worker.on('failed', (job, err) => {
    console.error(`❌ Job ${job?.id} failed:`, err);
  });

  console.log('✅ Workers initialized');
};
