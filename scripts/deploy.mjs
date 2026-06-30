import FtpDeploy from "ftp-deploy";
import { createRequire } from "module";
import path from "path";
import { fileURLToPath } from "url";

// Load credentials from .env.deploy (never committed to source control)
const require = createRequire(import.meta.url);
const dotenv = require("dotenv");
const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config({ path: path.resolve(__dirname, "../.env.deploy") });

const {
  FTP_HOST,
  FTP_USER,
  FTP_PASSWORD,
  FTP_REMOTE_ROOT = "/public_html",
  FTP_PORT = "21",
} = process.env;

if (!FTP_HOST || !FTP_USER || !FTP_PASSWORD) {
  console.error(
    "Missing FTP credentials. Create a .env.deploy file with FTP_HOST, FTP_USER and FTP_PASSWORD."
  );
  process.exit(1);
}

const ftpDeploy = new FtpDeploy();

const config = {
  user: FTP_USER,
  password: FTP_PASSWORD,
  host: FTP_HOST,
  port: parseInt(FTP_PORT, 10),
  localRoot: path.resolve(__dirname, "../out"),
  remoteRoot: FTP_REMOTE_ROOT,
  include: ["*", "**/*"],
  // Remove files on the server that are no longer in the local build
  deleteRemote: false,
  // Force passive mode (required by most shared hosts)
  forcePasv: true,
  sftp: false,
  // Limit to one connection — prevents 421 "Home directory not available" errors
  // on shared hosts that cap concurrent FTP sessions
  parallelUploads: 1,
};

console.log(`Deploying to ${FTP_HOST}${FTP_REMOTE_ROOT} …`);

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 10_000;

async function deployWithRetry(attempt = 1) {
  try {
    const res = await ftpDeploy.deploy(config);
    console.log(`\nDeployment complete. ${res.length} file(s) uploaded.`);
  } catch (err) {
    console.error(`\nDeployment failed (attempt ${attempt}/${MAX_RETRIES}):`, err.message ?? err);
    if (attempt < MAX_RETRIES) {
      console.log(`Retrying in ${RETRY_DELAY_MS / 1000}s…`);
      await new Promise((r) => setTimeout(r, RETRY_DELAY_MS));
      await deployWithRetry(attempt + 1);
    } else {
      console.error("All retry attempts exhausted.");
      process.exit(1);
    }
  }
}

deployWithRetry();

ftpDeploy.on("uploading", ({ filename, transferredFileCount, totalFilesCount }) => {
  process.stdout.write(
    `\r[${transferredFileCount}/${totalFilesCount}] ${filename}`.padEnd(80)
  );
});
