import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TelaAluno from './components/telas/TelaAluno';
import TelaAtividades from './components/telas/TelaAtividades';
import Pagina from './context/Pagina';
function App() {


  return (
    <>
         <BrowserRouter>
          <Routes>
            {
              
            }
            <Route path="/alunos" element={<TelaAluno />} />
            <Route path="/atividades" element={<TelaAtividades />} />
            <Route path="/" element={<Pagina />} />
            {
             
            }
  
          </Routes>
        </BrowserRouter>
    </>

  )
}

export default App
