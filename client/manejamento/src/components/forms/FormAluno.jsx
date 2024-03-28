import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import { createAluno } from '../../redux/AlunoReducer';
import HeaderAluno from '../HeaderAluno'
import TabAluno from '../tabelas/TabAluno';
export default function FormAluno(){

    

    const alunoVazio = {
      ra:'',
      nome:'',
      senha:'',
      email:''
      }
    const [aluno, setAluno] = useState(alunoVazio);
    const [exibirForm, setExibirForm] = useState(true);
    const dispatch = useDispatch();

    function manipularMudancas(e){
        const componente = e.currentTarget;
        setAluno({...aluno,[componente.name]:componente.value});
    }
    function manipularSubmissao(e){

      e.preventDefault();

      async function submit(){
      try{

          await dispatch(createAluno(aluno)).unwrap();
          alert("Aluno cadastrado com sucesso!");

      }catch(erro){
          alert("ERRO:"+erro);
      }

      }
      
      submit().then(() => {
          setAluno(alunoVazio);
      });   

  }

    return (
            
        <Container>{
      exibirForm ?(
        <div className='card mt-4 mx-auto' style={{ maxWidth: '400px' }}>
          <div className='card-header'>
            <h3>Cadastro de Alunos</h3>
          </div>
          <div className='card-body'>
            <Form noValidate onSubmit={manipularSubmissao}>
              <Row className="mb-3">
              <label htmlFor="">RA</label>
                <Col>
      
                    <Form.Control
                      type="text"
                      id="ra"
                      name="ra"
                      value={aluno.ra}
                      onChange={manipularMudancas}
                      required
                    
                    />
              
                  <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                </Col>
                <Row>
                <Col>
                 <label htmlFor="">Nome</label>
              
                    <Form.Control
                      type="text"
        
                      id="nome"
                      name="nome"
                      value={aluno.nome}
                      onChange={manipularMudancas}
                      required
                    />

                  <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                </Col>
              </Row>
              </Row>
              <Row className="mb-3">
              <label htmlFor="">Email</label>
                <Col>
                    <Form.Control
                      type="email"
                   
                      id="email"
                      name="email"
                      value={aluno.email}
                      onChange={manipularMudancas}
                      required
                    />
          
                  <Form.Control.Feedback type="invalid">Informe um e-mail válido!</Form.Control.Feedback>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                <label htmlFor="">Senha</label>
                
                    <Form.Control
                      type="password"
                     
                      id="senha"
                      name="senha"
                      value={aluno.senha}
                      onChange={manipularMudancas}
                      required
                    />
                 
                  <Form.Control.Feedback type="invalid">Informe a senha!</Form.Control.Feedback>
                  </Col>
              </Row>
          
              <Row>
                <Col className="text-center">
                  <Button type="submit" variant={"primary"}>Cadastrar</Button>
                  
                  
                  <HeaderAluno setExibirForm={setExibirForm}></HeaderAluno>
                  
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      ):(
          <>
          <HeaderAluno setExibirForm={setExibirForm}></HeaderAluno>
           <TabAluno setExibirForm={setExibirForm}/>
          </>
      )
        }
      </Container>
    );
}