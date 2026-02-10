import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import MainLayout from './layouts/MainLayout.jsx'
import UserDetails from './components/UserDetails.jsx'
import UpdateUser from './components/UpdateUser.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <App />
      },
      {
        path: 'users/:id',
        loader: ({ params }) => fetch(`http://localhost:5000/users/${params.id}`),
        element: <UserDetails />
      },
      {
        path: 'update/:id',
        loader: ({ params }) => fetch(`http://localhost:5000/users/${params.id}`),
        element: <UpdateUser />
      },
      {
        path:'/about',
        element: <h2 className='w-11/12 mx-auto flex justify-center mt-40 text-4xl uppercase'>about section didn't added</h2>
      }
    ]
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
