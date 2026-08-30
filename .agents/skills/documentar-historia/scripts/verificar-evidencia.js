#!/usr/bin/env node
/*
 * verificar-evidencia.js
 *
 * Comprueba que cada afirmación marcada como "Observado" en un story.md tenga una captura
 * que exista de verdad en el disco.
 *
 * No opina sobre el contenido: solo confirma que el archivo está. Esa es exactamente la
 * división de trabajo — el modelo escribe lo que observó, el script comprueba que haya foto.
 * Una de las dos cosas se puede inventar; la otra no.
 *
 * Uso:  node verificar-evidencia.js <ruta-al-story.md>
 * Sale con código 1 si falta alguna evidencia.
 */

'use strict';

const fs = require('fs');
const path = require('path');

const EXTENSIONES = /\.(png|jpe?g|webp|gif)$/i;

function salir(mensaje, codigo) {
  console.log(mensaje);
  process.exit(codigo);
}

const objetivo = process.argv[2];
if (!objetivo) {
  salir('Uso: node verificar-evidencia.js <ruta-al-story.md>', 2);
}
if (!fs.existsSync(objetivo)) {
  salir('No existe el archivo: ' + objetivo, 2);
}

const raiz = path.dirname(path.resolve(objetivo));
const lineas = fs.readFileSync(objetivo, 'utf8').split(/\r?\n/);

// Una fila con corchetes sin completar es la plantilla, no una afirmación real.
const esPlantilla = (linea) => /\[[^\]]*\]/.test(linea.replace(/\[[ xX]\]/g, ''));

const sinRuta = [];      // dice "Observado" pero no nombra ninguna captura
const rotas = [];        // nombra una captura que no está en el disco
const referenciadas = new Set();

lineas.forEach((linea, i) => {
  if (!linea.trim().startsWith('|')) return;
  if (esPlantilla(linea)) return;

  const rutas = (linea.match(/`([^`]+)`/g) || [])
    .map((s) => s.slice(1, -1))
    .filter((s) => EXTENSIONES.test(s));

  const declaraObservado = /Observado/.test(linea);

  if (declaraObservado && rutas.length === 0) {
    sinRuta.push({ n: i + 1, texto: linea.trim() });
    return;
  }

  rutas.forEach((r) => {
    const absoluta = path.resolve(raiz, r);
    referenciadas.add(absoluta);
    if (!fs.existsSync(absoluta)) rotas.push({ n: i + 1, ruta: r });
  });
});

// Capturas que están en el disco y que ninguna fila menciona.
const huerfanas = [];
const carpeta = path.join(raiz, 'evidence');
if (fs.existsSync(carpeta)) {
  fs.readdirSync(carpeta)
    .filter((f) => EXTENSIONES.test(f))
    .forEach((f) => {
      const absoluta = path.join(carpeta, f);
      if (!referenciadas.has(absoluta)) huerfanas.push(f);
    });
}

// ---------------------------------------------------------------- informe

const problemas = sinRuta.length + rotas.length;

if (sinRuta.length) {
  console.log('\nAfirmaciones marcadas Observado que no nombran ninguna captura:');
  sinRuta.forEach((p) => console.log('  linea ' + p.n + ': ' + p.texto));
}

if (rotas.length) {
  console.log('\nCapturas nombradas que no existen en el disco:');
  rotas.forEach((p) => console.log('  linea ' + p.n + ': ' + p.ruta));
}

if (huerfanas.length) {
  console.log('\nAviso — capturas en evidence/ que ninguna fila menciona:');
  huerfanas.forEach((f) => console.log('  ' + f));
  console.log('  (No es un error: puede ser material de respaldo. Pero si documenta algo,');
  console.log('   ese algo todavia no esta escrito en el story.md.)');
}

if (problemas === 0) {
  console.log('\nOK — cada afirmacion observada tiene su captura, y cada captura existe.');
  process.exit(0);
}

console.log('\n' + problemas + ' afirmacion(es) observada(s) sin respaldo verificable.');
console.log('Una afirmacion sin captura no se escribe como observada: o se consigue la');
console.log('evidencia, o baja a Hipotesis y genera una pregunta abierta.');
process.exit(1);
