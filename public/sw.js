const CACHE_NAME = "portfolio-assets-v10";
const CORE_ASSETS = [
  "/fonts/GeneralSans-Regular.woff2",
  "/fonts/GeneralSans-Medium.woff2",
  "/fonts/GeneralSans-Semibold.woff2",
  "/fonts/GeneralSans-Bold.woff2",
  "/images/pfp.svg",
];
const CACHEABLE_ASSET =
  /\.(?:css|js|woff2|glb|gltf|obj|dae|webp|png|jpe?g|svg)$/i;

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((names) =>
        Promise.all(
          names
            .filter(
              (name) =>
                name.startsWith("portfolio-assets-") && name !== CACHE_NAME
            )
            .map((name) => caches.delete(name))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (
    request.method !== "GET" ||
    url.origin !== self.location.origin ||
    request.mode === "navigate" ||
    !CACHEABLE_ASSET.test(url.pathname)
  ) {
    return;
  }

  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      const cached = await cache.match(request);
      if (cached) return cached;

      const response = await fetch(request);
      if (response.ok) cache.put(request, response.clone());
      return response;
    })
  );
});
