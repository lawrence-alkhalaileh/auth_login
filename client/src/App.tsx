import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Username,
  Password,
  Register,
  Profile,
  Recovery,
  Reset,
  PageNotFound,
} from "./components";
import { Toaster } from "react-hot-toast";
import { AuthorizeUser, ProtectedRoute } from "./middleware/auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Username />,
    errorElement: <PageNotFound />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/password",
    element: (
      <ProtectedRoute>
        <Password />
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <AuthorizeUser>
        <Profile />
      </AuthorizeUser>
    ),
  },
  {
    path: "/recovery",
    element: <Recovery />,
  },
  {
    path: "/reset",
    element: <Reset />,
  },
]);

function App() {
  return (
    <main>
      <Toaster position="top-center"></Toaster>
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
