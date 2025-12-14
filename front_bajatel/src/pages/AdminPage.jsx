import AdminComponent from "../components/AdminComponent.jsx";
import { Helmet } from "react-helmet-async";

export default function AdminPage() {
    return (
        <>
        <Helmet defer={false}>
            <title>Admin - Bajatel</title>
        </Helmet>
        <AdminComponent />
        </>
    )
}
