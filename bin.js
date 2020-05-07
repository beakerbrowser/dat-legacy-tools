#!/usr/bin/env node

const api = require('.')
const fsp = require('fs').promises

async function run () {
  // validate args
  try {
    await fsp.stat(process.argv[2])
  } catch (e) {
    console.error('Must supply data dir')
    usage()
    process.exit(1)
  }
  if (/[0-9a-f]{64}/i.test(process.argv[3]) !== true) {
    console.error('Must supply key')
    usage()
    process.exit(2)
  }
  try {
    await fsp.stat(process.argv[4])
  } catch (e) {
    console.error('Must supply target dir (create the folder first)')
    usage()
    process.exit(3)
  }

  // run export
  await api.setup({beakerDataDir: process.argv[2]})
  await api.exportFiles(process.argv[3], process.argv[4])
}
run()

function usage () {
  console.log('Usage: bin.js {beaker-data-dir} {key} {export-target-dir}')
}