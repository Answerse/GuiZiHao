import sharp from 'sharp'
import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PUBLIC = join(__dirname, '..', 'public')
const IMAGES = join(PUBLIC, 'images')

const results = { success: [], skipped: [], error: [] }
let totalBeforeBytes = 0
let totalAfterBytes = 0

function log(file, before, after) {
  const saved = ((before - after) / before * 100).toFixed(1)
  console.log(`  ${file}: ${(before/1024).toFixed(0)}K → ${(after/1024).toFixed(0)}K (${saved}%)`)
  totalBeforeBytes += before
  totalAfterBytes += after
}

async function convert(filePath, outputPath, options = {}) {
  const { resize, quality = 85 } = options
  const before = readFileSync(filePath).length
  let pipeline = sharp(filePath)
  if (resize) {
    pipeline = pipeline.resize(resize.width, resize.height, { fit: resize.fit || 'cover', withoutEnlargement: true })
  }
  const buffer = await pipeline.webp({ quality }).toBuffer()
  writeFileSync(outputPath, buffer)
  const after = buffer.length
  log(outputPath.replace(IMAGES + '/', ''), before, after)
  results.success.push(outputPath)
}

async function main() {
  // ===== 1. Hero 背景图 — 缩放至 1920×360 =====
  console.log('\n=== Hero 背景图 ===')
  for (const name of ['hero-bg-figma.png', 'hero-bg-2.png', 'hero-bg-3.png']) {
    await convert(join(IMAGES, name), join(IMAGES, name.replace('.png', '.webp')), { resize: { width: 1920, height: 360 } })
  }

  // ===== 2. Coverflow 区域公用品牌 — 缩放至 640×800 =====
  console.log('\n=== Coverflow 区域公用品牌 ===')
  for (let i = 1; i <= 9; i++) {
    await convert(join(IMAGES, `coverflow-${i}.png`), join(IMAGES, `coverflow-${i}.webp`), { resize: { width: 640, height: 800 } })
  }

  // ===== 3. Coverflow 农产品品牌 — 缩放至 640×640 =====
  console.log('\n=== Coverflow 农产品品牌 ===')
  for (let i = 1; i <= 9; i++) {
    await convert(join(IMAGES, `coverflow-brand-${i}.png`), join(IMAGES, `coverflow-brand-${i}.webp`), { resize: { width: 640, height: 640 } })
  }

  // ===== 4. 品牌产品主图 — 缩放至 658×658 =====
  console.log('\n=== 品牌产品主图 ===')
  const brandImages = [
    'brand-baise-mangguo.png', 'brand-fanglin-mati.png', 'brand-gongcheng-yueshi.png',
    'brand-guangxi-liubaocha.png', 'brand-guilin-luohanguo.png', 'brand-guilin-satangju.png',
    'brand-hengxian-molihua.png', 'brand-hengxian-tianyumi.png', 'brand-leye-mihoutao.png',
    'brand-lipu-yu.png', 'brand-liujiang-lianou.png', 'brand-longan-xiangjiao.png',
    'brand-nanning-huolongguo.png', 'brand-pubei-chenpi.png', 'brand-qinbei-lizhi.png',
    'brand-tengxian-fenge.png'
  ]
  for (const name of brandImages) {
    await convert(join(IMAGES, name), join(IMAGES, name.replace('.png', '.webp')), { resize: { width: 658, height: 658 } })
  }

  // ===== 5. 背景图 =====
  console.log('\n=== 背景图 ===')
  await convert(join(IMAGES, 'recommend-bg-520beb.png'), join(IMAGES, 'recommend-bg-520beb.webp'), { resize: { width: 1920, height: 500 } })

  // ===== 6. product-card.png =====
  await convert(join(IMAGES, 'product-card.png'), join(IMAGES, 'product-card.webp'), { resize: { width: 600, height: 600 } })

  // ===== 7. 企业 Logo — 保持尺寸，转 WebP =====
  console.log('\n=== 企业 Logo ===')
  for (let i = 1; i <= 20; i++) {
    await convert(join(IMAGES, 'enterprise', `logo-${i}.png`), join(IMAGES, 'enterprise', `logo-${i}.webp`), { quality: 90 })
  }

  // ===== 8. 品牌产品 Logo — 保持尺寸，转 WebP =====
  console.log('\n=== 品牌产品 Logo ===')
  const brandProductLogos = readdirSync(join(IMAGES, 'brand-product')).filter(f => f.endsWith('.png'))
  for (const name of brandProductLogos) {
    await convert(join(IMAGES, 'brand-product', name), join(IMAGES, 'brand-product', name.replace('.png', '.webp')), { quality: 90 })
  }

  // ===== Summary =====
  const savedMB = ((totalBeforeBytes - totalAfterBytes) / 1024 / 1024).toFixed(1)
  console.log('\n========================================')
  console.log(`转换前: ${(totalBeforeBytes/1024/1024).toFixed(1)} MB`)
  console.log(`转换后: ${(totalAfterBytes/1024/1024).toFixed(1)} MB`)
  console.log(`节省:   ${savedMB} MB (${(savedMB/totalBeforeBytes*1024*1024/1024/1024*100).toFixed(0)}%)`)
  console.log('========================================')
}

main().catch(console.error)
