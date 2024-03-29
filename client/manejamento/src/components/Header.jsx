import React, { useState } from 'react';
import {
  MDBNavbar,
  MDBContainer,
  MDBNavbarToggler,
  MDBCollapse
} from 'mdb-react-ui-kit';
export default function App() {
  const [openNavExternal, setOpenNavExternal] = useState(false);

  return (
    <>
      <MDBCollapse open={openNavExternal}>
        <div className='bg-dark p-4'>
       <a href="/alunos" className="text-white text-decoration-none h5">Alunos</a>
          <hr className='text-white' />
          <h5 className='text-white h6'>Professores</h5>
          <hr className='text-white' />
          <h5 className='text-white h6'>Materia</h5>
          <hr className='text-white' />
          <a href="/atividades" className="text-white text-decoration-none h5">Atividades</a>
        </div>
      </MDBCollapse>
      <MDBNavbar dark bgColor='dark'>
        <MDBContainer fluid>
          <MDBNavbarToggler
            type='button'
            aria-controls='navbarToggleExternalContent'
            aria-expanded={openNavExternal ? 'true' : 'false'}
            aria-label='Toggle navigation'
            onClick={() => setOpenNavExternal(!openNavExternal)}
          >
            <span className="navbar-toggler-icon"></span>
          </MDBNavbarToggler>
        </MDBContainer>
      </MDBNavbar>
    </>
  );
}
