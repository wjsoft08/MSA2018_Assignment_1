import * as React from 'react';
import * as ReactDOM from 'react-dom';
import CryptoPrice from './CryptoPrice';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CryptoPrice />, div);
  ReactDOM.unmountComponentAtNode(div);
});