import fs from "node:fs";
import path from "node:path";

/** True if a file exists under /public (path given as a URL, e.g. "/images/x.webp"). */
export function publicFileExists(urlPath: string): boolean {
  return fs.existsSync(path.join(process.cwd(), "public", urlPath));
}

/**
 * Returns the URL of the owner's profile photo if one has been added to
 * /public/images (profile.jpg | .jpeg | .png | .webp), otherwise null so the
 * UI can show a placeholder. Resolved at build time — no code change needed.
 */
export function getProfilePhoto(): string | null {
  for (const ext of ["jpg", "jpeg", "png", "webp"]) {
    const url = `/images/profile.${ext}`;
    if (publicFileExists(url)) return url;
  }
  return null;
}
