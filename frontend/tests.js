// import React, {Component} from 'react'
// import {Carousel, Container, Slide} from 'react-bootstrap'
// import { shallow, mount } from 'enzyme';
// import { expect } from 'chai';


// import App from './src/App';
// import About from './src/About'
// import Home from './src/Home'
// import Header from './src/Header'
// import Criminals from './src/Criminals'
// import Crimes from './src/Crimes'
// import States from './src/States'
// import {Route, Switch, withRouter, BrowserRouter } from 'react-router-dom'
// import ModelOverlay from './src/ModelOverlay'
// import Pagination from './src/Pagination'


// App
describe('<App/>', function () {
    it('should render without crashing', function () {
        shallow(<App />);
    });
});

// Main 
describe('<Main/>', function () {
    it('should render without crashing', function () {
        shallow(<Main />);
    });
});

// SearchResults 
describe('<SearchResults/>', function () {
    it('should render without crashing', function () {
        shallow(<SearchResults />);
    });
});

// Header
describe('<Header/>', function () {
    it('should render without crashing', function () {
        shallow(<Header />);
    });
    it('should have a brand named On The Run', function () {
        const wrapper = shallow(<Header />);
        expect(wrapper.find('Navbar.Brand').render().text()).to.equal('On The Run');
    });

    it('should have 4 items: About, Criminals, States, and Crimes', function () {
        const wrapper = shallow(<Header />);
        const navItems = wrapper.find('NavItem');
        expect(navItems).to.have.length(4);
        expect(navItems.at(0).render().text()).to.equal('Criminals');
        expect(navItems.at(1).render().text()).to.equal('States');
        expect(navItems.at(2).render().text()).to.equal('Crime');
        expect(navItems.at(3).render().text()).to.equal('About');
    });

    it('should have a search box', function () {
        const wrapper = shallow(<Header />);
        const searchItems = wrapper.find('Search');
        expect(wrapper.find('Search'));
    });
});

// Criminals
describe('<Criminals/>', function () {
  it('should render without crashing', function () {
    shallow(<Criminals />);
  })

  describe('<Criminal/>', function () {
    it('should render without crasing', function () {
      shallow(<Criminal />);
    })

    it('should contain the correct amount of data', function () {
      const wrapper = shallow(<Criminal />);
      const googleMaps = wrapper.find('GoogleMapReact');
      const table = wrapper.find('.table');
      const imageItem = wrapper.find('.img-thumbnail');
      expect(googleMaps.to.have.length(1));
      expect(table.to.have.length(2));
      expect(imageItem.to.have.length(1));
      expect(wrapper.state().item).to.be.defined;
      expect(wrapper.props().location).to.be.defined;
    })

});

//Crimes 
describe('<Crimes/>', function () {
    it('should render without crashing', function () {
        shallow(<Crimes />);
    })

    describe('<Crime />', function () {
      it('should render without crashing', function () {
        const wrapper = shallow(<Crime />);
      })

    it('should contain the correct amount of data', function () {
      const wrapper = shallow(<Crime />);
      const googleMaps = wrapper.find('GoogleMapReact');
      const table = wrapper.find('.table');
      const tableItems = wrapper.find('tr');
      const imageItem = wrapper.find('.img-thumbnail');
      expect(googleMaps.to.have.length(1));
      expect(table.to.have.length(1));
      expect(tableItems.to.have.length(9));
      expect(imageItem.to.have.length(1));
      expect(wrapper.state().item).to.be.defined;
      expect(wrapper.props().location).to.be.defined;
    })

});

// States
describe('<States/>', function () {
    it('should render without crashing', function () {
        shallow(<States />);
    })

    describe('<State />', function () {
        it('should render without crashing', function () {
            const wrapper = shallow(<State />).render()
        })

        it('should contain correct amount of data', function () {
            const wrapper = shallow(<State />);
            const googleMaps = wrapper.find('GoogleMapReact');
            const tableItems = wrapper.find('.table');
            const imageItem = wrapper.find('.img-thumbnail');
            expect(googleMaps.to.have.length(1));
            expect(table.to.have.length(3));
            expect(imageItem.to.have.length(1));
            expect(wrapper.state().item).to.be.defined;
            expect(wrapper.props().location).to.be.defined;
        })
    });
});

// Home
describe('<Home/>', function () {
    it('should render without crashing', function () {
        shallow(<Home />);
    })

    it('should have 4 items: Albums, Artists, Movies and TV, and Making Connections', function () {
        const wrapper = shallow(<Home />);
        const carouselItems = wrapper.find('Carousel.Item');
        expect(carouselItems).to.have.length(3);
        expect(carouselItems.at(0).render().src().to.equal('http://getwallpapers.com/wallpaper/full/5/c/9/89804.jpg');
        expect(carouselItems.at(1).render().src().to.equal('https://cdn01.theintercept.com/wp-uploads/sites/1/2017/12/fbi-peter-maass-reality-winner-2-1513811184-article-header.jpg');
        expect(carouselItems.at(2).render().src().to.equal('https://theintercept.imgix.net/wp-uploads/sites/1/2017/12/fbi-interrogation-1513811579.jpg?auto=compress%2Cformat&q=90&w=1024&h=683');  
    })

    it('should render a header and a caption', () => {
      const wrapper = shallow(<Home />);
      expect(wrapper.find('h3').length).to.equal(1);
      expect(wrapper.find('p').length).to.equal(1);
    });
});


// ModelOverlay
describe('<ModelOverlay/>', function () {
    it('should ModelOverlay render without crashing', function () {
      shallow(<ModelOverlay />);
    })

    it('should have state item', function () {
      const wrapper = shallow(<ModelOverlay />);
      expect(wrapper.state().item).to.be.defined;
    });

});

// Pagination
describe('<Pagination/>', function () {
    it('should Pagination render without crashing', function () {
        shallow(<Pagination />);
    })
    it('should have pagination', function () {
        const wrapper = shallow(<Pagination />).render();
        const pagination = wrapper.find('.pagination');
        expect(pagination.to.have.length(1));
        expect(wrapper.state().minPage).to.be.defined;
        expect(wrapper.state().maxPage).to.be.defined;
    })
});

//About
describe('<About/>', function () {
    it('should About render without crashing', function () {
        shallow(<About />).render();
    });

    it('should contain the correct amount of data', function () {
      const wrapper = shallow(<About />);
      const images = wrapper.find('.img-thumbnail');
      const headers = wrapper.find('h1');
      expect(images.to.have.length(5));
      expect(headers.at(0).render().text().to.equal('The Slackers About page');
    });

});
