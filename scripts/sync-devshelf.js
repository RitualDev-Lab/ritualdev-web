import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.join(__dirname, "..");

async function syncDevShelf() {
  console.log("🔄 Syncing DevShelf catalog into ritualdev-web...");

  const localDevShelfDataPath = path.resolve(root, "..", "DevShelf", "site", "data.json");
  let dataJson = "";

  try {
    const exists = await fs.stat(localDevShelfDataPath).catch(() => null);
    if (exists) {
      console.log(`📁 Found local DevShelf catalog at ${localDevShelfDataPath}`);
      dataJson = await fs.readFile(localDevShelfDataPath, "utf8");
    }
  } catch (err) {
    console.log("Local DevShelf not found, attempting remote fetch...");
  }

  if (!dataJson) {
    const remoteUrl = "https://raw.githubusercontent.com/RitualDev-Lab/DevShelf/main/site/data.json";
    console.log(`🌐 Fetching remote catalog from ${remoteUrl}...`);
    const res = await fetch(remoteUrl);
    if (!res.ok) {
      throw new Error(`Failed to fetch catalog from ${remoteUrl}: ${res.statusText}`);
    }
    dataJson = await res.text();
  }

  const parsed = JSON.parse(dataJson);
  const totalCount = parsed.totalCount || parsed.resources?.length || 0;
  console.log(`✅ Loaded catalog with ${totalCount} resources.`);

  const targetSrc = path.join(root, "src", "data", "devshelf.json");
  const targetPublic = path.join(root, "public", "data.json");

  await fs.writeFile(targetSrc, `${JSON.stringify(parsed, null, 2)}\n`, "utf8");
  await fs.writeFile(targetPublic, `${JSON.stringify(parsed, null, 2)}\n`, "utf8");

  console.log(`✨ Successfully updated:\n   - ${targetSrc}\n   - ${targetPublic}`);
}

syncDevShelf().catch((err) => {
  console.error("❌ Failed to sync DevShelf:", err);
  process.exit(1);
});
