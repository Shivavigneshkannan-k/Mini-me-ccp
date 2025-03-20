import { createBrowserRouter, RouterProvider } from "react-router-dom";
import InputPage from "./Components/InputPage";
import Practice  from "./Components/Practice"; // Import Practice Page
import Body from "./Components/Body";
import Notes from "./Components/Notes";
import appStore from "./utils/appStore";
import { Provider } from "react-redux";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      { path: "/", element: <InputPage /> },
      { path: "/notes", element: <Notes /> },
      { path: "/practice", element: <Practice /> },  // Added Practice Page Route
    ]
  }
]);

function App() {
  return (
    <div className='h-lvh'>
      <Provider store={appStore}>
        <RouterProvider router={routes} />
      </Provider>
    </div>
  );
}

export default App;
