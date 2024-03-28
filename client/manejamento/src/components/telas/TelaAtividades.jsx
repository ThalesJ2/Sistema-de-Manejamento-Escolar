import { Container } from "react-bootstrap";
import Pagina from "../../context/Pagina";
import FormAtividades from "../forms/FormAtividades";

export default function TelaAluno(){
    
    return (
        <>
        <Pagina />
            <Container>
            
            <FormAtividades />
            
            </Container>
        </>
    )

}