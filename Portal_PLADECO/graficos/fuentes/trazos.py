from PIL import Image, ImageFilter
import json, colorsys
import os
AQUI = os.path.dirname(os.path.abspath(__file__))
os.chdir(AQUI)  # los JSON intermedios se leen y escriben junto al guion
src = os.path.join(AQUI, '..', '..', 'Entrada-Rengo-Color-Pladeco.jpg')  # foto aérea del portal
rgb = Image.open(src).convert('RGB')
W, H = rgb.size
P = rgb.filter(ImageFilter.GaussianBlur(1)).load()
d = json.load(open('planos_raw.json'))
STEP = d['step']; cresta = d['cresta']
def rdp(points, eps):
    if len(points) < 3: return points
    (x1,y1),(x2,y2) = points[0], points[-1]
    dx, dy = x2-x1, y2-y1
    L = (dx*dx+dy*dy)**0.5 or 1
    idx, dmax = 0, 0
    for i in range(1, len(points)-1):
        x0,y0 = points[i]
        dist = abs(dy*x0 - dx*y0 + x2*y1 - y2*x1)/L
        if dist > dmax: idx, dmax = i, dist
    if dmax > eps:
        return rdp(points[:idx+1], eps)[:-1] + rdp(points[idx:], eps)
    return [points[0], points[-1]]
pts = [(i*STEP, float(y)) for i, y in enumerate(cresta) if y is not None]
pts.append((W, pts[-1][1]))
simp = rdp(pts, 2.2)
print('cresta: puntos', len(pts), '->', len(simp))
# nieve: por columna, largo de la corrida de pixeles brillantes y poco saturados desde la cresta
nieve = []
for i, y in enumerate(cresta):
    if y is None: nieve.append(0); continue
    x = i*STEP; y = int(y); n = 0
    for k in range(0, 40):
        if y+k >= H: break
        r,g,b = P[x, y+k]
        h,s,v = colorsys.rgb_to_hsv(r/255,g/255,b/255)
        if v > 0.78 and s < 0.28: n = k+1
        elif k > 3 and n == 0: break
        elif k - n > 4: break
    nieve.append(n)
# corridas con nieve
corridas = []; cur = None
for i, n in enumerate(nieve):
    if n >= 3:
        if cur is None: cur = [i, i]
        else: cur[1] = i
    else:
        if cur and cur[1]-cur[0] >= 2: corridas.append(cur)
        cur = None
if cur and cur[1]-cur[0] >= 2: corridas.append(cur)
print('corridas de nieve', len(corridas), [(a*STEP, b*STEP, max(nieve[a:b+1])) for a,b in corridas])
json.dump({'W': W, 'H': H, 'cresta': simp, 'nieve_cols': nieve, 'step': STEP, 'corridas': corridas,
           'cresta_full': pts}, open('trazos.json','w'))
