// documentation: https://developer.sketchapp.com/reference/api/

import sketch from 'sketch'
import { alert, centerLayers, createBlob, minMax, randomNumber } from './utils'

export default function() {
  const document = sketch.getSelectedDocument()
  const artboard = document.selectedLayers.layers.find(item => item.type === 'Artboard')

  if (!artboard) {
    alert("No artboard selected", "Please select an artboard")
    return
  }


  let complexity = randomNumber(3, 12)
  let contrast = randomNumber(1, 8)

  complexity = minMax(complexity, 3, 12)
  contrast = minMax(contrast, 1, 8)

  const blob = createBlob(complexity, contrast);
  const [x, y] = centerLayers(artboard, blob)

  blob.frame.x = x;
  blob.frame.y = y;

  blob.parent = artboard

  document.centerOnLayer(blob)
}
