import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import PageDemo from './page/Demo/PageDemo.tsx'
import PageNormal from './page/Nomal/PageNormal.tsx'
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
        element: <PageDemo />,
      },
      {
        path: '/normal',
        element: <PageNormal />,
      },
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
