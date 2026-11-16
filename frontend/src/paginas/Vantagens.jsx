import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api'
import { Cabecalho, Carregando, Faixa, Foto, Saldo } from '../componentes/Ui'
import { useSessao } from '../sessao'
import { fotoSegura, moedas } from '../util'

export default function Vantagens() {
  const { setSaldo } = useSessao()
  const navigate = useNavigate()
  const [dados, setDados] = useState(null)
  const [erro, setErro] = useState('')

  useEffect(() => { document.title = 'Vantagens' }, [])

  useEffect(() => {
    let ativo = true
    api('/api/aluno/vantagens')
      .then((resposta) => {
        if (!ativo) return
        setDados(resposta)
        setSaldo(resposta.saldoMoedas)
      })
      .catch((e) => { if (ativo) setErro(e.message) })
    return () => { ativo = false }
  }, [setSaldo])

  async function resgatar(id) {
    if (!window.confirm('Resgatar esta vantagem?')) return
    try {
      const feito = await api(`/api/aluno/vantagens/${id}/resgatar`, { method: 'POST' })
      navigate('/aluno/extrato', { state: { mensagem: feito.mensagem } })
    } catch (e) {
      setErro(e.message)
    }
  }

  if (!dados && !erro) return <Carregando />

  const alcancaveis = dados ? dados.vantagens.filter((item) => dados.saldoMoedas >= item.custoEmMoedas).length : 0

  return (
    <>
      <Faixa erro={erro} />
      <Cabecalho titulo="Vantagens">
        {dados && dados.vantagens.length > 0 ? (
          <p>{alcancaveis} de {dados.vantagens.length} ao alcance do seu saldo.</p>
        ) : null}
      </Cabecalho>
      {dados ? <Saldo valor={dados.saldoMoedas} compacto /> : null}
      {dados && dados.vantagens.length === 0 ? <p className="vazio-bloco">Nenhuma vantagem cadastrada ainda.</p> : null}
      {dados && dados.vantagens.length > 0 ? (
        <ul className="vitrine">
          {dados.vantagens.map((vantagem) => {
            const falta = vantagem.custoEmMoedas - dados.saldoMoedas
            const pode = falta <= 0
            return (
              <li className={pode ? 'peca' : 'peca fora'} key={vantagem.id}>
                <Foto url={fotoSegura(vantagem.fotoUrl)} alt="Foto da vantagem" />
                <div className="peca-corpo">
                  <p className="peca-empresa">{vantagem.empresaNome}</p>
                  <h2>{vantagem.descricao}</h2>
                </div>
                <p className="peca-preco">
                  <span><strong>{moedas(vantagem.custoEmMoedas)}</strong> moedas</span>
                  {pode ? null : <span className="peca-falta">Faltam {moedas(falta)}</span>}
                </p>
                <button className="botao" type="button" disabled={!pode} onClick={() => resgatar(vantagem.id)}>Resgatar</button>
              </li>
            )
          })}
        </ul>
      ) : null}
    </>
  )
}
