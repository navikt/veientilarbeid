import 'core-js';
import 'intersection-observer';
import { createRoot } from 'react-dom/client';
import App from './main-standard';
import DemoDashboard from './demo/demo-dashboard';
import './index.css';

import { mock_worker } from './mocks/browser';
import { demo_worker } from './mocks/browser';
import { erDemo } from './utils/app-state-utils';

const root = createRoot(document.getElementById('maincontent') as HTMLElement);

function startDev() {
    console.log('==========================');
    console.log('======= DEVELOPMENT ======');
    console.log('==========================');

    mock_worker.start();
    root.render(<App />);
}

function startDemo() {
    console.log('==========================');
    console.log('======= DEMO ======');
    console.log('==========================');

    const demo = createRoot(document.getElementById('demo') as HTMLElement);

    demo_worker.start();
    demo.render(<DemoDashboard />);
    root.render(<App />);
}

if (erDemo()) {
    startDemo();
} else {
    startDev();
}
