const CACHE_STATIC='pladeco-static-v50.1';
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
  './logo-pladeco.png',
  'https://cdn.jsdelivr.net/npm/chart.js@4.4.4/dist/chart.umd.min.js',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
];

/* ── Install: pre-cache static assets ── */
self.addEventListener('install',e=>{
  e.waitUntil(
    caches.open(CACHE_STATIC).then(c=>c.addAll(STATIC_ASSETS).catch(err=>{
      // Si algún asset falla, no aborta toda la instalación
      console.warn('SW install: some assets failed', err);
    }))
  );
  self.skipWaiting();
});

/* ── Activate: clean old caches + claim immediately ── */
self.addEventListener('activate',e=>{
  const keep=new Set([CACHE_STATIC,CACHE_IMG,CACHE_TILES]);
  e.waitUntil(
    caches.keys().then(ks=>Promise.all(
      ks.filter(k=>!keep.has(k)).map(k=>caches.delete(k))
    )).then(()=>self.clients.claim())
  );
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

/* ── Helper: is HTML request? ── */
function isHTML(req,url){
  if(req.mode==='navigate') return true;
  if(req.destination==='document') return true;
  const accept=req.headers.get('accept')||'';
  if(accept.includes('text/html')) return true;
  if(/\.html$/i.test(url.pathname)) return true;
  if(url.pathname==='/'||url.pathname.endsWith('/')) return true;
  return false;
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

  /* HTML / Navigation requests → NETWORK-FIRST (always try fresh, fallback to cache) */
  if(isHTML(e.request,url)){
    e.respondWith(
      fetch(e.request).then(res=>{
        // Si la red responde, actualiza la caché y devuelve la respuesta fresca
        if(res && res.ok){
          const cl=res.clone();
          caches.open(CACHE_STATIC).then(c=>c.put(e.request,cl));
        }
        return res;
      }).catch(()=>{
        // Sin red: fallback a la caché
        return caches.match(e.request).then(r=>r||caches.match('./index.html'));
      })
    );
    return;
  }

  /* Static assets (CSS/JS/fonts/etc.) → stale-while-revalidate */
  e.respondWith(
    caches.match(e.request).then(cached=>{
      const networkPromise=fetch(e.request).then(res=>{
        if(res && res.ok && (res.type==='basic'||res.type==='cors')){
          const cl=res.clone();
          caches.open(CACHE_STATIC).then(c=>c.put(e.request,cl));
        }
        return res;
      }).catch(()=>cached);
      // Si está en caché, devolver inmediatamente y refrescar en background
      return cached || networkPromise;
    })
  );
});

/* ── Listen for messages from page (e.g. SKIP_WAITING) ── */
self.addEventListener('message',e=>{
  if(e.data && e.data.type==='SKIP_WAITING'){
    self.skipWaiting();
  }
});
