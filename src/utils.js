import sketch from 'sketch'
import { generate as makeBlob } from 'blobmaker'

export const createSelection = (min, max) => Array.from(Array(max).fill(0), (_, idx) => `${idx+1}`).slice(min - 1)
export const randomNumber = (a,b) => Math.floor(Math.random() * (Math.max(a,b) - Math.min(a,b) + 1) + Math.min(a,b))
export const minMax = (value, min = -Infinity, max = Infinity) => value > max ? max : (value < min) ? min : value;

// UI
export const alert = (title, message = '') => sketch.UI.alert(title, message)
export const askForSelect = (message, min, max, defaultValue, cb) => sketch.UI.getInputFromUser(
    message,
    {
      type: sketch.UI.INPUT_TYPE.selection,
      initialValue: `${defaultValue}`,
      possibleValues: createSelection(min, max)
    },
    cb
  )

export function centerLayers(parent, children) {
  const x = (parent.frame.width / 2) - (children.frame.width / 2)
  const y =  parent.frame.height / 2 - (children.frame.height / 2)

  return [x, y]
}

export function createBlob(complexity, contrast) {
  const data = makeBlob(complexity, contrast)
  const preparedData = data.replace(',', ' ')

  const blob = sketch.ShapePath.fromSVGPath(preparedData)

  blob.style.fills = ['#D8D8D8']
  blob.name = `Blob_${complexity}_${contrast}`

  return blob;
}
