import { setupWorker } from 'msw'
import { handlers } from './handlers'
import { demo_handlers } from '../demo/setup-demo-mock'

export const mock_worker = setupWorker(...handlers)
export const demo_worker = setupWorker(...demo_handlers)
