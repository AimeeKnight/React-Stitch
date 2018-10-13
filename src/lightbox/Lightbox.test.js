import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react'; // eslint-disable-line no-unused-vars
import Lightbox from './Lightbox'; // eslint-disable-line no-unused-vars

configure({ adapter: new Adapter() });

it('does not render by default', () => {
  const wrapper = shallow((
    <Lightbox
      onClose={() => {}}>
    </Lightbox>
  ));

  expect(wrapper.find('.overlay')).toHaveLength(0);
});

it('renders an overlay with close button', () => {
  const wrapper = shallow((
    <Lightbox
      onClose={() => {}}
      show={true}>
    </Lightbox>
  ));

  expect(wrapper.find('.close-button')).toHaveLength(1);
  expect(wrapper.find('.overlay')).toHaveLength(1);
});

it('renders children when passed in', () => {
  const wrapper = shallow((
    <Lightbox
      onClose={() => {}}
      show={true}>
      <p className="content" />
    </Lightbox>
  ));

  expect(wrapper.contains(<p className="content" />)).toEqual(true);
});

it('closes the lightbox when the close button is clicked', () => {
  const spy = jest.fn();
  const wrapper = shallow((
    <Lightbox
      onClose={spy}
      show={true}>
    </Lightbox>
  ));
  const closeButton = wrapper.find('.close-button');

  closeButton.simulate('click');

  expect(spy).toHaveBeenCalled();
});

it('closes the lightbox when escape is clicked', () => {
  const spy = jest.fn();
  const wrapper = shallow((
    <Lightbox
      onClose={spy}
      show={true}>
    </Lightbox>
  ));
  const overlay = wrapper.find('.overlay');

  overlay.simulate('keyUp', { keyCode: 27 });

  expect(spy).toHaveBeenCalled();
});

it('does not close the lightbox when enter is clicked', () => {
  const spy = jest.fn();
  const wrapper = shallow((
    <Lightbox
      onClose={spy}
      show={true}>
    </Lightbox>
  ));
  const overlay = wrapper.find('.overlay');

  overlay.simulate('keyUp', { keyCode: 23 });

  expect(spy).not.toHaveBeenCalled();
});

it('closes the lightbox when clicking the overlay', () => {
  const spy = jest.fn();
  const wrapper = mount((
    <Lightbox
      onClose={spy}
      show={true}>
    </Lightbox>
  ));
  const mockedEvent = { target: {} };
  const overlay = wrapper.find('.overlay');

  wrapper.instance().overlay.contains = () => { return true; };
  overlay.simulate('click', mockedEvent);

  expect(spy).toHaveBeenCalled();
});

it('does not close the lightbox when clicking the lightbox', () => {
  const spy = jest.fn();
  const wrapper = mount((
    <Lightbox
      onClose={spy}
      show={true}>
    </Lightbox>
  ));
  const mockedEvent = { target: {} };
  const overlay = wrapper.find('.lightbox');

  wrapper.instance().lightbox.contains = () => { return true; };
  overlay.simulate('click', mockedEvent);

  expect(spy).not.toHaveBeenCalled();
});
