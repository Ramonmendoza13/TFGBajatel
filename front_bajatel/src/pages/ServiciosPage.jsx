import ServiciosComponent from "../components/ServiciosComponent";
import { Helmet } from "react-helmet-async";


export default function ServiciosPage() {
    return (
        <>
            <Helmet defer={false}>
                <title>Servicios - Fibra, Movil y TV</title>
            </Helmet>
            <ServiciosComponent />
        </>
    )
}
