import React, { useState } from 'react';
import { MDBCollapse} from 'mdb-react-ui-kit';
import { Button } from 'react-bootstrap';

function HeaderAluno({setExibirForm}) {
  const [openNavExternal] = useState(true); 

  return (
    <>
     <MDBCollapse open={openNavExternal}>
  <div className='bg-dark p-4' style={{ width: '250px', position: 'fixed', top: '0', bottom: '0', left: '0', zIndex: '1' }}>
    <ul style={{ listStyleType: 'none', padding: 0 }}>
      <li style={{ marginLeft: 'auto', marginRight: 'auto', textAlign: 'center' }}>
        <a href="/alunos" className="text-white text-decoration-none h5">Alunos</a>
      </li >
      <li style={{ marginLeft: 'auto', marginRight: 'auto', textAlign: 'center' }}>
        <hr className='text-white' />
      </li>
      <li style={{ marginLeft: 'auto', marginRight: 'auto', textAlign: 'center' }}>
        <h5 className='text-white h6'>Cadastrar</h5>
      </li>
      <li style={{ marginLeft: 'auto', marginRight: 'auto', textAlign: 'center' }}>
        <hr className='text-white' />
      </li>
      <li style={{ marginLeft: 'auto', marginRight: 'auto', textAlign: 'center' }}>
        <Button
          type="button"
          variant="info"
          onClick={() => setExibirForm(false)}
          style={{
            fontSize: '1.25rem', // 
            fontWeight: 'bold', // 
            textDecoration: 'none', //
            color: 'white', // 
            backgroundColor: 'transparent', 
            border: 'none', // 
            padding: '0', 
            cursor: 'pointer', //
            outline: 'none', //
            display: 'block', // 
            width: '100%', // 
          }}
        >
          Consultar
          </Button>
          </li>
          <li>
            <hr className='text-white' />
          </li>
          <li style={{ marginLeft: 'auto', marginRight: 'auto', textAlign: 'center' }}>
            <a href="/" className="text-white text-decoration-none h5">Voltar</a>
          </li>
        </ul>
      </div>
  </MDBCollapse>

    
    </>
  );
}

export default HeaderAluno;
