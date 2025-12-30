export default function AuditResults({ data }: { data: any }) {
  return (
    <div style={{ marginTop: '30px' }}>
      <h2>📊 Audit Results</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
          <h3>PSI Score</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{data.psi?.score || 'N/A'}%</p>
        </div>
        <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
          <h3>LCP</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{data.psi?.metrics?.lcp || 'N/A'}ms</p>
        </div>
        <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
          <h3>CLS</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{data.psi?.metrics?.cls || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
}
