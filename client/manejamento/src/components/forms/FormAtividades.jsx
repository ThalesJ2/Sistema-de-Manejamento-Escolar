import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Form, Row, Col, Button, FloatingLabel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { addAtividade, updateAtividades } from '../../redux/atividadeReducer';
import TabAtividades from '../tabelas/tabAtividades'

export default function FormAtividades(){

    const navigate = useNavigate();

    const [peso, setPeso] = useState('');
    const [exibirForm, setExibirForm] = useState(true);

    const validaNota = (e) => {
        const { value } = e.target;
        // Regex para validar a nota permitir somente 0 a 10 e . e duas casas decimais
        const regex = /^(10(\.0{1,2})?|([0-9](\.\d{1,2})?))$/;

        if (value === '' || regex.test(value)) {
            setPeso(value);
            setAtividade({...atividade, peso: value});
        }
    };

    function EditarAtividade(atividade) {
        const editAtividade = {
            id: atividade.id,
            nome: atividade.nome,
            descricao: atividade.descricao,
            peso: atividade.peso.toString()
        }
        setPeso(editAtividade.peso); //Isso e porque o peso esta sendo controlado por um estado diferente do resto do objeto por conta da validacao
        setAtividade(editAtividade);
    }

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

        //Tudo isso e para saber se foi bem sucedido ou nao a insercao

        async function submit(){
        try{
            if(atividade.id===''){
                await dispatch(addAtividade(atividade)).unwrap();
                alert("Atividade incluida com sucesso.");
            }
            else{
                await dispatch(addAtividade(atividade)).unwrap();
                alert("Atividade atualizada com sucesso.");

            }

        }catch(erro){
            alert("ERRO:"+erro);
        };

        }
        
        submit().then(() => {
            setAtividade(atividadeVazia);
            setPeso("");   
        });   

    }

    return (         
        <Container>

            {
                exibirForm ?(
                    <Form noValidate onSubmit={manipularSubmissao}>
                        <h2 style={{ textAlign: 'center' }}>Cadastrar Atividade</h2>
                        <hr></hr>
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
                            <Col md={{ span: 2, offset: 5 }} className="d-flex justify-content-center gap-2">
                                <Button type="submit" variant={"primary"} >Enviar</Button>

                                <Button type="button" variant={"secondary"} onClick={() => {
                                navigate('/')
                                }
                                }>Voltar</Button>
                                <Button type="button" variant="info" onClick={() => setExibirForm(false)}>Consultar</Button>
                            </Col>
                        </Row> 
                    </Form>
                        ) : (  
                               <>  
                                <TabAtividades setExibirForm={setExibirForm} onEditarAtividade={EditarAtividade}/>
                               </>   
                            )
            }            
        </Container>
    );
}