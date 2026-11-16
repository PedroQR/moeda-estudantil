import { useState } from 'react'
import { moedas, quando, tomEmail } from '../util'

export function Tabela({ colunas, linhas, vazio }) {
  return (
    <div className="tabela">
      <table>
        <thead>
          <tr>{colunas.map((coluna) => <th key={coluna} scope="col">{coluna}</th>)}</tr>
        </thead>
        <tbody>
          {linhas.length === 0 ? (
            <tr><td className="vazio" colSpan={colunas.length}>{vazio}</td></tr>
          ) : linhas}
        </tbody>
      </table>
    </div>
  )
}

function sinal(item) {
  return `${item.tipo === 'entrada' ? '+' : '−'}${moedas(item.valor)}`
}

export function Movimentos({ lista, titulo, resumo, legenda, vazio, limite }) {
  const [ativo, setAtivo] = useState(null)
  const visiveis = limite ? lista.slice(0, limite) : lista
  const cronologica = [...visiveis].reverse()

  function mostrar(chave) {
    setAtivo(chave)
    document.getElementById(`mov-${chave}`)?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
  }

  return (
    <section className="movimentos" aria-labelledby="movimentos-titulo">
      <div className="secao-topo">
        <h2 id="movimentos-titulo">{titulo}</h2>
        {resumo && lista.length > 0 ? <p className="resumo">{resumo}</p> : null}
      </div>
      {lista.length === 0 ? <p className="vazio-bloco">{vazio}</p> : (
        <>
          <div className="regua" onMouseLeave={() => setAtivo(null)}>
            {cronologica.map((item) => (
              <button
                key={item.chave}
                type="button"
                className={`bloco ${item.tipo}${ativo === item.chave ? ' ativo' : ''}`}
                style={{ flexGrow: Math.max(item.valor, 1) }}
                aria-label={`${item.titulo}, ${sinal(item)} moedas, ${quando(item.dataHora)}`}
                onMouseEnter={() => setAtivo(item.chave)}
                onFocus={() => setAtivo(item.chave)}
                onBlur={() => setAtivo(null)}
                onClick={() => mostrar(item.chave)}
              >
                <span aria-hidden="true">{sinal(item)}</span>
              </button>
            ))}
          </div>
          <div className="regua-pontas">
            <span>Mais antigo · {quando(cronologica[0].dataHora)}</span>
            {legenda ? <span className="regua-legenda">{legenda}</span> : null}
            <span className="regua-fim">Mais recente · {quando(cronologica[cronologica.length - 1].dataHora)}</span>
          </div>
          <div className="tabela">
            <table>
              <thead>
                <tr>
                  <th scope="col">Data</th>
                  <th scope="col">Movimento</th>
                  <th scope="col">Detalhe</th>
                  <th scope="col" className="num">Moedas</th>
                </tr>
              </thead>
              <tbody>
                {visiveis.map((item) => (
                  <tr
                    key={item.chave}
                    id={`mov-${item.chave}`}
                    className={ativo === item.chave ? 'ativo' : undefined}
                    onMouseEnter={() => setAtivo(item.chave)}
                    onMouseLeave={() => setAtivo(null)}
                  >
                    <td className="data">{quando(item.dataHora)}</td>
                    <td className="forte">{item.titulo}</td>
                    <td className="detalhe">
                      {item.detalhe}
                      {item.cupom ? <span className="cupom">{item.cupom}</span> : null}
                    </td>
                    <td className={`num valor ${item.tipo}`}>{sinal(item)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </section>
  )
}

export function Emails({ lista }) {
  return (
    <section className="emails" aria-labelledby="emails-titulo">
      <div className="secao-topo">
        <h2 id="emails-titulo">E-mails</h2>
        <p className="legenda">Conteúdo e situação de envio de cada aviso. O cupom também aparece no extrato.</p>
      </div>
      {lista.length === 0 ? <p className="vazio-bloco">Nenhum e-mail registrado.</p> : (
        <ul className="cartas">
          {lista.map((item, indice) => (
            <li className="carta" key={`${item.dataEnvio}-${indice}`}>
              <details>
                <summary>
                  <span className="carta-assunto">{item.assunto}</span>
                  <span className="carta-data">{quando(item.dataEnvio)}</span>
                  <span className={`selo ${tomEmail(item.statusDescricao)}`}>{item.statusDescricao}</span>
                </summary>
                {item.enviadoEm ? <p className="carta-envio">Aceito pelo servidor em {quando(item.enviadoEm)}</p> : null}
                <pre>{item.corpo}</pre>
              </details>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
