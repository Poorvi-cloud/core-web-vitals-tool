export const runRUMAudit = async (url: string) => {
  // Mock RUM data (no real user monitoring needed)
  return {
    lcp: 1250 + Math.random() * 950,
    fid: 45 + Math.random() * 55,
    cls: Math.random() * 0.18,
    ttfb: 100 + Math.random() * 400,
  };
};
