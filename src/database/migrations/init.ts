import { db } from '../../config/database.ts';





const runMigrations = async () => {
  return new Promise<void>((resolve, reject) => {
    db.serialize(() => {
      // Migration 1: Create initial schema
      db.run(`
        CREATE TABLE IF NOT EXISTS migrations (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL UNIQUE,
          executed_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
      `);

      db.run(`
        CREATE TABLE IF NOT EXISTS url_audits (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          url TEXT NOT NULL UNIQUE,
          status TEXT DEFAULT 'pending',
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
      `);

      db.run(`
        CREATE TABLE IF NOT EXISTS audit_results (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          audit_id INTEGER NOT NULL,
          metric_name TEXT NOT NULL,
          value REAL,
          status TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (audit_id) REFERENCES url_audits(id) ON DELETE CASCADE
        );
      `, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  });
};

runMigrations()
  .then(() => {
    console.log('✅ Migrations completed successfully');
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ Migration failed:', err);
    process.exit(1);
  });
