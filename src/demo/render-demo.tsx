import * as ReactDOM from 'react-dom';
import DemoDashboard from './demo-dashboard';

const Demo = () => <DemoDashboard />;

ReactDOM.render(<Demo />, document.getElementById('demo') as HTMLElement);
