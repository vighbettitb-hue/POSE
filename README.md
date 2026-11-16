# PózTükör – Androidra telepíthető PWA

Ez egy ingyenes, böngészőből telepíthető webalkalmazás (PWA). A telefon kamerájának képére póz-sziluettet helyez, kategóriák és alap pózok között lehet váltani, az áttetszőség és a méret állítható, a kép menthető.

## Fontos korlátok
- A kamera csak biztonságos HTTPS-kapcsolaton vagy helyi fejlesztői környezetben működik.
- Ez a kezdőverzió nem AI-testfelismerő: kézzel igazítható sziluett-útmutatót mutat.
- A pózok stilizált, generált sziluettek; a későbbi változatban részletesebb pózrajzok és testtartás-illesztés adható hozzá.
- A kamera képe helyben marad, nincs feltöltés vagy analitika.

## Ingyenes közzététel GitHub Pages segítségével
1. Hozz létre egy ingyenes GitHub-fiókot a github.com oldalon.
2. Hozz létre egy új, nyilvános repository-t, például `poztukor` néven.
3. Töltsd fel a ZIP-ben lévő fájlokat a repository gyökerébe (ne a ZIP-et töltsd fel, hanem a kibontott fájlokat).
4. A repository-ban nyisd meg: **Settings → Pages**.
5. A **Build and deployment** résznél válaszd a **Deploy from a branch** lehetőséget, branch: `main`, folder: `/ (root)`, majd Save.
6. Néhány perc múlva a GitHub Pages ad egy `https://...github.io/poztukor/` címet.
7. Nyisd meg ezt a címet Androidon Chrome-ban, engedélyezd a kamerát.
8. Chrome menü (⋮) → **Alkalmazás telepítése** vagy **Hozzáadás a kezdőképernyőhöz**.

## Tesztelés számítógépen
A fájlok mappájában futtatható például:
`python -m http.server 8000`
Majd nyisd meg a `http://localhost:8000` címet. Telefonos kamerához publikus HTTPS kell.

## Továbbfejlesztési ötletek
- Részletesebb, külön megrajzolt póz-sziluettek.
- Testtartás-illesztés MediaPipe Pose segítségével.
- Pózok kedvencekbe mentése és saját referenciafotók.
- Android APK csomagolás külön Android buildfolyamattal.
