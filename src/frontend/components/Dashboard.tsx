interface DashboardProps {
  data: any;
}

export default function Dashboard({ data }: DashboardProps) {
  const psi = data?.psi || {};
  const playwright = data?.playwright || {};
  const rum = data?.rum || {};

  return (
    <div className="dashboard">
      <h2>📊 Audit Results for {data.url}</h2>
      
      <div className="metrics-grid">
        {/* PSI Metrics */}
        <div className="metric-card psi">
          <h3>🎯 PSI Score</h3>
          <div className="score">{psi.score ? Math.round(psi.score) : 'N/A'}%</div>
          <div className="details">
            {psi.metrics && (
              <>
                <p>LCP: {Math.round(psi.metrics.lcp || 0)}ms</p>
                <p>FID: {Math.round(psi.metrics.fid || 0)}ms</p>
                <p>CLS: {(psi.metrics.cls || 0).toFixed(2)}</p>
              </>
            )}
          </div>
        </div>

        {/* Playwright Metrics */}
        <div className="metric-card playwright">
          <h3>🎬 Playwright Results</h3>
          {playwright.vitals ? (
            <div className="details">
              <p>LCP: {Math.round(playwright.vitals.lcp || 0)}ms</p>
              <p>FID: {Math.round(playwright.vitals.fid || 0)}ms</p>
              <p>CLS: {(playwright.vitals.cls || 0).toFixed(2)}</p>
            </div>
          ) : (
            <p>No data</p>
          )}
        </div>

        {/* RUM Metrics */}
        <div className="metric-card rum">
          <h3>📈 Real User Metrics</h3>
          {rum ? (
            <div className="details">
              <p>LCP: {Math.round(rum.lcp || 0)}ms</p>
              <p>FID: {Math.round(rum.fid || 0)}ms</p>
              <p>CLS: {(rum.cls || 0).toFixed(2)}</p>
            </div>
          ) : (
            <p>No data</p>
          )}
        </div>
      </div>

      <div className="timestamp">
        ⏱️ Completed at: {new Date(data.completedAt).toLocaleTimeString()}
      </div>
    </div>
  );
}
