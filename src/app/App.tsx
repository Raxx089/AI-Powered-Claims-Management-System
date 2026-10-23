import { RouterProvider } from "react-router";
import { router } from "./routes";
import { initStyleMode } from "./styleMode";

initStyleMode();

export default function App() {
  return <RouterProvider router={router} />;
}
