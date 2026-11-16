import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { api } from '../api'
import { Movimentos } from '../componentes/Listas'
import { Cabecalho, Carregando, Faixa, Saldo } from '../componentes/Ui'
import { useSessao } from '../sessao'
import { movimentosProfessor } from '../util'

export default function PainelProfessor() {
  const { setSaldo } = useSessao()
  const location = useLocation()
  const [professor, setProfessor] = useState(null)
  const [movimentos, setMovimentos] = useState([])
  const [erro, setErro] = useState('')

  useEffect(() => { document.title = 'Meu balcão' }, [])

  useEffect(() => {
    let ativo = true
    api('/api/professor')
      .then(async (dados) => {
        if (!ativo) return
        setProfessor(dados)
        setSaldo(dados.saldoMoedas)
        const extrato = await api('/api/professor/extrato')
        if (ativo) setMovimentos(movimentosProfessor(extrato.envios))
      })
      .catch((e) => { if (ativo) setErro(e.message) })
    return () => { ativo = false }
  }, [setSaldo])

  if (!professor && !erro) return <Carregando />

  const semestre = professor?.ultimoPeriodoCreditado || 'ainda não creditado'

  return (
    <>
      <Faixa ok={location.state?.mensagem} aviso={professor?.aviso} erro={erro} />
      {professor ? (
        <>
          <Cabecalho titulo={professor.nome}>
            <p>{professor.departamento} · {professor.instituicaoNome}</p>
          </Cabecalho>
          <Saldo valor={professor.saldoMoedas} nota="A cada semestre o sistema soma 1.000 moedas ao saldo.">
            <Link className="botao amarelo" to="/professor/enviar">Enviar moedas</Link>
            <Link className="botao claro" to="/professor/extrato">Ver extrato</Link>
          </Saldo>
          <dl className="fatos">
            <div><dt>Semestre reconhecido</dt><dd>{semestre}</dd></div>
            <div><dt>Crédito por semestre</dt><dd>1.000 moedas</dd></div>
          </dl>
          <Movimentos
            titulo="Últimos envios"
            legenda="Cada bloco é um envio"
            vazio="Nenhum envio ainda. Escolha um aluno em Enviar moedas e registre o motivo."
            lista={movimentos}
            limite={5}
          />
        </>
      ) : null}
    </>
  )
}
