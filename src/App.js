// COMPONENTS
import { Carico } from "./components/Carico";
import { Scarico } from "./components/Scarico";
import { Content } from "./components/Content";
import { Footer } from "./components/Footer";
import { Title } from "./components/Title";

function App() {
  return (
    <div className="container">
      <div className="content">
        <Title />
        <Content />
        <Carico />
        <Scarico />
      </div>
      <Footer />
    </div>
  );
}

export default App;

//********************
/* TODO: 
/* add button new CER  
**********************/
