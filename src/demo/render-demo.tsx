import { createRoot } from 'react-dom/client';
import DemoDashboard from './demo-dashboard';

const Demo = () => <DemoDashboard />;
const root = createRoot(document.getElementById('demo') as HTMLElement);
root.render(<Demo />);
