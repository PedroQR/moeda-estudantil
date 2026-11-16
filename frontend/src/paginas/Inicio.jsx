import { useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Marca } from '../componentes/Ui'
import { useSessao } from '../sessao'
import { destino } from '../util'

const CICLO = [
  ['professor', 'Professor', 'Envia moedas e registra o motivo.'],
  ['aluno', 'Aluno', 'Troca o saldo por uma vantagem.'],
  ['empresa', 'Empresa', 'Confere o cupom na hora da troca.'],
]

export default function Inicio() {
  const { sessao } = useSessao()
  useEffect(() => { document.title = 'Moeda estudantil' }, [])
  if (sessao) return <Navigate to={destino(sessao.papel)} replace />

  return (
    <div className="abertura">
      <div className="abertura-sinal" aria-hidden="true"><Marca tamanho={320} /></div>
      <section className="abertura-texto">
        <h1>Moeda estudantil</h1>
        <p className="abertura-lead">Professores distribuem moedas aos alunos como reconhecimento. O aluno troca essas moedas por vantagens de empresas parceiras.</p>
        <div className="acoes">
          <Link className="botao" to="/entrar">Entrar</Link>
          <Link className="botao secundario" to="/cadastro/aluno">Cadastrar aluno</Link>
          <Link className="botao secundario" to="/cadastro/empresa">Cadastrar empresa</Link>
        </div>
        <p className="nota">Professores já entram com a conta enviada pela instituição. Alunos e empresas se cadastram aqui.</p>
      </section>
      <ol className="ciclo" aria-label="Como as moedas circulam">
        {CICLO.map(([chave, quem, texto], indice) => (
          <li key={chave} className={`ciclo-passo ${chave}`}>
            <span className="ciclo-numero" aria-hidden="true">{indice + 1}</span>
            <strong>{quem}</strong>
            <span>{texto}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}
