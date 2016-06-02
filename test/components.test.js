import React from 'react'
import { mount, shallow } from 'enzyme'
import { expect } from 'chai'
import { Card, MarkdownCard } from '../src/components'

describe('Testing React Cards components', () => {
  describe('<Card />', () => {
    it('should display title', () =>  {
      const component = shallow(<Card title='hello' />)
      expect(component.contains('hello')).to.be.true
    })

    it('should display doc', () =>  {
      const component = shallow(<Card doc='some doc' />)
      expect(component.contains('some doc')).to.be.true
    })

    it('should display children content', () =>  {
      const component = shallow(<Card>Some Content</Card>)
      expect(component.contains('Some Content')).to.be.true
    })

    it('should display title doc and child components', () =>  {
      const component = shallow(<Card title='hello' doc="some doc">Some Content</Card>)
      expect(component.contains('hello')).to.be.true
      expect(component.contains('some doc')).to.be.true
      expect(component.contains('Some Content')).to.be.true
    })
  })

  describe('<MarkdownCard />', () => {
    it('should return valid html', () =>  {
      const component = mount(<MarkdownCard>_Some Header_</MarkdownCard>)
      expect(component.html()).to.contain('<em>Some Header</em>')
    })
  })
})
