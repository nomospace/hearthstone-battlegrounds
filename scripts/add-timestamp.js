#!/usr/bin/env node
/**
 * 给 index.html 中的静态资源添加时间戳
 * 避免浏览器缓存问题
 * 
 * 用法: node add-timestamp.js [html文件路径]
 * 默认: index.html
 */

const fs = require('fs');
const path = require('path');

const timestamp = Date.now();
const htmlFile = process.argv[2] || 'index.html';
const htmlPath = path.resolve(htmlFile);

if (!fs.existsSync(htmlPath)) {
  console.error(`❌ 文件不存在: ${htmlPath}`);
  process.exit(1);
}

let html = fs.readFileSync(htmlPath, 'utf8');

// 给 JS 文件加时间戳
html = html.replace(/(\.js)(\?v=\d+)?"/g, `$1?v=${timestamp}"`);

// 给 CSS 文件加时间戳
html = html.replace(/(\.css)(\?v=\d+)?"/g, `$1?v=${timestamp}"`);

fs.writeFileSync(htmlPath, html);

console.log(`✅ 已添加时间戳: v=${timestamp}`);
console.log(`📄 文件: ${htmlPath}`);