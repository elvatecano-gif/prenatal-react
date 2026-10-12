import { useState } from "react";

export default function Login({ onLogin }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [erro, setErro] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!user.trim() || !pass) return setErro("Preencha o utilizador e a palavra-passe.");
    onLogin(user.trim());
  };

  return (
    <div className="r" style={{ alignItems: "center", justifyContent: "center", background: "#0B3B38" }}>
      <form className="c g" style={{ width: 380, padding: 36 }} onSubmit={submit}>
        <div>
          <div className="u">Unidade Sanitária de referência</div>
          <h1 style={{ margin: "4px 0 0", fontSize: 26, fontWeight: 600 }}>Consultas Pré-Natais</h1>
        </div>
        <div>
          <label htmlFor="u">Utilizador</label>
          <input id="u" value={user} onChange={(e) => setUser(e.target.value)} placeholder="nome.utilizador" />
        </div>
        <div>
          <label htmlFor="p">Palavra-passe</label>
          <input id="p" type="password" value={pass} onChange={(e) => setPass(e.target.value)} />
        </div>
        {erro && <div className="err" role="alert">{erro}</div>}
        <button className="bt" type="submit">Entrar</button>
        <div className="u">Acesso restrito a utilizadores autorizados.</div>
      </form>
    </div>
  );
}
