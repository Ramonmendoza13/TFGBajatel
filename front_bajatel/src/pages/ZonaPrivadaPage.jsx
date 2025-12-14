import ZonaPrivadaComponent from "../components/ZonaPrivadaComponent";
import { Helmet } from "react-helmet-async";

export default function ZonaPrivadaPage() {
    return (
        <>
            <Helmet defer={false}>
                <title>Zona Privada - Bajatel</title>
            </Helmet>
            <ZonaPrivadaComponent />
        </>
    );
}
