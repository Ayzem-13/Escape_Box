import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import DemoMode from './page/Demo/DemoMode.tsx'
import Normal from './page/Nomal/normal.tsx'
import Layout from './components/Layout/Layout.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    element: <Layout />,
    children: [
      {
        path: '/demo',
        element: <DemoMode />,
      },
      {
        path: '/normal',
        element: <Normal />,
      },
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
