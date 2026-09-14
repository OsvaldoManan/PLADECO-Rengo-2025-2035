# Genera las versiones web de Poppins que usa el portal (v45.358).
#
# Los TTF originales pesan unos 155 KB cada uno porque traen, además del alfabeto latino, la
# escritura devanagari (conjuntos y reglas de composición). El portal solo usa caracteres latinos,
# así que se conservan todos los caracteres latinos, signos y símbolos de la fuente (374 de 471)
# y se descarta el devanagari. Sale en WOFF, de unos 15 KB por peso.
# Poppins tiene licencia SIL Open Font License, que permite crear subconjuntos.
#
# Uso, desde esta carpeta (requiere fontTools: pip install fonttools):
#   python subconjunto_poppins.py
import os
import subprocess
import sys

from fontTools.ttLib import TTFont

AQUI = os.path.dirname(os.path.abspath(__file__))
PESOS = ['Medium', 'SemiBold', 'Bold', 'ExtraBold']


def es_latino(cp):
    # fuera: devanagari, extensiones védicas, devanagari extendido, círculo punteado y unidores de ancho cero
    return not (0x0900 <= cp <= 0x097F or 0x1CD0 <= cp <= 0x1CFF or 0xA8E0 <= cp <= 0xA8FF
                or cp in (0x25CC, 0x200C, 0x200D))


for peso in PESOS:
    origen = os.path.join(AQUI, 'Poppins-%s.ttf' % peso)
    destino = os.path.join(AQUI, 'Poppins-%s-latin.woff' % peso)
    caracteres = sorted(cp for cp in TTFont(origen).getBestCmap() if es_latino(cp))
    subprocess.run([sys.executable, '-m', 'fontTools.subset', origen,
                    '--unicodes=' + ','.join('U+%04X' % cp for cp in caracteres),
                    '--flavor=woff', '--output-file=' + destino], check=True)
    print('%s: %d caracteres, %d bytes' % (os.path.basename(destino), len(caracteres), os.path.getsize(destino)))
