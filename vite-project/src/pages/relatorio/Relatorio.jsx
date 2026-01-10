import React, { useEffect, useMemo, useState } from 'react';
import './Relatorio.css';

const PAGE_SIZE = 10;

function parseCsv(text) {
  const lines = text.trim().split(/\r?\n/);
  if (lines.length === 0) return { headers: [], rows: [] };

  const parseLine = (line) => {
    const result = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        if (inQuotes && line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    result.push(current.trim());
    return result;
  };

  const headers = parseLine(lines[0]);
  const rows = lines.slice(1).map((l) => parseLine(l)).filter((cols) => cols.length && cols.some((c) => c && c.length));
  const keyed = rows.map((cols) => {
    const obj = {};
    headers.forEach((h, idx) => {
      obj[h] = cols[idx] ?? '';
    });
    return obj;
  });
  return { headers, rows: keyed };
}

const Relatorio = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetch('/data/Instituto-VORP.csv');
        if (!res.ok) throw new Error('Falha ao carregar CSV');
        const text = await res.text();
        const parsed = parseCsv(text);
        const expectedHeaders = ['Data', 'Doador', 'Valor', 'Pagamento', 'Destino'];
        const normalized = parsed.rows.map((r) => ({
          Data: r['Data'] ?? r[expectedHeaders[0]] ?? '',
          Doador: r['Doador'] ?? r[expectedHeaders[1]] ?? '',
          Valor: r['Valor'] ?? r[expectedHeaders[2]] ?? '',
          Pagamento: r['Pagamento'] ?? r[expectedHeaders[3]] ?? '',
          Destino: r['Destino'] ?? r[expectedHeaders[4]] ?? '',
        }));
        setData(normalized);
      } catch (e) {
        setError(e.message || 'Erro ao processar CSV');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const totalPages = useMemo(() => Math.max(1, Math.ceil(data.length / PAGE_SIZE)), [data.length]);
  const currentItems = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return data.slice(start, start + PAGE_SIZE);
  }, [data, page]);

  const goTo = (p) => {
    if (p < 1 || p > totalPages) return;
    setPage(p);
  };

  return (
    <div className="relatorio-container">
      <h1 className="relatorio-title">Relatório de Doações</h1>

      {loading && <div className="relatorio-status">Carregando...</div>}
      {error && <div className="relatorio-error">{error}</div>}

      {!loading && !error && (
        <>
          <div className="relatorio-table-wrapper">
            <table className="relatorio-table">
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Doador</th>
                  <th>Valor</th>
                  <th>Pagamento</th>
                  <th>Destino</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="relatorio-empty">Sem registros</td>
                  </tr>
                ) : (
                  currentItems.map((row, idx) => (
                    <tr key={idx}>
                      <td>{row.Data}</td>
                      <td>{row.Doador}</td>
                      <td>{row.Valor}</td>
                      <td>{row.Pagamento}</td>
                      <td>{row.Destino}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="relatorio-pagination">
            <button onClick={() => goTo(page - 1)} disabled={page === 1}>Anterior</button>
            <span>Página {page} de {totalPages}</span>
            <button onClick={() => goTo(page + 1)} disabled={page === totalPages}>Próxima</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Relatorio;
