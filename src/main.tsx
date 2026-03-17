import { createRoot } from "react-dom/client";
import App from "./App"; // Aseguramos que renderice nuestro nuevo enrutador
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
