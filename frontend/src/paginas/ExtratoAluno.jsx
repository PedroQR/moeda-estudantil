import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { api } from '../api'
import { Emails, Movimentos } from '../componentes/Listas'
import { Cabecalho, Carregando, Faixa, Saldo } from '../componentes/Ui'
import { useSessao } from '../sessao'
import { moedas, movimentosAluno } from '../util'

export default function ExtratoAluno() {
  const { setSaldo } = useSessao()
  const location = useLocation()
  const [extrato, setExtrato] = useState(null)
  const [erro, setErro] = useState('')

  useEffect(() => { document.title = 'Extrato' }, [])

  useEffect(() => {
    let ativo = true
    api('/api/aluno/extrato')
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

  const recebido = extrato.recebimentos.reduce((soma, item) => soma + item.valor, 0)
  const resgatado = extrato.resgates.reduce((soma, item) => soma + item.valor, 0)

  return (
    <>
      <Faixa ok={location.state?.mensagem} erro={erro} />
      <Cabecalho titulo="Extrato" />
      <Saldo valor={extrato.saldoMoedas} compacto />
      <Movimentos
        titulo="Movimentos"
        resumo={<><span className="entrada">+{moedas(recebido)}</span> recebidas · −{moedas(resgatado)} em {extrato.resgates.length} {extrato.resgates.length === 1 ? 'cupom' : 'cupons'}</>}
        legenda="Azul: recebidas de professores · Preto: resgates"
        vazio="Nenhuma moeda recebida e nenhum resgate."
        lista={movimentosAluno(extrato)}
      />
      <Emails lista={extrato.emails} />
    </>
  )
}
