const path = require('path')
const fsp = require('fs').promises
const rimraf = require('rimraf')
const api = require('.')

const TEST_DATA_PATH = path.join(__dirname, 'test-data')
const TEST_EXPORT_PATH = path.join(__dirname, 'test-export')
const TEST_KEY = '88c835ba8b03a71eb5f27843331e28f2004884347412a1956a339355a6affb29'

async function run () {
  console.log('Resetting test export folder', TEST_EXPORT_PATH)
  rimraf.sync(TEST_EXPORT_PATH)
  await fsp.mkdir(TEST_EXPORT_PATH)
  console.log('Setting up at', TEST_DATA_PATH)
  await api.setup({beakerDataDir: TEST_DATA_PATH})
  console.log('Syncing', TEST_KEY)
  await api.exportFiles(TEST_KEY, TEST_EXPORT_PATH)
  console.log('Done')
  process.exit(0)

}
run()