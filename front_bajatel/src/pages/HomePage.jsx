import MainComponent from "../components/MainComponent";
import { Helmet } from "react-helmet-async";

export default function HomePage() {
    return (
        <>
            <Helmet defer={false}>
                <title>Bajatel - Fibra, Movil y TV</title>
            </Helmet>
            <MainComponent />
        </>
    )
}
