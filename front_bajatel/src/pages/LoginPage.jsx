import LoginComponent from "../components/LoginComponent";
import { Helmet } from "react-helmet-async";

export default function LoginPage() {
    return (
        <>
            <Helmet defer={false}>
                <title>Login - Bajatel</title>
            </Helmet>
            <LoginComponent />
        </>
    );
}
