
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import AppLayout from "./layouts/AppLayout"
import LandingPage from "./pages/LandingPage"
import Auth from "./pages/Auth"
import Dashboard from "./pages/Dashboard"
import RedirectLink from "./pages/RedirectLink"
import LinkPage from "./pages/LinkPage"
import UrlProvider from "./context"
import RequireAuth from "./components/require-auth"
const router = createBrowserRouter([
  {
    element:<AppLayout></AppLayout>,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/auth",
        element: <Auth />,
      },
      {
        path: "/dashboard",
        element: (
         <RequireAuth>
                 <Dashboard />
         </RequireAuth>
           
          

        ),
      },
      {
        path: "/link/:id",
        element: (
         <RequireAuth>
            <LinkPage></LinkPage>
          </RequireAuth>
        ),
      },
      {
        path: "/:id",
        element: <RedirectLink />,
      },
    ],
  }
])
function App() {


  return <UrlProvider>
            <RouterProvider router={router}></RouterProvider>
        </UrlProvider>
   
}

export default App
