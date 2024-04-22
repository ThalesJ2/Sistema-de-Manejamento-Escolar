import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import { createAluno, updateAluno } from '../../redux/AlunoReducer';
import HeaderAluno from '../HeaderAluno';
import TabAluno from '../tabelas/TabAluno';

export default function FormAluno() {
  const alunoVazio = {
    ra: '',
    nome: '',
    senha: '',
    email: '',
  };
  const [aluno, setAluno] = useState(alunoVazio);
  const [textoBotao, setTextoBotao] = useState('Cadastrar');
  const [title, setTitle] = useState('Cadastro de Alunos');
  const [exibirForm, setExibirForm] = useState(true);
  const dispatch = useDispatch();

  function EditarAluno(aluno) {
    const editAluno = {
      ra: aluno.ra,
      nome: aluno.nome,
      senha: aluno.senha,
      email: aluno.email,
    };
    setTitle('Atualizar Aluno');
    setTextoBotao('Atualizar');
    setAluno(editAluno);
  }

  function isNumeric(str){
    if (typeof str !== 'string') return false;
    return !isNaN(str) && !isNaN(parseFloat(str));
  }
  function containsOnlyLetters(str) {
    return /^[a-zA-Z\s]*$/.test(str);
  }
  function isValidEmail(email) {
    // Expressão regular para validar um email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function manipularMudancas(e) {
    const { name, value,email } = e.target;
    if (name === 'ra' && !isNumeric(value)) return;
    if (name === 'nome' && !containsOnlyLetters(value)) return;
    if (email == 'email' && !isValidEmail(value)) return;
    setAluno({ ...aluno, [name]: value });
  }


  async function manipularSubmissao(e) {
    e.preventDefault();
    try {
      if (aluno.ra !== '') {
        await dispatch(updateAluno(aluno)).unwrap();
        alert('Aluno atualizado com sucesso!');
      } else {
        await dispatch(createAluno(aluno)).unwrap();
        alert('Aluno cadastrado com sucesso!');
      }
      setExibirForm(false);
    } catch (erro) {
      alert('ERRO: ' + erro);
    } finally {
      setTitle('Cadastro de Aluno');
      setTextoBotao('Cadastrar');
      setAluno(alunoVazio);
    }
  }

  return (
    <Container>
      {exibirForm ? (
        <div className="card mt-4 mx-auto" style={{ maxWidth: '430px' }}>
          <div className="card-header">
            <h3>{title}</h3>
          </div>
          <div className="card-body">
            <Form noValidate onSubmit={manipularSubmissao}>
              <Row className="mb-3">
                <label htmlFor="ra" className="col-sm-2 col-form-label">RA</label>
                <Col>
                  <Form.Control
                    type="text"
                    id="ra"
                    name="ra"
                    value={aluno.ra}
                    onChange={manipularMudancas}
                    required
                    className={aluno.ra ? 'is-valid' : 'is-invalid'}
                  />
                  <Form.Control.Feedback type="invalid">Campo obrigatório</Form.Control.Feedback>
                </Col>
              </Row>
              <Row className="mb-3">
                <label htmlFor="nome" className="col-sm-2 col-form-label">Nome</label>
                <Col>
                  <Form.Control
                    type="text"
                    id="nome"
                    name="nome"
                    value={aluno.nome}
                    onChange={manipularMudancas}
                    required
                    className={aluno.nome ? 'is-valid' : 'is-invalid'}
                  />
                  <Form.Control.Feedback type="invalid">Campo obrigatório</Form.Control.Feedback>
                </Col>
              </Row>
              <Row className="mb-3">
                <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                <Col>
                  <Form.Control
                    type="email"
                    id="email"
                    name="email"
                    value={aluno.email}
                    onChange={manipularMudancas}
                    required
                    className={aluno.email ? 'is-valid' : 'is-invalid'}
                  />
                  <Form.Control.Feedback type="invalid">Campo obrigatório</Form.Control.Feedback>
                </Col>
              </Row>
              <Row className="mb-3">
                <label htmlFor="senha" className="col-sm-2 col-form-label">Senha</label>
                <Col>
                  <Form.Control
                    type="password"
                    id="senha"
                    name="senha"
                    value={aluno.senha}
                    onChange={manipularMudancas}
                    required
                    className={aluno.senha ? 'is-valid' : 'is-invalid'}
                  />
                  <Form.Control.Feedback type="invalid">Campo obrigatório</Form.Control.Feedback>
                </Col>
              </Row>
              <Row>
                <Col className="text-center">
                  <Button type="submit" variant="primary">{textoBotao}</Button>
                  <HeaderAluno setExibirForm={setExibirForm} />
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      ) : (
        <>
          <HeaderAluno setExibirForm={setExibirForm} />
          <TabAluno setExibirForm={setExibirForm} onEditarAluno={EditarAluno} />
        </>
      )}
    </Container>
  );
}
