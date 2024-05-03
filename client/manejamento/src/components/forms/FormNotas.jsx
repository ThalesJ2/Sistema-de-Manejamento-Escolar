import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import HeaderNota from "../HeaderNota";
import TabNotas from "../tabelas/TabNotas";
import {createNota, updateNota} from "../../redux/notaReducer";
export default function FormNotas(){

    const notaVazia = {
        valor : 0
    }

    const [nota, setNota] = useState(notaVazia);
    const [textoBotao, setTextoBotao] = useState('Cadastrar');
    const [title, setTitle] = useState('Cadastro de Notas');
    const [isDisabled, setIsDisabled] = useState(false);
    const [exibirForm, setExibirForm] = useState(true);
    const dispatch = useDispatch();

    function EditarNotas(nota){
        const editNota = {
            id: nota.id,
            valor:nota.valor
        };
        setIsDisabled(!isDisabled);
        setTitle('Atualizar Nota');
        setTextoBotao('Atualizar');
        setNota(editNota);
    }

    function manipularMudancas(e){
        const componente = e.currentTarget;
        setNota({...nota,[componente.name]:componente.value});
    }

    function manipularSubmissao(e){

        e.preventDefault();

        async function submit(){
            try{
                let n = {title}
                if(n.title!="Cadastro de Notas")
                {
                    await dispatch(updateNota(nota).unwrap());
                    alert('Nota atualizada com sucesso');
                }
                else
                {
                    await dispatch(createNota(nota)).unwrap();
                    alert("Nota cadastrada com sucesso!");
                }
                setExibirForm(false);
            }catch(erro){
                alert("ERRO:"+erro);
            }
            finally {
                setIsDisabled(isDisabled);
                setTitle('Cadastro de Notas');
                setTextoBotao('Cadastrar');
                setNota(notaVazia);
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
                                    <Button type="submit" variant={"primary"}>{textoBotao}</Button>


                                    <HeaderNota setExibirForm={setExibirForm}></HeaderNota>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </div>
            ):(
                <>
                    <HeaderNota setExibirForm={setExibirForm}></HeaderNota>
                    <TabNotas setExibirForm={setExibirForm} onEditarNotas={EditarNotas}/>
                </>
            )
        }
        </Container>
    );
}