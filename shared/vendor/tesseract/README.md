# Tesseract.js, kept on this site (GWG BLD 948)

The receipt reader for Log This Trip (field-guide/trip.js). It loads only when someone taps Scan a Receipt, and it reads
the picture inside the browser. Nothing here reaches any other site: every path below is served from this folder.

| File | From | Size |
| --- | --- | --- |
| tesseract.min.js | tesseract.js 7.0.0 (npm), dist/tesseract.min.js | 62 KB |
| worker.min.js | tesseract.js 7.0.0 (npm), dist/worker.min.js | 109 KB |
| tesseract-core-simd-lstm.js | tesseract.js-core 7.0.0 (npm) | 87 KB |
| tesseract-core-simd-lstm.wasm | tesseract.js-core 7.0.0 (npm) | 2.7 MB |
| eng.traineddata.gz | @tesseract.js-data/eng 1.0.0 (npm), 4.0.0_best_int | 2.8 MB |

About 5.8 MB in all. The first scan on a device downloads these once; the English data is then kept in the browser's own
storage (IndexedDB, on the device) so later scans start quickly.

Choices:
- LSTM only, with SIMD (every current phone browser: Safari 16.4 and newer, Chrome, Edge, Firefox). An older browser
  gets a kind note to type the total instead.
- The worker runs from its own file here (workerBlobURL false), so the core finds its .wasm beside it.
- The source map comments at the end of the two .min.js files were taken out (the maps are left out to keep this small).

Licenses: tesseract.js and tesseract.js-core are Apache License 2.0 (LICENSE.md here, from tesseract.js). The English data
comes from the Tesseract OCR project (tessdata), Apache License 2.0; its npm wrapper @tesseract.js-data/eng is MIT.
Bundled pieces inside the .min.js files keep their notices in tesseract.min.js.LICENSE.txt and worker.min.js.LICENSE.txt
(regenerator-runtime MIT, buffer MIT, ieee754 BSD-3-Clause, zlib.js MIT).

To update: npm pack tesseract.js tesseract.js-core @tesseract.js-data/eng, copy the same files, and bump the ?v= in
field-guide/trip.js.
