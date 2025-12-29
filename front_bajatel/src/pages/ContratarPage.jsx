import ContratarComponent from "../components/ContratarComponent.jsx";
import { Helmet } from "react-helmet-async";
export default function ContratarPage() {
    return (
        <>
            <Helmet defer={false}>
                <title>Contrata - Bajatel</title>
            </Helmet>
            <ContratarComponent />
        </>
    )
}
