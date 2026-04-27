import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ThemeProvider } from './theme/ThemeProvider'
import './index.css'
import App from './App.tsx'
import PageDemo from './page/Demo/PageDemo.tsx'
import PageNormal from './page/Nomal/PageNormal.tsx'
import PageCredits from './page/Credits/PageCredits.tsx'
import Layout from './components/Layout/Layout.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/credits',
    element: <PageCredits />,
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
    <ThemeProvider>
      <RouterProvider router={router} />
      <ToastContainer position="bottom-right" autoClose={3000} theme="light" />
    </ThemeProvider>
  </StrictMode>,
)
