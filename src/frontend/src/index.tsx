import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './app';

if (process.env.NODE_ENV === 'development') {
    console.log('=========================='); /*tslint:disable-line:no-console*/
    console.log('======== MED MOCK ========'); /*tslint:disable-line:no-console*/
    console.log('=========================='); /*tslint:disable-line:no-console*/
    require('./mocks');
}

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
