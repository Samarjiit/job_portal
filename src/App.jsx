import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { ThemeProvider } from "./components/theme-provider"
import "./App.css"

//import { Button } from "./components/ui/button"
import AppLayout from "./layouts/app-layout"
import LandingPage from "./pages/landing-page"
import OnBoarding from "./pages/onboarding"
import JobListing from "./pages/job-listing"
import PostJob from "./pages/post-job"
import SavedJob from "./pages/saved-job"
import MyJob from "./pages/my-job"
import JobPage from "./pages/job"
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/onboarding",
        element: <OnBoarding />,
      },
      {
        path: "/jobs",
        element: <JobListing />,
      },
      {
        path: "/job/:id",
        element: <JobPage />,
      },
      {
        path: "/post-job",
        element: <PostJob />,
      },
      {
        path: "/saved-jobs",
        element: <SavedJob />,
      },
      {
        path: "/my-jobs",
        element: <MyJob />,
      },
    ],
  },
])
function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
