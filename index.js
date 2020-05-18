const path = require('path')
const hyperdrive = require('hyperdrive')
const datStorage = require('./dat-storage')
const pda = require('pauls-dat-api')
const dft = require('diff-file-tree')

var BASE_PATH = undefined

exports.setup = async function ({beakerDataDir}) {
  BASE_PATH = beakerDataDir
  await datStorage.setup()
}

exports.exportFiles = async function (key, targetPath) {
  var archive = await loadArchive(key)
  var diff = await dft.diff({fs: archive, name: '/'}, targetPath)
  await dft.applyRight({fs: archive, name: '/'}, targetPath, diff)
  return pda.readdir(archive, '/', {recursive: true})
}

function getArchiveMetaPath (key) {
  return path.join(BASE_PATH, 'Dat', 'Archives', 'Meta', key.slice(0, 2), key.slice(2))
}

async function loadArchive (key) {
  var metaPath = getArchiveMetaPath(key)
  var archive = hyperdrive(datStorage.create(metaPath), Buffer.from(key, 'hex'), {sparse: true})
  archive.on('error', err => {
    throw err
  })
  await new Promise((resolve, reject) => {
    archive.ready(err => {
      if (err) reject(err)
      else resolve()
    })
  })
  return archive
}