import { createBrowserRouter, RouterProvider } from "react-router-dom";
import InputPage from "./Components/InputPage";
import Practice  from "./Components/Practice"; // Import Practice Page
import PdfInput  from "./Components/pdfInput"; // Import Practice Page
import Body from "./Components/Body";
import Notes from "./Components/Notes";
import PracticePdf from "./Components/PracticePdt";
import appStore from "./utils/appStore";
import { Provider } from "react-redux";
import PdfNotes from "./Components/PdfNote";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      { path: "/", element: <InputPage /> },
      { path: "/notes", element: <PdfNotes /> },
      { path: "/practice", element: <PracticePdf /> },  // Added Practice Page Route
      { path: "/pdf", element: <PdfInput /> },  // Added Practice Page Route
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
