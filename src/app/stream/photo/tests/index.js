import React from 'react'
import { mount } from 'enzyme'
import expect from 'expect'
import { sandbox } from 'sinon'

import * as utils from '../../../../libs/utils'
import Photo from '../index.jsx'

describe('<Photo />', () => {
  let testSandBox = null

  const props = {
    photo: {
      id: 1,
      title: 'dummyTitle',
      images: {
        normal: 'image.png',
        hidpi: 'image@2x.png'
      },
      user: {
        name: 'dummyName'
      }
    }
  }

  beforeEach(() => {
    testSandBox = sandbox.create()
  })

  afterEach(() => {
    testSandBox.restore()
  })

  it('should display all elements', () => {
    const loader = mount(<Photo {...props} />)
    expect(loader.find('.title').text()).toBe('dummyTitle')
    expect(loader.find('.separator').exists()).toBe(true)
    expect(loader.find('.author').text()).toBe('dummyName')
    expect(loader.find('.photo').prop('style')).toBeFalsy()
    expect(loader.find('button').text()).toBe('Favorite')
  })

  it('should trigger onSave callback', done => {
    const onSave = (id) => {
      expect(id).toBe(1)
      done()
    }
    const loader = mount(<Photo {...props} onSave={onSave} />)
    loader.find('button').simulate('click')
  })

  it('should trigger onDrop callback', done => {
    const onDrop = (id) => {
      expect(id).toBe(1)
      done()
    }
    const loader = mount(<Photo {...props} onDrop={onDrop} saved={true} />)
    loader.find('button').simulate('click')
  })

  it('should display normal image', () => {
    const loader = mount(<Photo {...props} visible={true} />)
    loader.setState({ loaded: true })
    expect(loader.find('.photo').prop('style').backgroundImage).toBe("url('image.png')")
  })

  it('should display hidpi image', () => {
    testSandBox.stub(utils, 'isHidpiScreen').returns(true)
    const loader = mount(<Photo {...props} visible={true} />)
    loader.setState({ loaded: true })
    expect(loader.find('.photo').prop('style').backgroundImage).toBe("url('image@2x.png')")
  })
})
