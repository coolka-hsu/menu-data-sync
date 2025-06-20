import fetch from 'node-fetch';
import Papa from 'papaparse';
import fs from 'fs';

const sheetID = '1ceuK16Uey6VDn1_KzlcO7JFFN44ODdfYheiGanWpuao';
const gid = '0';
const url = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?tqx=out:csv&gid=${gid}`;

const response = await fetch(url);
const csv = await response.text();

const parsed = Papa.parse(csv, { header: true });
const cleaned = parsed.data
  .filter(row => row.level1 && row.name && row.url)
  .map(row => ({
    level1: row.level1.trim(),
    level2: row.level2?.trim() || '',
    level3: row.level3?.trim() || '',
    name: row.name.trim(),
    url: row.url.trim()
  }));

fs.writeFileSync('menu.json', JSON.stringify(cleaned, null, 2));
console.log('✅ menu.json updated');