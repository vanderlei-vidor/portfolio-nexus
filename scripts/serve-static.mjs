import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, resolve } from "node:path";

const root = resolve(process.argv[2] ?? "out");
const port = Number(process.argv[3] ?? process.env.PORT ?? 3000);
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "") || "";

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".map": "application/json; charset=utf-8",
  ".mp4": "video/mp4",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webm": "video/webm",
  ".webp": "image/webp",
  ".xml": "application/xml; charset=utf-8",
};

function resolveFile(urlPath) {
  const pathname = decodeURIComponent(new URL(urlPath, "http://localhost").pathname);
  const strippedPathname = basePath && pathname.startsWith(basePath)
    ? pathname.slice(basePath.length) || "/"
    : pathname;
  const normalizedPathname = strippedPathname === "" ? "/" : strippedPathname;
  const cleanRelativePath = normalizedPathname === "/"
    ? "index.html"
    : normalizedPathname.replace(/^\/+|\/+$/g, "");
  const candidates = [
    cleanRelativePath,
    cleanRelativePath.endsWith(".html") ? cleanRelativePath : `${cleanRelativePath}.html`,
    cleanRelativePath.endsWith("/index.html") ? cleanRelativePath : `${cleanRelativePath}/index.html`,
  ].filter(Boolean);

  for (const candidate of candidates) {
    const file = resolve(root, candidate);
    if (file.startsWith(root) && existsSync(file) && statSync(file).isFile()) {
      return file;
    }
  }

  const notFound = resolve(root, "404.html");
  return existsSync(notFound) ? notFound : null;
}

createServer((req, res) => {
  const file = resolveFile(req.url ?? "/");

  if (!file) {
    res.writeHead(404);
    res.end("Not found");
    return;
  }

  res.writeHead(file.endsWith("404.html") ? 404 : 200, {
    "Content-Type": contentTypes[extname(file)] ?? "application/octet-stream",
  });
  createReadStream(file).pipe(res);
}).listen(port, "127.0.0.1", () => {
  console.log(`Serving ${root} at http://127.0.0.1:${port}`);
});