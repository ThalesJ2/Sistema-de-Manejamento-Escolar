import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import HeaderAluno from '../HeaderAluno';
import TabAluno from '../tabelas/TabAluno';
import {createNota} from "../../redux/notaReducer.js";
export default function FormNotas(){

    const notaVazia = {
        valor : 0
    }

    const [nota, setNota] = useState(notaVazia);
    const [exibirForm, setExibirForm] = useState(true);
    const dispatch = useDispatch();

    function manipularMudancas(e){
        const componente = e.currentTarget;
        setNota({...nota,[componente.name]:componente.value});
    }

    function manipularSubmissao(e){

        e.preventDefault();

        async function submit(){
            try{

                await dispatch(createNota(nota)).unwrap();
                alert("Nota cadastrada com sucesso!");

            }catch(erro){
                alert("ERRO:"+erro);
            }

        }

        submit().then(() => {
            setNota(notaVazia);
        });

    }

    return (

        <Container>{
            exibirForm ?(
                <div className='card mt-4 mx-auto' style={{ maxWidth: '400px' }}>
                    <div className='card-header'>
                        <h3>Cadastro de Notas</h3>
                    </div>
                    <div className='card-body'>
                        <Form noValidate onSubmit={manipularSubmissao}>
                            <Row className="mb-3">
                                <label htmlFor="">Valor</label>
                                <Col>

                                    <Form.Control
                                        type="number"
                                        min="0"
                                        max="10"
                                        step="0.1"
                                        id="valor"
                                        name="valor"
                                        value={nota.valor}
                                        onChange={manipularMudancas}
                                        required

                                    />

                                    <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
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