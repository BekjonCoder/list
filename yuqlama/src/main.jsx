import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { QueryClient,QueryClientProvider } from '@tanstack/react-query'
const queryClint=new QueryClient()
createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClint}>
        <App />  
  </QueryClientProvider>
)
