import { execSync } from "child_process";

// Install pdfkit
console.log("Installing pdfkit...");
execSync("npm install pdfkit", { stdio: "inherit", cwd: "/vercel/share/v0-project" });

// Create public dir if needed
execSync("mkdir -p /vercel/share/v0-project/public");

// Run the generation script
console.log("Generating PDF...");
execSync("node /vercel/share/v0-project/scripts/generate-docs.mjs", {
  stdio: "inherit",
  cwd: "/vercel/share/v0-project",
});
