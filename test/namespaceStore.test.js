import { expect } from 'chai'
import sinon from 'sinon'
import namespaceStore from '../src/namespaceStore'

const barValue = [{id: 1}]
const fooValue = [{id: 2}]

let store;

describe('namespaceStore', () => {
    beforeEach(() => {
        store = namespaceStore()
    })
    it('should supply setter/getter for a given namespace', () => {
        store.set('bar', barValue)
        expect(store.get('bar')).to.be.equal(barValue)
    })

    it('should return all namespace', () => {
        store.set('foo', fooValue)
        store.set('bar', barValue)
        expect(store.get()).to.be.eql({foo: fooValue, bar: barValue})
    })

    it('should notify any subscriber when state changes', () => {
        const subscriberFn = sinon.spy();
        const unsubscribe = store.subscribe(subscriberFn)
        store.set('foo', fooValue)
        sinon.assert.calledWith(subscriberFn, {foo: fooValue});
        store.set('bar', barValue)
        sinon.assert.calledWith(subscriberFn, {foo: fooValue, bar: barValue});
        unsubscribe()
    })

    it('should unsubscribe any listener', () => {
        const subscriberFn = sinon.spy();
        const unsubscribe = store.subscribe(subscriberFn)
        store.set('foo', {id:4})
        sinon.assert.calledWith(subscriberFn, {foo: {id:4}});
        // unsubscribe. any notifications from now on should not effect the subscribeFn anymore
        unsubscribe()
        store.set('bar', {id:5})
        store.set('bar', {id:6})
        sinon.assert.calledOnce(subscriberFn)
    })
})