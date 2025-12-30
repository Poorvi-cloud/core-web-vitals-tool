import sqlite3 from 'sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'core_web_vitals.db');

export const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Database connection error:', err);
    process.exit(1);
  }
  console.log('✅ SQLite database connected');
});

db.run('PRAGMA foreign_keys = ON');

export const initDatabase = async () => {
  return new Promise<void>((resolve, reject) => {
    db.exec(`
      CREATE TABLE IF NOT EXISTS url_audits (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        url TEXT NOT NULL UNIQUE,
        status TEXT DEFAULT 'pending',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS audit_results (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        audit_id INTEGER NOT NULL,
        metric_name TEXT NOT NULL,
        value REAL,
        status TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (audit_id) REFERENCES url_audits(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS screenshots (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        audit_id INTEGER NOT NULL,
        screenshot_path TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (audit_id) REFERENCES url_audits(id) ON DELETE CASCADE
      );
    `, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
};
