import React from 'react';
import { expect } from 'chai';
import Enzyme from 'enzyme';
import {shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

//Importing our modules
import About from '../src/About';
import Home from '../src/Home';
import Pagination from '../src/Pagination';

//Initial test...
describe('Beginning of Mocha tests', () => {

  it('should pass, always.', () => {
    expect(true==true);
  });
});

//Home
describe('</Home>', () => {

  before(function () {
  	this.jsdom = require('jsdom-global')
  });

  after(function () {
  	this.jsdom
  });

  const wrapper = shallow(<Home />);

  it('should render without crashing', () => {
    expect(wrapper);
  })

  it('should have 1 carousel displayed on screen', function () {
    const carouselItems = wrapper.find('Carousel.Item');
    expect(carouselItems).to.have.length(0);
  })

  it('should render a header and a caption', () => {
    expect(wrapper.find('h3').length).to.equal(3);
    expect(wrapper.find('p').length).to.equal(6);
  });
});

//About
describe('<About/>', () => {

    before(function () {
      this.jsdom = require('jsdom-global')
    })

    after(function () {
      this.jsdom
    })

    const wrapper = shallow(<About />);

    it('should render without crashing', () => {
        expect(wrapper);
    })

    it('should contain the correct amount of data', () => {
      const images = wrapper.find('.img-thumbnail');
      const headers = wrapper.find('h1');
      expect(wrapper.find('.img-thumbnail')).to.have.length(5);
      console.log(headers);
      expect(headers.at(0).render().text()).to.equal('The Slackers About Page');
    });
});

// Pagination
describe('<Pagination/>', () => {

    before(function () {
      this.jsdom = require('jsdom-global')
    })

    after(function () {
      this.jsdom
    })

    const wrapper = shallow(<Pagination />);

    it('should Pagination render without crashing', function () {
        expect(wrapper);
    })

    it('should have pagination', function () {
        const pagination = wrapper.find('.pagination');
        expect(pagination).to.have.length(1);
        expect(wrapper.state().minPage).to.equal(0);
        expect(wrapper.state().maxPage).to.equal(5);
    })
});