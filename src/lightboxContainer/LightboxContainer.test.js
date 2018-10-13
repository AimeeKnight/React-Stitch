import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react'; // eslint-disable-line no-unused-vars
import LightboxContainer from './LightboxContainer'; // eslint-disable-line no-unused-vars

configure({ adapter: new Adapter() });

const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

beforeEach(() => {
  const fetchPromise = Promise.resolve({
    json: () => Promise.resolve({ title: `Dogs`, body: 'Cats' })
  });

  global.fetch = () => fetchPromise;
});

it('renders a lighbox container with open button', () => {
  const wrapper = mount(<LightboxContainer />);

  expect(wrapper.state().isLoaded).toEqual(false);

  wrapper.setState({ isLoaded: true });

  expect(wrapper.find('.lightbox-container')).toHaveLength(1);
  expect(wrapper.text()).toEqual('Show Post ❯');
});

test(`it renders async data`, async () => {
  const wrapper = mount(<LightboxContainer />);

  await wrapper.instance().componentDidMount();
  await sleep(3000);
  wrapper.setState({ isLoaded: true });

  const button = wrapper.find('.open-button');
  button.simulate('click');

  wrapper.update();
  expect(wrapper.text()).toContain(`DogsCats`);
});

it('renders a lighbox loading container', () => {
  const wrapper = mount(<LightboxContainer />);

  expect(wrapper.state().isLoaded).toEqual(false);

  wrapper.setState({ isLoaded: false });

  expect(wrapper.find('.lightbox-container')).toHaveLength(1);
  expect(wrapper.text()).toEqual('Loading...');
});

it('renders a lighbox error container', () => {
  const wrapper = mount(<LightboxContainer />);

  expect(wrapper.state().isLoaded).toEqual(false);

  wrapper.setState({ isLoaded: true, error: { message: 'cats' } });

  expect(wrapper.find('.lightbox-container')).toHaveLength(1);
  expect(wrapper.text()).toEqual('Error: cats');
});

it('renders lightbox children', () => {
  const wrapper = mount(<LightboxContainer />);

  expect(wrapper.state().isLoaded).toEqual(false);

  wrapper.setState({ isLoaded: true });

  const button = wrapper.find('.open-button');
  button.simulate('click');

  expect(wrapper.find('h2')).toHaveLength(1);
  expect(wrapper.find('p')).toHaveLength(1);
});

it('toggles isOpen state', () => {
  const wrapper = shallow(<LightboxContainer />);

  wrapper.setState({ isLoaded: true });

  const button = wrapper.find('.open-button');

  button.simulate('click');
  expect(wrapper.state().isOpen).toEqual(true);

  button.simulate('click');
  expect(wrapper.state().isOpen).toEqual(false);
});
