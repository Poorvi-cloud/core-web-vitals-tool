-- URL Audits Table
CREATE TABLE IF NOT EXISTS url_audits (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  url TEXT NOT NULL UNIQUE,
  status TEXT DEFAULT 'pending',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Audit Results Table
CREATE TABLE IF NOT EXISTS audit_results (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  audit_id INTEGER NOT NULL,
  metric_name TEXT NOT NULL,
  value REAL,
  status TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (audit_id) REFERENCES url_audits(id) ON DELETE CASCADE
);

-- Screenshots Table
CREATE TABLE IF NOT EXISTS screenshots (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  audit_id INTEGER NOT NULL,
  screenshot_path TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (audit_id) REFERENCES url_audits(id) ON DELETE CASCADE
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_url_audits_status ON url_audits(status);
CREATE INDEX IF NOT EXISTS idx_audit_results_audit_id ON audit_results(audit_id);
CREATE INDEX IF NOT EXISTS idx_screenshots_audit_id ON screenshots(audit_id);
