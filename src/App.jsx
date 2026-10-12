import { useState } from "react";
import Layout from "./components/Layout.jsx";
import Login from "./pages/Login.jsx";
import Painel from "./pages/Painel.jsx";
import Pacientes from "./pages/Pacientes.jsx";
import Consulta from "./pages/Consulta.jsx";
import Agendamentos from "./pages/Agendamentos.jsx";
import { pacientesIniciais, consultasIniciais } from "./data.js";

const TITULOS = {
  painel: "Painel",
  pacientes: "Pacientes",
  consulta: "Registar consulta",
  agendamentos: "Agendamentos",
};

export default function App() {
  const [logado, setLogado] = useState(false);
  const [page, setPage] = useState("painel");
  const [pacientes, setPacientes] = useState(pacientesIniciais);
  const [consultas, setConsultas] = useState(consultasIniciais);
  const [pacienteId, setPacienteId] = useState(1);
  const [mostrarForm, setMostrarForm] = useState(false);

  if (!logado) return <Login onLogin={() => setLogado(true)} />;

  const adicionar = (dados) =>
    setPacientes((ps) => [
      ...ps,
      { id: Date.now(), processo: String(300 + ps.length).padStart(4, "0") + "/26", proxima: null, faltou: false, ...dados },
    ]);

  const guardarConsulta = (c, proxima) => {
    setConsultas((cs) => [{ id: Date.now(), ...c }, ...cs]);
    setPacientes((ps) => ps.map((p) => (p.id === c.pacienteId ? { ...p, proxima, faltou: false } : p)));
  };

  const abrirConsulta = (id) => { setPacienteId(id); setPage("consulta"); };

  const botao = page === "pacientes" && (
    <button className="bt" onClick={() => setMostrarForm(true)}>Registar paciente</button>
  );

  return (
    <Layout page={page} onNavigate={setPage} onLogout={() => setLogado(false)} title={TITULOS[page]} action={botao}>
      {page === "painel" && <Painel pacientes={pacientes} consultas={consultas} />}
      {page === "pacientes" && (
        <Pacientes pacientes={pacientes} onAdd={adicionar} onOpen={abrirConsulta}
          mostrarForm={mostrarForm} setMostrarForm={setMostrarForm} />
      )}
      {page === "consulta" && (
        <Consulta pacientes={pacientes} consultas={consultas} pacienteId={pacienteId}
          setPacienteId={setPacienteId} onSave={guardarConsulta} />
      )}
      {page === "agendamentos" && <Agendamentos pacientes={pacientes} onReagendar={abrirConsulta} />}
    </Layout>
  );
}
