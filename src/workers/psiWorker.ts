export const runPSIAudit = async (url: string) => {
  // Mock PSI data (no API key needed)
  return {
    metrics: {
      lcp: 1200 + Math.random() * 1000,
      fid: 40 + Math.random() * 60,
      cls: Math.random() * 0.2,
    },
    score: 70 + Math.random() * 30,
  };
};
