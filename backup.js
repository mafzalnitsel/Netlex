const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

// === CONFIGURATION ===
const BACKUP_DIR = "/Users/zeeshan/Desktop/Afzal/Mongo_Databases_Backup"; // Change if needed
// const MONGO_URI = 'mongodb+srv://mafzal:qEZBM5tMUB9DflS9@cluster0.dgqyzm9.mongodb.net'; // Atlas example
// const MONGO_URI = "mongodb://localhost"; // Local MongoDB
const MONGO_URI =
  "mongodb+srv://netlex:Dqza3lNbulzSuVCQ@cluster0.txoyysd.mongodb.net"; // Local MongoDB

function backupAllDatabases() {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const outDir = path.join(BACKUP_DIR, `backup-${timestamp}`);
  fs.mkdirSync(outDir, { recursive: true });

  const command = `mongodump --uri="${MONGO_URI}" --out="${outDir}"`;

  console.log(`\n📦 Starting backup to ${outDir}`);
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`❌ Error during backup:`, stderr.trim());
    } else {
      console.log(`✅ Backup completed successfully`);
    }
  });
}

backupAllDatabases();
