import logo from "./logo.svg";
import "./App.css";
import NavbarComponent from "./components/navbar/navbar";
import "bulma/css/bulma.min.css";
import MainSectionComponent from "./components/main-section/main-section";

function App() {
  return (
    <>
      <NavbarComponent />

      <MainSectionComponent />
    </>
  );
}

export default App;
