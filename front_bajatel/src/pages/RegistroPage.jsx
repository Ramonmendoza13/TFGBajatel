import RegistroComponent from "../components/RegistroComponent";
import { Helmet } from "react-helmet-async";

export default function RegistroPage() {
  return (
    <>
      <Helmet>
        <title>Registro | Bajatel</title>
      </Helmet>
      <RegistroComponent />
    </>
  );
}
