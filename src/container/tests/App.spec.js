import React from 'react';
import ReactDOM from 'react-dom';
import { observable } from 'mobx';

import App from '../App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App store={observable({})} />, div);
});
