import { Container } from "react-bootstrap";
import Pagina from "../../context/Pagina";
import FormAluno from "../forms/FormAluno";
import Header from "../Header"
export default function TelaAluno(){
    return (
        <>
        <Pagina />
            <Container>
            
            <FormAluno />
            
            </Container>
        </>
    )

}