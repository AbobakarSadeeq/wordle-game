import logo from "./logo.svg";
import "./App.css";
import NavbarComponent from "./components/navbar/navbar";
import "bulma/css/bulma.min.css";
import MainSectionComponent from "./components/main-section/main-section";

import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css";
function App() {
  return (
    <>
      <NavbarComponent />

      <MainSectionComponent />
    </>
  );
}

export default App;