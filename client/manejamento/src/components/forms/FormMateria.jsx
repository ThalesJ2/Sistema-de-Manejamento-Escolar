import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import { createMateria, updateMateria } from '../../redux/MateriaReducer';
import HeaderMateria from '../HeaderMateria';
import TabMateria from '../tabelas/TabMateria';

export default function FormMateria() {
  const materiaVazia = {
    nome: '',
  };

  const [materia, setMateria] = useState(materiaVazia);
  const [exibirForm, setExibirForm] = useState(true);
  const [textoBotao, setTextoBotao] = useState('Cadastrar');
  const [title, setTitle] = useState('Cadastro de Matérias');
  const dispatch = useDispatch();

  function EditarMateria(materia) {
    const editMateria = {
      id: materia.id,
      nome: materia.nome,
    };
    setTitle('Atualizar Matéria');
    setTextoBotao('Atualizar');
    setMateria(editMateria);
  }
  function containsOnlyLetters(str) {
    return /^[a-zA-Z\s]*$/.test(str);
  }

  function manipularMudancas(e) {
    const { name, value } = e.target;
    if (name === 'nome' && !containsOnlyLetters(value)) return;
    setMateria({ ...materia, [name]: value });
  }

  function manipularSubmissao(e) {
    e.preventDefault();

    async function submit() {
      try {
        if (materia.id != null) {
          await dispatch(updateMateria(materia)).unwrap();
          alert('Materia cadastrada com sucesso');
        } else {
          console.log("fsdf");
          await dispatch(createMateria(materia)).unwrap();
          alert('Matéria cadastrada com sucesso!');
        }

        setExibirForm(false);
      } catch (erro) {
        alert('ERRO:' + erro);
      }
    }

    submit().then(() => {
      setTitle('Cadastro de Matéria');
      setTextoBotao('Cadastrar');
      setMateria(materiaVazia);
    });
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
                <label htmlFor="nome" className="col-sm-2 col-form-label">
                  Nome
                </label>
                <Col>
                  <Form.Control
                    type="text"
                    id="nome"
                    name="nome"
                    value={materia.nome}
                    onChange={manipularMudancas}
                    required
                    isValid={materia.nome !== ''} 
                    isInvalid={materia.nome === ''}
                  />
                  <Form.Control.Feedback type="invalid">Por favor, insira um nome.</Form.Control.Feedback>
                </Col>
              </Row>
              <Row>
                <Col className="text-center">
                  <Button type="submit" variant="primary">
                    {textoBotao}
                  </Button>
                  <HeaderMateria setExibirForm={setExibirForm} />
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      ) : (
        <>
          <HeaderMateria setExibirForm={setExibirForm} />
          <TabMateria setExibirForm={setExibirForm} onEditarMateria={EditarMateria} />
        </>
      )}
    </Container>
  );
}
