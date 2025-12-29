import EditarContratoComponent from "../components/EditarContratoComponent.jsx";
import { Helmet } from "react-helmet-async";

export default function EditarContratoPage() {
    return (
        <>
            <Helmet defer={false}>
                <title>Editar Contrato - Bajatel</title>
            </Helmet>
            <EditarContratoComponent />
        </>
    )
}
