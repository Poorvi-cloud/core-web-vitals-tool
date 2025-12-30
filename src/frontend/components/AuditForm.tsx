import { useState } from 'react';

interface AuditFormProps {
  onSubmit: (url: string) => void;
  loading: boolean;
}

export default function AuditForm({ onSubmit, loading }: AuditFormProps) {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    onSubmit(url);
  };

  return (
    <form onSubmit={handleSubmit} className="audit-form">
      <div className="form-group">
        <label htmlFor="url">Website URL</label>
        <input
          id="url"
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          required
          disabled={loading}
          className="url-input"
        />
      </div>
      <button type="submit" disabled={loading} className="submit-btn">
        {loading ? '⏳ Auditing...' : '🚀 Start Audit'}
      </button>
    </form>
  );
}
