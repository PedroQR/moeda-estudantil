import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { api } from '../api'
import { Cabecalho, Carregando, Faixa, Foto } from '../componentes/Ui'
import { fotoSegura, moedas } from '../util'

export default function FormVantagem() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [descricao, setDescricao] = useState('')
  const [custo, setCusto] = useState('')
  const [fotoAtual, setFotoAtual] = useState('')
  const [arquivo, setArquivo] = useState(null)
  const [previa, setPrevia] = useState('')
  const [erro, setErro] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [pronto, setPronto] = useState(!id)

  useEffect(() => {
    document.title = id ? 'Editar vantagem' : 'Nova vantagem'
  }, [id])

  useEffect(() => {
    if (!id) return undefined
    let ativo = true
    api(`/api/empresa/vantagens/${id}`)
      .then((vantagem) => {
        if (!ativo) return
        setDescricao(vantagem.descricao)
        setCusto(String(vantagem.custoEmMoedas))
        setFotoAtual(fotoSegura(vantagem.fotoUrl))
        setPronto(true)
      })
      .catch((e) => { if (ativo) setErro(e.message) })
    return () => { ativo = false }
  }, [id])

  useEffect(() => {
    if (!arquivo) {
      setPrevia('')
      return undefined
    }
    const url = URL.createObjectURL(arquivo)
    setPrevia(url)
    return () => URL.revokeObjectURL(url)
  }, [arquivo])

  async function enviar(event) {
    event.preventDefault()
    setEnviando(true)
    setErro('')
    const pedido = new FormData()
    pedido.set('descricao', descricao)
    pedido.set('custoEmMoedas', custo)
    if (arquivo) pedido.set('foto', arquivo)
    try {
      const resposta = await api(id ? `/api/empresa/vantagens/${id}` : '/api/empresa/vantagens', {
        method: 'POST',
        body: pedido,
      })
      navigate('/empresa', { state: { mensagem: resposta.mensagem } })
    } catch (e) {
      setErro(e.message)
      setEnviando(false)
    }
  }

  if (!pronto && !erro) return <Carregando />

  return (
    <>
      <Faixa erro={erro} />
      <Cabecalho titulo={id ? 'Editar vantagem' : 'Nova vantagem'}>
        <p>É assim que o aluno vê a vantagem no catálogo.</p>
      </Cabecalho>
      <div className="envio">
        <form className="formulario uma-coluna" onSubmit={enviar}>
          <div className="campo">
            <label htmlFor="descricao">Descrição</label>
            <textarea id="descricao" maxLength={500} required value={descricao} onChange={(event) => setDescricao(event.target.value)} />
          </div>
          <div className="campo">
            <label htmlFor="custo">Custo em moedas</label>
            <input id="custo" type="number" min="1" inputMode="numeric" required value={custo} onChange={(event) => setCusto(event.target.value)} />
          </div>
          <div className="campo">
            <label htmlFor="foto">Foto do produto</label>
            <input id="foto" type="file" accept="image/png,image/jpeg,image/webp,image/gif" required={!id} onChange={(event) => setArquivo(event.target.files[0] || null)} />
            <p className="ajuda">PNG, JPEG, WebP ou GIF.{id ? ' Sem arquivo novo, a foto atual continua.' : ''}</p>
          </div>
          <div className="acoes">
            <button className="botao" type="submit" disabled={enviando}>{enviando ? 'Salvando…' : 'Salvar'}</button>
            <Link className="botao secundario" to="/empresa">Cancelar</Link>
          </div>
        </form>
        <aside className="previa-peca" aria-label="Prévia no catálogo">
          <div className="peca">
            <Foto url={previa || fotoAtual} alt={previa || fotoAtual ? 'Foto da vantagem' : 'Sem foto escolhida'} />
            <div className="peca-corpo">
              <h2>{descricao || 'Descrição da vantagem'}</h2>
            </div>
            <p className="peca-preco"><span><strong>{custo ? moedas(custo) : '0'}</strong> moedas</span></p>
          </div>
        </aside>
      </div>
    </>
  )
}
