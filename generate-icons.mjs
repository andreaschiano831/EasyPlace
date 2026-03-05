// generate-icons.mjs
// Run with: node generate-icons.mjs
// Requires: npm install canvas (or use pwa-asset-generator)

import { createCanvas } from 'canvas'
import { writeFileSync, mkdirSync } from 'fs'

const sizes = [72, 96, 128, 144, 152, 192, 384, 512]

mkdirSync('./public/icons', { recursive: true })

function generateIcon(size) {
  const canvas = createCanvas(size, size)
  const ctx = canvas.getContext('2d')

  // Background gradient
  const grad = ctx.createLinearGradient(0, 0, size, size)
  grad.addColorStop(0, '#7C6EF5')
  grad.addColorStop(1, '#4DBBDB')

  // Rounded rect
  const radius = size * 0.18
  ctx.beginPath()
  ctx.moveTo(radius, 0)
  ctx.lineTo(size - radius, 0)
  ctx.quadraticCurveTo(size, 0, size, radius)
  ctx.lineTo(size, size - radius)
  ctx.quadraticCurveTo(size, size, size - radius, size)
  ctx.lineTo(radius, size)
  ctx.quadraticCurveTo(0, size, 0, size - radius)
  ctx.lineTo(0, radius)
  ctx.quadraticCurveTo(0, 0, radius, 0)
  ctx.closePath()
  ctx.fillStyle = grad
  ctx.fill()

  // Letter S
  ctx.fillStyle = 'rgba(255,255,255,0.95)'
  ctx.font = `bold ${size * 0.5}px Arial`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('S', size / 2, size / 2)

  // Small P
  ctx.font = `bold ${size * 0.22}px Arial`
  ctx.fillStyle = 'rgba(255,255,255,0.7)'
  ctx.fillText('P', size * 0.65, size * 0.65)

  return canvas.toBuffer('image/png')
}

for (const size of sizes) {
  const buffer = generateIcon(size)
  const path = `./public/icons/icon-${size}.png`
  writeFileSync(path, buffer)
  console.log(`✓ ${path}`)
}

console.log('\n✅ All icons generated!')
console.log('Now run: npm run build')
