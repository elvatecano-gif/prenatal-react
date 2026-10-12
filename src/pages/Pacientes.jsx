import { useState } from "react";
import { fmt } from "../data.js";
import { Tag } from "../components/Layout.jsx";

export default function Pacientes({ pacientes, onAdd, onOpen, mostrarForm, setMostrarForm }) {
  const [q, setQ] = useState("");
  const [f, setF] = useState({ nome: "", idade: "", ig: "" });
  const [erro, setErro] = useState("");

  const lista = pacientes.filter((p) =>
    (p.nome + " " + p.processo).toLowerCase().includes(q.trim().toLowerCase())
  );

  const guardar = (e) => {
    e.preventDefault();
    if (!f.nome.trim() || !f.idade) return setErro("Nome e idade são obrigatórios.");
    if (pacientes.some((p) => p.nome.toLowerCase() === f.nome.trim().toLowerCase()))
      return setErro("Já existe uma paciente com este nome. Verifique se é duplicada.");
    onAdd({ nome: f.nome.trim(), idade: Number(f.idade), ig: Number(f.ig) || 0 });
    setF({ nome: "", idade: "", ig: "" });
    setErro("");
    setMostrarForm(false);
  };

  return (
    <>
      {mostrarForm && (
        <form className="c g" onSubmit={guardar}>
          <div className="g" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))" }}>
            <div><label htmlFor="n">Nome completo</label><input id="n" value={f.nome} onChange={(e) => setF({ ...f, nome: e.target.value })} /></div>
            <div><label htmlFor="i">Idade</label><input id="i" type="number" min="10" max="60" value={f.idade} onChange={(e) => setF({ ...f, idade: e.target.value })} /></div>
            <div><label htmlFor="g">Idade gestacional (semanas)</label><input id="g" type="number" min="0" max="42" value={f.ig} onChange={(e) => setF({ ...f, ig: e.target.value })} /></div>
          </div>
          {erro && <div className="err" role="alert">{erro}</div>}
          <div className="row">
            <button className="bt" type="submit">Guardar paciente</button>
            <button className="bt s" type="button" onClick={() => setMostrarForm(false)}>Cancelar</button>
          </div>
        </form>
      )}
      <div className="c">
        <label htmlFor="q">Pesquisar por nome ou nº de processo</label>
        <input id="q" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Ex.: Ana Macuácua" />
      </div>
      <div className="c tw">
        <table>
          <thead><tr><th>Nº processo</th><th>Nome</th><th>Idade</th><th>Idade gestacional</th><th>Próxima consulta</th><th></th></tr></thead>
          <tbody>
            {lista.map((p) => (
              <tr key={p.id}>
                <td>{p.processo}</td>
                <td>{p.nome}</td>
                <td>{p.idade}</td>
                <td>{p.ig} semanas</td>
                <td>{p.faltou ? <Tag kind="d">Faltou</Tag> : fmt(p.proxima)}</td>
                <td><button className="bt s" onClick={() => onOpen(p.id)}>Registar consulta</button></td>
              </tr>
            ))}
            {lista.length === 0 && <tr><td colSpan="6">Nenhuma paciente encontrada.</td></tr>}
          </tbody>
        </table>
      </div>
    </>
  );
}
