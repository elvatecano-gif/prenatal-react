import { fmt, hoje } from "../data.js";
import { Tag } from "../components/Layout.jsx";

export default function Agendamentos({ pacientes, onReagendar }) {
  const agendadas = pacientes.filter((p) => p.proxima && p.proxima >= hoje)
    .sort((a, b) => a.proxima.localeCompare(b.proxima));
  const faltas = pacientes.filter((p) => p.faltou);
  return (
    <div className="g" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))" }}>
      <div className="c tw">
        <div style={{ fontWeight: 600, marginBottom: 8 }}>Consultas agendadas</div>
        <table>
          <thead><tr><th>Data</th><th>Paciente</th><th>Estado</th></tr></thead>
          <tbody>
            {agendadas.map((p) => (
              <tr key={p.id}><td>{fmt(p.proxima)}</td><td>{p.nome}</td><td><Tag kind="w">Agendada</Tag></td></tr>
            ))}
            {agendadas.length === 0 && <tr><td colSpan="3">Sem consultas agendadas.</td></tr>}
          </tbody>
        </table>
      </div>
      <div className="c tw">
        <div style={{ fontWeight: 600, marginBottom: 8 }}>Faltas a acompanhar</div>
        <table>
          <tbody>
            {faltas.map((p) => (
              <tr key={p.id}>
                <td>{p.nome}</td>
                <td><button className="bt s" onClick={() => onReagendar(p.id)}>Reagendar</button></td>
              </tr>
            ))}
            {faltas.length === 0 && <tr><td>Sem faltas.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
