import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { api } from '../api'
import { Movimentos } from '../componentes/Listas'
import { Cabecalho, Carregando, Exclusao, Faixa, Saldo } from '../componentes/Ui'
import { useSessao } from '../sessao'
import { movimentosAluno } from '../util'

export default function PainelAluno() {
  const { setSaldo, setSessao } = useSessao()
  const location = useLocation()
  const navigate = useNavigate()
  const [aluno, setAluno] = useState(null)
  const [movimentos, setMovimentos] = useState([])
  const [erro, setErro] = useState('')

  useEffect(() => { document.title = 'Meu balcão' }, [])

  useEffect(() => {
    let ativo = true
    Promise.all([api('/api/aluno'), api('/api/aluno/extrato')])
      .then(([dados, extrato]) => {
        if (!ativo) return
        setAluno(dados)
        setSaldo(dados.saldoMoedas)
        setMovimentos(movimentosAluno(extrato))
      })
      .catch((e) => { if (ativo) setErro(e.message) })
    return () => { ativo = false }
  }, [setSaldo])

  async function excluir() {
    if (!window.confirm('Excluir seu cadastro?')) return
    try {
      const resposta = await api('/api/aluno', { method: 'DELETE' })
      setSessao(null)
      setSaldo(null)
      navigate('/entrar', { state: { mensagem: resposta.mensagem } })
    } catch (e) {
      setErro(e.message)
    }
  }

  if (!aluno && !erro) return <Carregando />

  return (
    <>
      <Faixa ok={location.state?.mensagem} erro={erro} />
      {aluno ? (
        <>
          <Cabecalho titulo={aluno.nome}>
            <p>{aluno.curso} · {aluno.instituicaoNome}</p>
          </Cabecalho>
          <Saldo valor={aluno.saldoMoedas}>
            <Link className="botao amarelo" to="/aluno/vantagens">Resgatar vantagem</Link>
            <Link className="botao claro" to="/aluno/extrato">Ver extrato</Link>
          </Saldo>
          <Movimentos
            titulo="Últimos movimentos"
            legenda="Azul entrou, preto saiu"
            vazio="Nenhum movimento ainda. Quando um professor enviar moedas, elas aparecem aqui."
            lista={movimentos}
            limite={5}
          />
          <Exclusao
            titulo="Excluir cadastro"
            texto="Remove seu cadastro e encerra o acesso. Não dá para desfazer."
            rotulo="Excluir meu cadastro"
            aoExcluir={excluir}
          />
        </>
      ) : null}
    </>
  )
}
