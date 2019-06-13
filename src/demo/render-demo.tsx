import * as ReactDOM from 'react-dom';
import DemoDashboard from './demo-dashboard';
import * as React from 'react';

const Demo = () => (
    <DemoDashboard/>
);

ReactDOM.render(
    <Demo/>,
    document.getElementById('demo') as HTMLElement
);
