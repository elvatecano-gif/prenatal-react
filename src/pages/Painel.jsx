import { Tag } from "../components/Layout.jsx";
import { hoje } from "../data.js";

export default function Painel({ pacientes, consultas }) {
  const agendadasHoje = pacientes.filter((p) => p.proxima === hoje);
  const faltas = pacientes.filter((p) => p.faltou).length;
  const stats = [
    ["Grávidas com episódio activo", pacientes.length],
    ["Consultas registadas", consultas.length],
    ["Consultas agendadas hoje", agendadasHoje.length],
    ["Faltas a acompanhar", faltas],
  ];
  return (
    <>
      <div className="g" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))" }}>
        {stats.map(([l, v]) => (
          <div className="c" key={l}>
            <div className="u">{l}</div>
            <div className="k">{v}</div>
          </div>
        ))}
      </div>
      <div className="c">
        <div style={{ fontWeight: 600, marginBottom: 8 }}>Estado das pacientes</div>
        <div className="tw">
          <table>
            <thead><tr><th>Paciente</th><th>Idade gestacional</th><th>Estado</th></tr></thead>
            <tbody>
              {pacientes.map((p) => (
                <tr key={p.id}>
                  <td>{p.nome}</td>
                  <td>{p.ig} semanas</td>
                  <td>{p.faltou ? <Tag kind="d">Faltou</Tag> : <Tag>Em seguimento</Tag>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
