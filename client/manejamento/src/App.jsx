import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TelaAluno from './components/telas/TelaAluno';
import TelaAtividades from './components/telas/TelaAtividades';
import Pagina from './context/Pagina';
import { Provider } from "react-redux";
import store from "./redux/store";
import TelaMateria from './components/telas/TelaMateria';
import TelaNota from "./components/telas/TelaNota";

function App() {


  return (
    <>
    <Provider store={store}>
         <BrowserRouter>
          <Routes>
            {
              
            }
            <Route path="/alunos" element={<TelaAluno />} />
            <Route path="/atividades" element={<TelaAtividades />} />
            <Route path="/materias" element={<TelaMateria />} />
            <Route path="/notas" element={<TelaNota />} />
            <Route path="/" element={<Pagina />} />
            {
             
            }
  
          </Routes>
        </BrowserRouter>
      </Provider>
    </>

  )
}

export default App
