import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import TableComponent from './TableComponent';

ReactDOM.render(
  <Provider store={store}>
    <TableComponent />
  </Provider>,
  document.getElementById('root')
);
