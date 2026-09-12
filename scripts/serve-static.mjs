import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize, resolve } from "node:path";

const root = resolve(process.argv[2] ?? "out");
const port = Number(process.argv[3] ?? process.env.PORT ?? 3000);

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
  const candidates = [pathname, `${pathname}.html`, join(pathname, "index.html")];

  for (const candidate of candidates) {
    const file = resolve(root, `.${normalize(candidate)}`);
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