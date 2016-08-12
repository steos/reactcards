import { run } from '../dist/client.bundle'
import './cards'

if (module.hot) {
  module.hot.accept()
}

run()
