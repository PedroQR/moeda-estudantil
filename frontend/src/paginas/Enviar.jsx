import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../api'
import { Cabecalho, Faixa } from '../componentes/Ui'
import { useSessao } from '../sessao'
import { moedas } from '../util'

export default function Enviar() {
  const { setSaldo, saldo } = useSessao()
  const navigate = useNavigate()
  const [alunos, setAlunos] = useState([])
  const [alunoId, setAlunoId] = useState('')
  const [valor, setValor] = useState('')
  const [motivo, setMotivo] = useState('')
  const [erro, setErro] = useState('')
  const [aviso, setAviso] = useState('')
  const [enviando, setEnviando] = useState(false)

  useEffect(() => { document.title = 'Enviar moedas' }, [])

  useEffect(() => {
    let ativo = true
    Promise.all([api('/api/professor'), api('/api/professor/alunos')])
      .then(([professor, lista]) => {
        if (!ativo) return
        setSaldo(professor.saldoMoedas)
        setAviso(professor.aviso || '')
        setAlunos(lista)
      })
      .catch((e) => { if (ativo) setErro(e.message) })
    return () => { ativo = false }
  }, [setSaldo])

  async function enviar(event) {
    event.preventDefault()
    setEnviando(true)
    setErro('')
    try {
      const resposta = await api('/api/professor/envios', {
        method: 'POST',
        json: { alunoId: Number(alunoId), valor: Number(valor), motivo },
      })
      setSaldo(resposta.saldoMoedas)
      navigate('/professor/extrato', { state: { mensagem: resposta.mensagem } })
    } catch (e) {
      setErro(e.message)
      if (e.aviso) setAviso(e.aviso)
      setEnviando(false)
    }
  }

  const quantia = Number(valor) > 0 ? Number(valor) : 0
  const depois = saldo != null ? saldo - quantia : null
  const excede = depois != null && depois < 0
  const escolhido = alunos.find((aluno) => String(aluno.id) === alunoId)

  return (
    <>
      <Faixa erro={erro} aviso={aviso} />
      <Cabecalho titulo="Enviar moedas">
        <p>Escolha o aluno, a quantidade e registre o motivo do reconhecimento.</p>
      </Cabecalho>
      <div className="envio">
        <form className="formulario uma-coluna" onSubmit={enviar}>
          <div className="campo">
            <label htmlFor="alunoId">Aluno</label>
            <select id="alunoId" value={alunoId} required onChange={(event) => setAlunoId(event.target.value)}>
              <option value="">Selecione</option>
              {alunos.map((aluno) => (
                <option key={aluno.id} value={aluno.id}>{aluno.nome}, {aluno.curso}, {aluno.instituicaoNome}</option>
              ))}
            </select>
          </div>
          <div className="campo">
            <label htmlFor="valor">Quantidade</label>
            <input id="valor" type="number" min="1" inputMode="numeric" required value={valor} aria-describedby="valor-ajuda" onChange={(event) => setValor(event.target.value)} />
            <p className={excede ? 'ajuda erro' : 'ajuda'} id="valor-ajuda">
              {excede ? `Passa do seu saldo em ${moedas(-depois)} moedas.` : 'Número inteiro de moedas.'}
            </p>
          </div>
          <div className="campo">
            <label htmlFor="motivo">Motivo</label>
            <textarea id="motivo" maxLength={500} required value={motivo} aria-describedby="motivo-ajuda" onChange={(event) => setMotivo(event.target.value)} />
            <p className="ajuda" id="motivo-ajuda">O aluno recebe este texto por e-mail. {motivo.length}/500</p>
          </div>
          <div className="acoes">
            <button className="botao" type="submit" disabled={enviando || alunos.length === 0}>{enviando ? 'Enviando…' : 'Enviar'}</button>
            <Link className="botao secundario" to="/professor">Cancelar</Link>
          </div>
          {alunos.length === 0 ? <p className="vazio-bloco">Nenhum aluno cadastrado ainda.</p> : null}
        </form>
        {saldo != null ? (
          <aside className="previa" aria-live="polite" aria-label="Prévia do saldo">
            <dl>
              <div><dt>Saldo atual</dt><dd>{moedas(saldo)}</dd></div>
              <div><dt>Este envio</dt><dd>{quantia ? `−${moedas(quantia)}` : '0'}</dd></div>
              <div className={excede ? 'previa-final excede' : 'previa-final'}><dt>Depois do envio</dt><dd>{moedas(depois)}</dd></div>
            </dl>
            <p className="previa-para">{escolhido ? <>Para <strong>{escolhido.nome}</strong>, {escolhido.curso}</> : 'Nenhum aluno escolhido.'}</p>
          </aside>
        ) : null}
      </div>
    </>
  )
}
