import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { api } from '../api'
import { Emails, Movimentos } from '../componentes/Listas'
import { Cabecalho, Carregando, Faixa, Saldo } from '../componentes/Ui'
import { useSessao } from '../sessao'
import { moedas, movimentosProfessor } from '../util'

export default function ExtratoProfessor() {
  const { setSaldo } = useSessao()
  const location = useLocation()
  const [extrato, setExtrato] = useState(null)
  const [erro, setErro] = useState('')

  useEffect(() => { document.title = 'Extrato' }, [])

  useEffect(() => {
    let ativo = true
    api('/api/professor/extrato')
      .then((dados) => {
        if (!ativo) return
        setExtrato(dados)
        setSaldo(dados.saldoMoedas)
      })
      .catch((e) => { if (ativo) setErro(e.message) })
    return () => { ativo = false }
  }, [setSaldo])

  if (!extrato && !erro) return <Carregando />
  if (!extrato) return <Faixa erro={erro} />

  const enviado = extrato.envios.reduce((soma, item) => soma + item.valor, 0)
  const alunos = new Set(extrato.envios.map((item) => item.alunoNome)).size

  return (
    <>
      <Faixa ok={location.state?.mensagem} aviso={extrato.aviso} erro={erro} />
      <Cabecalho titulo="Extrato" />
      <Saldo valor={extrato.saldoMoedas} compacto />
      <Movimentos
        titulo="Envios"
        resumo={`−${moedas(enviado)} para ${alunos} ${alunos === 1 ? 'aluno' : 'alunos'}`}
        legenda="Cada bloco é um envio"
        vazio="Nenhum envio."
        lista={movimentosProfessor(extrato.envios)}
      />
      <Emails lista={extrato.emails} />
    </>
  )
}
