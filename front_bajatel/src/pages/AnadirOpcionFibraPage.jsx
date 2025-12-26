import { Helmet } from "react-helmet-async";
import AnadirOpcionFibraComponent from "../components/AnadirOpcionFibraComponent";

export default function AnadirOpcionFibraPage() {
    return (
        <>
            <Helmet defer={false}>
                <title>Añadir Opcion Fibra - Fibra, Movil y TV</title>
            </Helmet>
            <AnadirOpcionFibraComponent/>
        </>
    )
}
