// Runs before `npm run build`. Never fails the build — it only makes sure
// unfinished placeholders are impossible to miss before deploying.
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const warnings = [];

// The generator stamps "PLACEHOLDER RESUME" into the PDF's /Subject, which
// pdf-lib stores as a UTF-16BE hex string. A real resume won't contain it.
function isPlaceholderPdf(buffer) {
  const text = buffer.toString("latin1").toUpperCase();
  const hex = Buffer.from("PLACEHOLDER RESUME", "utf16le").swap16().toString("hex").toUpperCase();
  return text.includes("PLACEHOLDER RESUME") || text.includes(hex);
}

const resumePath = path.join(root, "public/resume/Geetanjali-Chouhan-Resume.pdf");
if (!fs.existsSync(resumePath)) {
  warnings.push("Resume PDF is missing: public/resume/Geetanjali-Chouhan-Resume.pdf");
} else if (isPlaceholderPdf(fs.readFileSync(resumePath))) {
  warnings.push(
    "The resume is still the PLACEHOLDER. Replace public/resume/Geetanjali-Chouhan-Resume.pdf with your real resume (keep the filename).",
  );
}

const photo = ["jpg", "jpeg", "png", "webp"].find((ext) =>
  fs.existsSync(path.join(root, `public/images/profile.${ext}`)),
);
if (!photo) {
  warnings.push("No profile photo found. Add public/images/profile.jpg (or .png / .webp).");
}

for (const slug of ["chatting-app", "pulsecrud", "vion"]) {
  if (!fs.existsSync(path.join(root, `public/images/projects/${slug}.webp`))) {
    warnings.push(`No screenshot for "${slug}". Add public/images/projects/${slug}.webp`);
  }
}

if (!process.env.RESEND_API_KEY) {
  warnings.push(
    "RESEND_API_KEY is not set in this environment — the contact form will report that it can't send until it is.",
  );
}

if (warnings.length === 0) {
  console.log("\n✔ Asset check passed.\n");
} else {
  console.log("\n⚠  Before you deploy:\n");
  for (const w of warnings) console.log(`   • ${w}`);
  console.log("");
}
