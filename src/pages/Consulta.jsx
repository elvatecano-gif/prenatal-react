import { useState } from "react";
import { fmt, hoje } from "../data.js";

const vazio = { peso: "", tensao: "", altura: "", obs: "", plano: "", proxima: "" };

export default function Consulta({ pacientes, consultas, pacienteId, setPacienteId, onSave }) {
  const [f, setF] = useState(vazio);
  const [erro, setErro] = useState("");
  const [ok, setOk] = useState(false);
  const paciente = pacientes.find((p) => p.id === pacienteId);
  const historico = consultas.filter((c) => c.pacienteId === pacienteId);
  const set = (k) => (e) => { setF({ ...f, [k]: e.target.value }); setOk(false); };

  const guardar = (e) => {
    e.preventDefault();
    if (!f.peso || !f.tensao) return setErro("Peso e tensão arterial são obrigatórios.");
    if (f.proxima && f.proxima < hoje) return setErro("Não é possível agendar consultas para datas passadas.");
    onSave({ pacienteId, data: hoje, ...f }, f.proxima || null);
    setF(vazio); setErro(""); setOk(true);
  };

  return (
    <>
      <div className="c row" style={{ gap: 32, alignItems: "end" }}>
        <div style={{ minWidth: 240 }}>
          <label htmlFor="pac">Paciente</label>
          <select id="pac" value={pacienteId} onChange={(e) => setPacienteId(Number(e.target.value))}>
            {pacientes.map((p) => <option key={p.id} value={p.id}>{p.nome}</option>)}
          </select>
        </div>
        <div><div className="u">Processo</div><b>{paciente.processo}</b></div>
        <div><div className="u">Idade gestacional</div><b>{paciente.ig} semanas</b></div>
      </div>
      <div className="g" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))" }}>
        <form className="c g" onSubmit={guardar}>
          <div className="g" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(130px,1fr))" }}>
            <div><label htmlFor="a">Peso (kg)</label><input id="a" value={f.peso} onChange={set("peso")} /></div>
            <div><label htmlFor="b">Tensão arterial</label><input id="b" value={f.tensao} onChange={set("tensao")} placeholder="110/70" /></div>
            <div><label htmlFor="d">Altura uterina (cm)</label><input id="d" value={f.altura} onChange={set("altura")} /></div>
          </div>
          <div><label htmlFor="e">Observações</label><textarea id="e" rows="3" value={f.obs} onChange={set("obs")} /></div>
          <div><label htmlFor="pl">Plano de seguimento</label><textarea id="pl" rows="3" value={f.plano} onChange={set("plano")} /></div>
          <div><label htmlFor="px">Próxima consulta</label><input id="px" type="date" value={f.proxima} onChange={set("proxima")} /></div>
          {erro && <div className="err" role="alert">{erro}</div>}
          {ok && <div className="u" role="status">Consulta guardada no histórico.</div>}
          <div><button className="bt" type="submit">Guardar consulta</button></div>
        </form>
        <div className="c">
          <div style={{ fontWeight: 600, marginBottom: 10 }}>Histórico do episódio</div>
          <table>
            <thead><tr><th>Data</th><th>Registo</th></tr></thead>
            <tbody>
              {historico.map((c) => (
                <tr key={c.id}><td>{fmt(c.data)}</td><td>{c.tensao} · {c.peso} kg{c.obs ? " · " + c.obs : ""}</td></tr>
              ))}
              {historico.length === 0 && <tr><td colSpan="2">Sem consultas registadas.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
