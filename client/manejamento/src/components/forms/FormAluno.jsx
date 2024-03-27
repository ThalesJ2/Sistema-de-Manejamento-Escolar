import { useState } from 'react';
import { Container, Form, Row, Col, Button, FloatingLabel } from 'react-bootstrap';
export default function FormAluno(){
    return (
            
        <Container>
            <h2>Cadastro de Categorias</h2>
            <Form noValidate >
                <Row>
                    <Col>
                        <Form.Group>
                            <FloatingLabel
                                label="Código:"
                                className="mb-3"
                            >

                                <Form.Control
                                    type="text"
                                    placeholder="0"
                                    id="codigo"
                                    name="codigo"
                                   // value={categoria.codigo}
                                    //onChange={manipularMudancas}
                                    disabled />
                            </FloatingLabel>
                            <Form.Control.Feedback type="invalid">Informe o código da categoria!</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group>
                            <FloatingLabel
                                label="Categoria:"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="text"
                                    placeholder="Informe a descrição da categoria"
                                    id="descricao"
                                    name="descricao"
                                  //  value={categoria.descricao}
                                  //  onChange={manipularMudancas}
                                    required />
                            </FloatingLabel>
                            <Form.Control.Feedback type="invalid">Informe a descrição da categoria!</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6} offset={5} className="d-flex justify-content-end">
                        <Button type="submit" variant={"primary"}>Enviar</Button>
                    </Col>
                    <Col md={6} offset={5}>
                        <Button type="button" variant={"secondary"} onClick={() => {
                           
                        }
                        }>Voltar</Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}