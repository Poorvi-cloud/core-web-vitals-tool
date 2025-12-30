export const runPlaywrightAudit = async (url: string) => {
  // Mock Playwright data (no browser automation needed)
  return {
    screenshot: null,
    vitals: {
      lcp: 1300 + Math.random() * 900,
      fid: 50 + Math.random() * 50,
      cls: Math.random() * 0.15,
    },
    timestamp: new Date().toISOString(),
  };
};
