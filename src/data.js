// Dados fictícios, apenas para demonstração.
export const pacientesIniciais = [
  { id: 1, processo: "0231/26", nome: "Ana Macuácua", idade: 27, ig: 24, proxima: "2026-11-18", faltou: false },
  { id: 2, processo: "0198/26", nome: "Luísa Sitoe", idade: 19, ig: 12, proxima: "2026-10-20", faltou: false },
  { id: 3, processo: "0174/26", nome: "Celeste Mabunda", idade: 31, ig: 32, proxima: "2026-10-14", faltou: false },
  { id: 4, processo: "0152/26", nome: "Helena Tembe", idade: 24, ig: 28, proxima: null, faltou: true },
];

export const consultasIniciais = [
  { id: 1, pacienteId: 1, data: "2026-09-12", peso: "63", tensao: "110/70", altura: "22", obs: "Sem queixas.", plano: "Manter seguimento mensal." },
  { id: 2, pacienteId: 1, data: "2026-08-15", peso: "61", tensao: "112/72", altura: "18", obs: "Náuseas ligeiras.", plano: "Reavaliar na próxima consulta." },
];

export const hoje = "2026-10-12";
export const fmt = (iso) => (iso ? iso.split("-").reverse().join("/") : "—");
