const NAV = [
  ["painel", "Painel"],
  ["pacientes", "Pacientes"],
  ["consulta", "Registar consulta"],
  ["agendamentos", "Agendamentos"],
];

export default function Layout({ page, onNavigate, onLogout, title, action, children }) {
  return (
    <div className="r">
      <nav className="sb" aria-label="Navegação principal">
        <b>Consultas Pré-Natais</b>
        {NAV.map(([id, label]) => (
          <button key={id} className={"n" + (id === page ? " a" : "")} onClick={() => onNavigate(id)}>
            {label}
          </button>
        ))}
        <button className="n" onClick={onLogout}>Terminar sessão</button>
      </nav>
      <main className="m">
        <div className="h">
          <h1>{title}</h1>
          <div className="row" style={{ alignItems: "center" }}>
            <span className="u">Enfermeira · Maria Chongo</span>
            {action}
          </div>
        </div>
        {children}
      </main>
    </div>
  );
}

export const Tag = ({ kind = "", children }) => <span className={"t " + kind}>{children}</span>;
