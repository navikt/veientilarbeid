import 'core-js';
import 'intersection-observer';
import * as ReactDOM from 'react-dom';
import App from './main';
import DemoDashboard from './demo/demo-dashboard';
import './index.css';

import { mock_worker } from './mocks/browser';
import { demo_worker } from './mocks/browser';
import { erDemo } from './utils/app-state-utils';

function startDev() {
    console.log('==========================');
    console.log('======= DEVELOPMENT ======');
    console.log('==========================');

    mock_worker.start();
    ReactDOM.render(<App />, document.getElementById('maincontent') as HTMLElement);
}

function startDemo() {
    console.log('==========================');
    console.log('======= DEMO ======');
    console.log('==========================');

    demo_worker.start();
    ReactDOM.render(<DemoDashboard />, document.getElementById('demo') as HTMLElement);
    ReactDOM.render(<App />, document.getElementById('maincontent') as HTMLElement);
}

if (erDemo()) {
    startDemo();
} else {
    startDev();
}
