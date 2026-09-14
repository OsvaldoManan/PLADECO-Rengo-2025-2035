from PIL import Image, ImageDraw, ImageFilter
import json
import os
AQUI = os.path.dirname(os.path.abspath(__file__))
os.chdir(AQUI)  # los JSON intermedios se leen y escriben junto al guion
src = os.path.join(AQUI, '..', '..', 'Entrada-Rengo-Color-Pladeco.jpg')  # foto aérea del portal
im = Image.open(src).convert('RGB').filter(ImageFilter.GaussianBlur(1.2))
W, H = im.size
px = im.load()
def dist(a,b): return sum((a[i]-b[i])**2 for i in range(3))**0.5
def detect(x, y0, y1, thr, confirm=6, win=14):
    buf = [px[x,y] for y in range(y0-win, y0)]
    for y in range(y0, y1):
        mean = tuple(sum(c[i] for c in buf)/len(buf) for i in range(3))
        p = px[x,y]
        if dist(p, mean) > thr:
            ok = all(dist(px[x,y+k], mean) > thr*0.8 for k in range(1, confirm) if y+k < H)
            if ok: return y
        buf.append(p); buf.pop(0)
    return None
res = {}
for thr in (18, 24, 30):
    ridge = []
    for x in range(0, W, 4):
        ridge.append((x, detect(x, 160, 640, thr)))
    res[thr] = ridge
json.dump({str(k):v for k,v in res.items()}, open('ridge2_raw.json','w'))
vis = im.copy(); d = ImageDraw.Draw(vis)
cols = {18:(255,0,0), 24:(255,230,0), 30:(0,255,90)}
for thr, ridge in res.items():
    pts = [(x,y) for x,y in ridge if y is not None]
    d.line(pts, fill=cols[thr], width=2)
    print(thr, 'con borde', len(pts), 'de', len(ridge))
vis.crop((0, 200, W, 560)).save('ridge2_check.png')
