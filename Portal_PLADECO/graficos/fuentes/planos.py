from PIL import Image, ImageDraw, ImageFilter
import json, statistics
import os
AQUI = os.path.dirname(os.path.abspath(__file__))
os.chdir(AQUI)  # los JSON intermedios se leen y escriben junto al guion
src = os.path.join(AQUI, '..', '..', 'Entrada-Rengo-Color-Pladeco.jpg')  # foto aérea del portal
rgb = Image.open(src).convert('RGB')
W, H = rgb.size
L = rgb.convert('L').filter(ImageFilter.GaussianBlur(2)).load()
raw = json.load(open('ridge2_raw.json'))['18']
STEP = 4
def median_filter(vals, k):
    out = []
    for i in range(len(vals)):
        win = [v for v in vals[max(0,i-k):i+k+1] if v is not None]
        out.append(statistics.median(win) if win else None)
    return out
sky = [y for _, y in raw]
# zona izquierda neblinosa (x < 540*1.28): filtro de mediana amplio para quitar picos
sky_f = median_filter(sky, 2)
cut = int(540*1.28/STEP)
left = median_filter(sky[:cut+10], 9)
sky_f = left[:cut] + sky_f[cut:]
def sustained(x, y0, y1, cond, n=12):
    for y in range(y0, y1):
        if all(cond(L[x, y+k]) for k in range(n) if y+k < H):
            return y
    return None
p2, p3, base = [], [], []
for i in range(W // STEP):
    x = i*STEP
    ys = sky_f[i]
    if ys is None: p2.append(None); p3.append(None); base.append(None); continue
    ys = int(ys)
    # tono inmediatamente bajo la cresta
    under = statistics.mean(L[x, min(H-1, ys+6+k)] for k in range(6))
    # plano 2 (cordón principal): primer tramo sostenido con L < 134
    y2 = sustained(x, ys+2, 470, lambda v: v < 134, 14)
    # plano 3 (cerro cercano): L < 114 sostenido, solo mitad derecha
    y3 = sustained(x, ys+2, 470, lambda v: v < 113, 18) if x > int(1180*1.28) else None
    # base de la montaña: primer y > y2 con L > 140 sostenido (neblina) o 452
    yb = None
    if y2:
        yb = sustained(x, y2+8, 480, lambda v: v > 140, 10)
    p2.append(y2); p3.append(y3); base.append(yb)
res = {'W': W, 'H': H, 'step': STEP, 'cresta': sky_f, 'plano2': p2, 'plano3': p3, 'base': base}
json.dump(res, open('planos_raw.json', 'w'))
vis = rgb.copy(); d = ImageDraw.Draw(vis)
for serie, col in ((sky_f, (255,0,0)), (p2, (255,220,0)), (p3, (0,255,120)), (base, (255,0,255))):
    pts = [(i*STEP, y) for i, y in enumerate(serie) if y is not None]
    for a, b in zip(pts, pts[1:]):
        if abs(a[0]-b[0]) <= STEP*2: d.line([a, b], fill=col, width=3)
vis.crop((0, 200, W, 600)).save('planos_check.png')
print('ok')
