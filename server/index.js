
import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

let db;
const initDB = async () => {
  db = await open({
    filename: './data.db',
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS profiles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      self_flags TEXT,
      ok_with_flags TEXT
    );
  `);

  app.post('/api/submit-profile', async (req, res) => {
    const { selfFlags, okWithFlags } = req.body;
    if (!Array.isArray(selfFlags) || !Array.isArray(okWithFlags)) {
      return res.status(400).json({ error: 'Invalid data format.' });
    }

    const stmt = await db.prepare(
      'INSERT INTO profiles (self_flags, ok_with_flags) VALUES (?, ?)'
    );
    await stmt.run(JSON.stringify(selfFlags), JSON.stringify(okWithFlags));
    const result = await stmt.finalize();

    res.json({ success: true });
  });

  app.get('/api/profiles', async (req, res) => {
    const profiles = await db.all('SELECT * FROM profiles');
    res.json(profiles);
  });

  app.delete('/api/profiles', async (req, res) => {
    await db.run('DELETE FROM profiles');
    res.json({ success: true });
  });

  app.listen(PORT, () => {
    console.log('SQLite backend running on port', PORT);
  });
};

initDB();
