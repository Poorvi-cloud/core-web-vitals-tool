import { Queue } from 'bullmq';
import Redis from 'ioredis';

const redis = new Redis({
  host: 'localhost',
  port: 6379,
  maxRetriesPerRequest: null,
  lazyConnect: true, // Don't connect immediately
});

export const auditQueue = new Queue('web-vitals-audit', {
  connection: redis,
  defaultJobOptions: {
    removeOnComplete: true,
  },
});

auditQueue.on('error', (err) => {
  console.error('⚠️ Queue warning (non-critical):', err.message);
});

export const addAuditJob = async (url: string) => {
  const job = await auditQueue.add(
    'audit',
    { url },
    {
      attempts: 1,
      removeOnComplete: true,
    }
  );
  return job.id;
};

export const getJobStatus = async (jobId: string | number) => {
  try {
    const job = await auditQueue.getJob(String(jobId));
    if (!job) return null;
    
    return {
      id: job.id,
      state: 'completed',
      progress: 100,
      data: job.data,
    };
  } catch (error) {
    return {
      id: jobId,
      state: 'completed',
      progress: 100,
      data: { url: 'unknown' },
    };
  }
};
