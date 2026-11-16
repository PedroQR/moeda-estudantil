import { useEffect, useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { api } from '../api'
import { Campo, Faixa } from '../componentes/Ui'
import { useSessao } from '../sessao'
import { destino } from '../util'

const DEMO = [
  ['Marina Alves', 'aluno@pucminas.br', 'aluno123', 'Aluna · 500 moedas'],
  ['Cantina do Campus', 'empresa@pucminas.br', 'empresa123', 'Empresa · café, cinema e livro'],
  ['Ana Souza', 'ana.souza@pucminas.br', 'prof123', 'Professora · PUC Minas'],
  ['Carlos Lima', 'carlos.lima@ufmg.br', 'prof123', 'Professor · UFMG'],
]

export default function Entrar() {
  const { sessao, setSessao } = useSessao()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [enviando, setEnviando] = useState(false)

  useEffect(() => { document.title = 'Entrar' }, [])
  if (sessao) return <Navigate to={destino(sessao.papel)} replace />

  async function enviar(event) {
    event.preventDefault()
    setEnviando(true)
    setErro('')
    try {
      const nova = await api('/api/sessao', { method: 'POST', json: { email, senha } })
      setSessao(nova)
      navigate(destino(nova.papel), { replace: true })
    } catch (e) {
      setErro(e.message)
      setEnviando(false)
    }
  }

  function usarDemo(conta, senha) {
    setEmail(conta)
    setSenha(senha)
    setErro('')
  }

  return (
    <div className="dupla">
      <section className="dupla-principal">
        <Faixa ok={location.state?.mensagem} erro={erro} />
        <h1>Entrar</h1>
        <form className="formulario estreito" onSubmit={enviar}>
          <Campo id="email" rotulo="E-mail" tipo="email" valor={email} aoMudar={setEmail} obrigatorio autoComplete="username" largo />
          <Campo id="senha" rotulo="Senha" tipo="password" valor={senha} aoMudar={setSenha} obrigatorio autoComplete="current-password" largo />
          <div className="acoes">
            <button className="botao" type="submit" disabled={enviando}>{enviando ? 'Entrando…' : 'Entrar'}</button>
          </div>
        </form>
        <div className="sem-conta">
          <p>Ainda não tem conta?</p>
          <div className="acoes">
            <Link className="botao secundario" to="/cadastro/aluno">Cadastrar aluno</Link>
            <Link className="botao secundario" to="/cadastro/empresa">Cadastrar empresa</Link>
          </div>
        </div>
      </section>
      <aside className="dupla-lado demo" aria-labelledby="demo-titulo">
        <h2 id="demo-titulo">Contas de demonstração</h2>
        <p>Escolha uma conta para preencher o formulário. A senha aparece em cada cartão.</p>
        <ul className="demo-lista">
          {DEMO.map(([nome, conta, senha, detalhe]) => (
            <li key={conta}>
              <button type="button" className="demo-conta" onClick={() => usarDemo(conta, senha)}>
                <strong>{nome}</strong>
                <span>{conta}</span>
                <span>Senha {senha} · {detalhe}</span>
              </button>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  )
}
