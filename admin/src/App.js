import { productInput, userInput } from "./formSource.js";
import HomePageAdmin from "./pages/homeAdmin/HomePageAdmin.js";
import ListAdmin from "./pages/listAdmin/ListAdmin.js";
import CreatePage from "./pages/newAdmin/NewAdmin.js";
import SingleAdmin from "./pages/singleAdmin/SingleAdmin.js";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<HomePageAdmin />} />
          </Route>
          <Route path="users">
            <Route index element={<ListAdmin />} />
            <Route path=":userId" element={<SingleAdmin />} />
            <Route
              path="new"
              element={<CreatePage input={userInput} title="Add New User" />}
            />
          </Route>
          <Route path="products">
            <Route index element={<ListAdmin />} />
            <Route path=":productId" element={<SingleAdmin />} />
            <Route
              path="new"
              element={
                <CreatePage input={productInput} title="Add New Product" />
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
