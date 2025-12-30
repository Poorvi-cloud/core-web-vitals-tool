import { useState } from 'react';
import AuditForm from './components/AuditForm.tsx';
import Dashboard from './components/Dashboard.tsx';
import './styles/App.css';

export default function App() {
  const [jobId, setJobId] = useState<string | null>(null);
  const [auditData, setAuditData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleAuditStart = async (url: string) => {
    setLoading(true);
    try {
      // Step 1: Call backend to start audit
      const response = await fetch('http://localhost:3001/api/audits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();
      console.log('✅ Audit started:', data);
      
      setJobId(data.jobId);

      // Step 2: Poll for results every 2 seconds
      const pollInterval = setInterval(async () => {
        try {
          const statusResponse = await fetch(
            `http://localhost:3001/api/audits/${data.jobId}`
          );
          const statusData = await statusResponse.json();
          console.log('📊 Status:', statusData);

          if (statusData.state === 'completed') {
            setAuditData(statusData.data);
            setLoading(false);
            clearInterval(pollInterval);
          }
        } catch (error) {
          console.error('Error polling:', error);
        }
      }, 2000);

      // Stop polling after 30 seconds
      setTimeout(() => clearInterval(pollInterval), 30000);
    } catch (error) {
      console.error('Error starting audit:', error);
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>🔍 Core Web Vitals Audit Tool</h1>
        <p>Test your website's performance metrics (LCP, FID, CLS)</p>
      </header>

      <main>
        <AuditForm onSubmit={handleAuditStart} loading={loading} />
        
        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>⏳ Auditing your website...</p>
          </div>
        )}

        {auditData && !loading && (
          <Dashboard data={auditData} />
        )}
      </main>
    </div>
  );
}
