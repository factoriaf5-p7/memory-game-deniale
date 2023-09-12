import { createBrowserRouter  } from "react-router-dom";
import { Game } from "../pages/Game";
import { Landing } from "../pages/Landing";
import NotFound from "../components/NotFound";

export const router = createBrowserRouter([
    { path: "/",
      
     element: <Landing />,
     errorElement: <NotFound />,
    },
    { path: "/game",
      
     element: <Game />,
    },
  ]);
