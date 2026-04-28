import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '@fontsource/cinzel/500.css'
import '@fontsource/cinzel/700.css'
import '@fontsource/im-fell-english-sc/400.css'
import '@fontsource/share-tech-mono/400.css'
import { ThemeProvider } from './theme/ThemeProvider'
import volumeManager from './services/volumeManager'
import './index.css'
import App from './App.tsx'
import PageDemo from './page/Demo/PageDemo.tsx'
import PageNormal from './page/Nomal/PageNormal.tsx'
import PageCredits from './page/Credits/PageCredits.tsx'
import PageTutos from './page/Tutos/PageTutos.tsx'
import Layout from './components/Layout/Layout.tsx'

// Initialize volume manager
volumeManager;

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/credits',
    element: <PageCredits />,
  },
  {
    path: '/tutos',
    element: <PageTutos />,
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
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        theme="dark"
        toastClassName="escape-toast"
      />
    </ThemeProvider>
  </StrictMode>,
)
