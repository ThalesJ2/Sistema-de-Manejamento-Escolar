import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Form, Row, Col, Button, FloatingLabel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { addAtividade } from '../../redux/atividadeReducer';

export default function FormAtividades(){

    const navigate = useNavigate();

    const [peso, setPeso] = useState('');

    const validaNota = (e) => {
        const { value } = e.target;
        // Regex para validar a nota
        const regex = /^(10(\.0{1,2})?|([0-9](\.\d{1,2})?))$/;

        if (value === '' || regex.test(value)) {
            setPeso(value);
            setAtividade({...atividade, peso: value});
        }
    };

    const atividadeVazia = {
        nome:'',
        descricao:'',
        peso:''
    }

    const [atividade, setAtividade] = useState(atividadeVazia);

    const dispatch = useDispatch();

    function manipularMudancas(e){
        const componente = e.currentTarget;
        setAtividade({...atividade,[componente.name]:componente.value});
    }

    function manipularSubmissao(e){

        e.preventDefault();

        dispatch(addAtividade(atividade));

        
        e.stopPropagation();
        setAtividade(atividadeVazia);
        setPeso("");       

    }

    return (
            
        <Container>
            <h2 style={{ textAlign: 'center' }}>Cadastro de Atividades</h2>
            <br></br>
            <Form noValidate onSubmit={manipularSubmissao}>
                <Row>
                    <Col>
                        <Form.Group className="col-md-12">
                            <FloatingLabel
                                label="Nome da Atividade"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="text"
                                    placeholder=""
                                    id="nome"
                                    name="nome"
                                    maxLength={30}
                                    value={atividade.nome}
                                    onChange={manipularMudancas}
                                    required />
                            </FloatingLabel>
                            <Form.Control.Feedback type="invalid">Informe o nome da atividade.</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="col-md-2">
                            <FloatingLabel
                                label="Peso"
                                className="mb-3"        
                            >
                                <Form.Control                
                                    type="number"
                                    placeholder=""
                                    id="peso"
                                    name="peso"
                                    max="10"
                                    min="0"                                    
                                    value={peso}
                                    onChange={validaNota}
                                    required />
                            </FloatingLabel>
                            <Form.Control.Feedback type="invalid">Informe o peso da atividade.</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group>
                            <FloatingLabel 
                                label="Descrição"
                                className="mb-3"
                            >
                                <Form.Control as="textarea" style={{ height:"50%"}} 
                                    rows="20"
                                    placeholder=""
                                    id="descricao"
                                    name="descricao"
                                    value={atividade.descricao}
                                    onChange={manipularMudancas}
                                    required />
                            </FloatingLabel>
                            <Form.Control.Feedback type="invalid">Informe a descrição da atividade.</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6} offset={5} className="d-flex justify-content-end">
                        <Button type="submit" variant={"primary"} >Enviar</Button>
                    </Col>
                    <Col md={6} offset={5}>
                        <Button type="button" variant={"secondary"} onClick={() => {
                           navigate('/')
                        }
                        }>Voltar</Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}