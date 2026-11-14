// Generates a clearly-labelled PLACEHOLDER resume at
// public/resume/Geetanjali-Chouhan-Resume.pdf, using only verified facts.
// Replace the output with the real resume PDF (same filename).
//   node scripts/generate-placeholder-resume.mjs
import fs from "node:fs";
import path from "node:path";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

const out = path.join(process.cwd(), "public/resume/Geetanjali-Chouhan-Resume.pdf");
fs.mkdirSync(path.dirname(out), { recursive: true });

const doc = await PDFDocument.create();
doc.setTitle("Geetanjali Chouhan - Resume (PLACEHOLDER)");
doc.setAuthor("Geetanjali Chouhan");
doc.setSubject("PLACEHOLDER RESUME - replace with the real resume");

const page = doc.addPage([595.28, 841.89]); // A4
const regular = await doc.embedFont(StandardFonts.Helvetica);
const bold = await doc.embedFont(StandardFonts.HelveticaBold);
const navy = rgb(0.09, 0.145, 0.329);
const royal = rgb(0.145, 0.388, 0.922);
const slate = rgb(0.392, 0.455, 0.545);
const left = 56;
let y = 780;

const text = (s, { size = 11, font = regular, color = navy, x = left } = {}) => {
  page.drawText(s, { x, y, size, font, color });
  y -= size + 8;
};

// Banner
page.drawRectangle({ x: 0, y: 790, width: 595.28, height: 52, color: rgb(1, 0.95, 0.78) });
page.drawText("PLACEHOLDER RESUME", { x: left, y: 820, size: 14, font: bold, color: rgb(0.52, 0.3, 0.04) });
page.drawText(
  "Replace public/resume/Geetanjali-Chouhan-Resume.pdf with the real resume before sharing.",
  { x: left, y: 802, size: 9.5, font: regular, color: rgb(0.52, 0.3, 0.04) },
);

y = 750;
text("Geetanjali Chouhan", { size: 26, font: bold });
text("Full Stack Developer", { size: 14, color: royal, font: bold });
y -= 6;
text("Indore, India  |  geetanjalichouhan39@gmail.com", { size: 10, color: slate });
text("linkedin.com/in/geetanjali-chouhan-421194291  |  github.com/Geetanjali-Chouhan", { size: 10, color: slate });

y -= 14;
text("EXPERIENCE", { size: 10, font: bold, color: royal });
text("Frontend Developer Intern - Vijay Mantra (7 months)", { font: bold });

y -= 10;
text("EDUCATION", { size: 10, font: bold, color: royal });
text("Graduated 2024", { font: bold });

y -= 10;
text("TECHNICAL SKILLS", { size: 10, font: bold, color: royal });
text("Frontend: HTML5, CSS3, JavaScript, React.js, Next.js, Tailwind CSS, Redux Toolkit");
text("Backend: Node.js, Express.js, REST APIs, Authentication");
text("Database: MongoDB, Mongoose");
text("Tools: Git, GitHub, VS Code, npm");

y -= 10;
text("PROJECTS", { size: 10, font: bold, color: royal });
text("Chatting App - github.com/Geetanjali-Chouhan/Chatting-App");
text("PulseCRUD - github.com/Geetanjali-Chouhan/CRUD-Application");
text("VION Virtual Assistant - github.com/Geetanjali-Chouhan/VIRTUAL-ASSISTANT-VION");

// The "PLACEHOLDER RESUME" subject set above is what scripts/check-assets.mjs
// looks for, so an un-replaced placeholder is flagged before every build.
fs.writeFileSync(out, await doc.save({ useObjectStreams: false }));
console.log("Wrote", out);
