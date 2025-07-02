const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

// === CONFIGURATION ===
// const BACKUP_DIR = '/Users/zeeshan/Downloads/netlex backup';
const BACKUP_DIR = "/Users/zeeshan/Desktop/Afzal/AIOT/MongoDB_dump";
// const MONGO_URI = 'mongodb+srv://mafzal:qEZBM5tMUB9DflS9@cluster0.dgqyzm9.mongodb.net'; // Replace with your Atlas URI
// const MONGO_URI = "mongodb://localhost"; // Replace with your Atlas URI
const MONGO_URI = "mongodb://81.88.25.32:27017";
// "mongodb+srv://netlex:Dqza3lNbulzSuVCQ@cluster0.txoyysd.mongodb.net";

function restoreDatabase(dbPath) {
  const dbName = path.basename(dbPath);
  const command = `mongorestore --uri="${MONGO_URI}/${dbName}" --dir="${dbPath}" --drop`;

  console.log(`\n🔄 Restoring database: ${dbName}`);
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`❌ Error restoring ${dbName}:`, stderr.trim());
    } else {
      console.log(`✅ Successfully restored ${dbName}`);
    }
  });
}

function restoreAllDatabases() {
  fs.readdirSync(BACKUP_DIR, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .forEach((dirent) => {
      const dbPath = path.join(BACKUP_DIR, dirent.name);
      restoreDatabase(dbPath);
    });
}

restoreAllDatabases();
