const CACHE_STATIC='pladeco-static-v49.0';
const CACHE_IMG='pladeco-img-v1';
const CACHE_TILES='pladeco-tiles-v1';
const MAX_IMG_CACHE=200;
const MAX_TILE_CACHE=500;

const STATIC_ASSETS=[
  './',
  './index.html',
  './manifest.json',
  './hero-bg.jpg',
  './qr-encuesta.png',
  './1.png',
  './2.png',
  './3.png',
  './hero-banner.png',
  './mision.png',
  './vision.png',
  './valores.png',
  './proyeccion-2035.png',
  './fuente-info.png',
  './escudo-rengo.svg',
  './escudo-rengo-blanco.svg',
  './Obra.png',
  'https://cdn.jsdelivr.net/npm/chart.js@4.4.4/dist/chart.umd.min.js',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
];

/* ── Install: pre-cache static assets ── */
self.addEventListener('install',e=>{
  e.waitUntil(
    caches.open(CACHE_STATIC).then(c=>c.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

/* ── Activate: clean old caches ── */
self.addEventListener('activate',e=>{
  const keep=new Set([CACHE_STATIC,CACHE_IMG,CACHE_TILES]);
  e.waitUntil(
    caches.keys().then(ks=>Promise.all(
      ks.filter(k=>!keep.has(k)).map(k=>caches.delete(k))
    ))
  );
  self.clients.claim();
});

/* ── Helper: trim cache to max entries ── */
function trimCache(name,max){
  caches.open(name).then(cache=>{
    cache.keys().then(keys=>{
      if(keys.length>max){
        cache.delete(keys[0]).then(()=>trimCache(name,max));
      }
    });
  });
}

/* ── Helper: safe to cache? (skip opaque error responses & non-GET) ── */
function isCacheable(req,res){
  if(req.method!=='GET') return false;
  if(res.status===0) return false; // opaque error
  if(res.type==='opaque') return true; // opaque OK (CORS images)
  return res.ok;
}

/* ── Fetch: strategy per request type ── */
self.addEventListener('fetch',e=>{
  const url=new URL(e.request.url);

  // Skip non-GET requests (POST, etc)
  if(e.request.method!=='GET') return;

  /* OSM map tiles → cache-first, runtime cache */
  if(url.hostname.includes('tile.openstreetmap.org')){
    e.respondWith(
      caches.match(e.request).then(r=>{
        if(r) return r;
        return fetch(e.request).then(res=>{
          if(isCacheable(e.request,res)){
            const cl=res.clone();
            caches.open(CACHE_TILES).then(c=>{c.put(e.request,cl);trimCache(CACHE_TILES,MAX_TILE_CACHE);});
          }
          return res;
        }).catch(()=>new Response('',{status:404}));
      })
    );
    return;
  }

  /* Images (png,jpg,svg,webp) → cache-first, runtime cache */
  const isImage=/\.(png|jpe?g|gif|svg|webp|ico)(\?.*)?$/i.test(url.pathname);
  if(isImage){
    e.respondWith(
      caches.match(e.request).then(r=>{
        if(r) return r;
        return fetch(e.request).then(res=>{
          if(isCacheable(e.request,res)){
            const cl=res.clone();
            caches.open(CACHE_IMG).then(c=>{c.put(e.request,cl);trimCache(CACHE_IMG,MAX_IMG_CACHE);});
          }
          return res;
        }).catch(()=>new Response('',{status:404}));
      })
    );
    return;
  }

  /* Static assets + HTML → cache-first with network fallback */
  e.respondWith(
    caches.match(e.request).then(r=>{
      if(r) return r;
      return fetch(e.request).then(res=>{
        if(res.ok&&(res.type==='basic'||res.type==='cors')){
          const cl=res.clone();
          caches.open(CACHE_STATIC).then(c=>c.put(e.request,cl));
        }
        return res;
      }).catch(()=>caches.match('./index.html'));
    })
  );
});
