import forEach from 'lodash/forEach'
import isArray from 'lodash/isArray'

/**
 *
 * Calls all reactcards Component tests for mocha/jasmine cli tests
 *
 * resolveTests calls all component tests instead of having to manually execute all of them
 *
 * Import all Component tests and resolveTests will run all functions.
 *
 *
 *     import resolveTests from '../../src/utils/resolveTests'
 *     import * as advanced from './advanced'
 *
 *     resolveTests([advanced])
 *
 *
 * @param {Array} testComponents
 * @returns {boolean}
 */
const resolveTests = testComponents => {
    if (!isArray(testComponents)) {
        return false
    }
    forEach(testComponents, testComponent => forEach(testComponent, fn => fn()))
}

export default resolveTests
