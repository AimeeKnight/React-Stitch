import React from 'react'; // eslint-disable-line no-unused-vars
import ReactDOM from 'react-dom';
import './index.css';
import LightboxContainer from './lightboxContainer/LightboxContainer'; // eslint-disable-line no-unused-vars
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<LightboxContainer />, document.getElementById('root'));
registerServiceWorker();
