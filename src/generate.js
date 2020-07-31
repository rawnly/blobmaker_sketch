// documentation: https://developer.sketchapp.com/reference/api/

import sketch from 'sketch'
import { alert, askForSelect, minMax, centerLayers, createBlob } from './utils'

export default function() {
  const document = sketch.getSelectedDocument()
  const artboard = document.selectedLayers.layers.find(item => item.type === 'Artboard')

  if (!artboard) {
    alert("No artboard selected", "Please select an artboard")
    return
  }

  askForSelect('Complexity', 3, 12, 8, (err, complexity) => {
    if (complexity==null) return;
    complexity = minMax(complexity, 3, 12)

    askForSelect('Contrast', 1, 8, 5, (err, contrast) => {
      if (contrast==null) return;
      contrast = minMax(contrast, 1, 8)

      const blob = createBlob(complexity, contrast);
      const [x, y] = centerLayers(artboard, blob)

      blob.frame.x = x;
      blob.frame.y = y;

      blob.parent = artboard

      document.centerOnLayer(blob)
    })
  })
}
