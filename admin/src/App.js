import HomePageAdmin from "./pages/homeAdmin/HomePageAdmin.js";
import ListAdmin from "./pages/listAdmin/ListAdmin.js";
import NewAdmin from "./pages/newAdmin/NewAdmin.js";
import SingleAdmin from "./pages/singleAdmin/SingleAdmin.js";


function App() {
  return <div className="App">
    <HomePageAdmin />
    <ListAdmin />
    <SingleAdmin />
    <NewAdmin />

  </div>;
}

export default App;
