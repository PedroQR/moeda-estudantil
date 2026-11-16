import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { api } from '../api'
import { Emails, Tabela } from '../componentes/Listas'
import { Cabecalho, Carregando, Exclusao, Faixa, Foto } from '../componentes/Ui'
import { useSessao } from '../sessao'
import { fotoSegura, moedas, quando } from '../util'

export default function PainelEmpresa() {
  const { setSessao } = useSessao()
  const location = useLocation()
  const navigate = useNavigate()
  const [painel, setPainel] = useState(null)
  const [erro, setErro] = useState('')

  useEffect(() => { document.title = 'Meu balcão' }, [])

  function carregar() {
    return api('/api/empresa').then(setPainel).catch((e) => setErro(e.message))
  }

  useEffect(() => {
    let ativo = true
    api('/api/empresa')
      .then((dados) => { if (ativo) setPainel(dados) })
      .catch((e) => { if (ativo) setErro(e.message) })
    return () => { ativo = false }
  }, [])

  async function excluirVantagem(id) {
    if (!window.confirm('Excluir esta vantagem?')) return
    try {
      const resposta = await api(`/api/empresa/vantagens/${id}`, { method: 'DELETE' })
      setErro('')
      await carregar()
      navigate('/empresa', { replace: true, state: { mensagem: resposta.mensagem } })
    } catch (e) {
      setErro(e.message)
    }
  }

  async function excluirCadastro() {
    if (!window.confirm('Excluir o cadastro da empresa?')) return
    try {
      const resposta = await api('/api/empresa', { method: 'DELETE' })
      setSessao(null)
      navigate('/entrar', { state: { mensagem: resposta.mensagem } })
    } catch (e) {
      setErro(e.message)
    }
  }

  if (!painel && !erro) return <Carregando />

  return (
    <>
      <Faixa ok={location.state?.mensagem} erro={erro} />
      {painel ? (
        <>
          <Cabecalho
            titulo={painel.empresa.nome}
            acoes={(
              <>
                <Link className="botao" to="/empresa/vantagens/nova">Nova vantagem</Link>
                <Link className="botao secundario" to="/empresa/editar">Editar cadastro</Link>
              </>
            )}
          >
            <p>{painel.empresa.email}</p>
          </Cabecalho>
          <section aria-labelledby="vantagens-titulo">
            <div className="secao-topo">
              <h2 id="vantagens-titulo">Vantagens</h2>
            </div>
            {painel.vantagens.length === 0 ? (
              <p className="vazio-bloco">Nenhuma vantagem cadastrada. Inclua descrição, foto e custo em moedas em <Link to="/empresa/vantagens/nova">Nova vantagem</Link>.</p>
            ) : (
              <ul className="vitrine">
                {painel.vantagens.map((vantagem) => (
                  <li className="peca" key={vantagem.id}>
                    <Foto url={fotoSegura(vantagem.fotoUrl)} alt="Foto da vantagem" />
                    <div className="peca-corpo">
                      <h3>{vantagem.descricao}</h3>
                    </div>
                    <p className="peca-preco"><span><strong>{moedas(vantagem.custoEmMoedas)}</strong> moedas</span></p>
                    <div className="acoes">
                      <Link className="botao secundario pequeno" to={`/empresa/vantagens/${vantagem.id}`}>Editar</Link>
                      <button className="botao perigo pequeno" type="button" onClick={() => excluirVantagem(vantagem.id)}>Excluir</button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
          <section aria-labelledby="resgates-titulo">
            <div className="secao-topo">
              <h2 id="resgates-titulo">Resgates para conferência</h2>
              <p className="legenda">Confira o código do cupom apresentado pelo aluno.</p>
            </div>
            <Tabela
              colunas={['Data', 'Aluno', 'Vantagem', 'Cupom']}
              vazio="Nenhum resgate ainda."
              linhas={painel.resgates.map((item) => (
                <tr key={item.codigoCupom}>
                  <td className="data">{quando(item.dataHora)}</td>
                  <td className="forte">{item.alunoNome}</td>
                  <td>{item.vantagemDescricao}</td>
                  <td><span className="cupom">{item.codigoCupom}</span></td>
                </tr>
              ))}
            />
          </section>
          <Emails lista={painel.emails} />
          <Exclusao
            titulo="Excluir cadastro"
            texto="Remove o cadastro da empresa e encerra o acesso. Não dá para desfazer."
            rotulo="Excluir meu cadastro"
            aoExcluir={excluirCadastro}
          />
        </>
      ) : null}
    </>
  )
}
