import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useSessao } from '../sessao'
import { destino, moedas, rotuloPapel } from '../util'
import { Carregando, Marca } from './Ui'

const LINKS = {
  ALUNO: [
    ['/aluno', 'Meu balcão', true],
    ['/aluno/vantagens', 'Vantagens', false],
    ['/aluno/extrato', 'Extrato', false],
    ['/aluno/editar', 'Meus dados', false],
  ],
  PROFESSOR: [
    ['/professor', 'Meu balcão', true],
    ['/professor/enviar', 'Enviar moedas', false],
    ['/professor/extrato', 'Extrato', false],
  ],
  EMPRESA: [
    ['/empresa', 'Meu balcão', true],
    ['/empresa/vantagens/nova', 'Nova vantagem', false],
    ['/empresa/editar', 'Meus dados', false],
  ],
}

function ativo({ isActive }) {
  return isActive ? 'ativo' : undefined
}

export default function Moldura() {
  const { sessao, saldo, sair } = useSessao()
  const navigate = useNavigate()

  async function encerrar() {
    const mensagem = await sair()
    navigate('/entrar', { state: { mensagem } })
  }

  const pular = <a className="pular" href="#conteudo">Ir para o conteúdo</a>

  if (sessao) {
    return (
      <>
        {pular}
        <div className="app">
          <aside className="trilho">
            <NavLink className="marca" to={destino(sessao.papel)} aria-label="Moeda, início">
              <Marca />
              <span>moeda</span>
            </NavLink>
            <nav className="trilho-nav" aria-label="Seções">
              {LINKS[sessao.papel].map(([to, rotulo, fim]) => (
                <NavLink key={to} to={to} end={fim} className={ativo}>{rotulo}</NavLink>
              ))}
            </nav>
            <div className="trilho-pe">
              <p className="quem">
                <strong>{sessao.nome}</strong>
                <span>{rotuloPapel(sessao.papel)}</span>
              </p>
              {saldo != null && sessao.papel !== 'EMPRESA' ? (
                <p className="trilho-saldo"><span>{moedas(saldo)}</span> moedas</p>
              ) : null}
              <button className="sair" type="button" onClick={encerrar}>Sair</button>
            </div>
          </aside>
          <main className="miolo" id="conteudo">
            <Outlet />
          </main>
        </div>
      </>
    )
  }

  return (
    <>
      {pular}
      <header className="topo">
        <NavLink className="marca" to="/" aria-label="Moeda, início">
          <Marca />
          <span>moeda</span>
        </NavLink>
        {sessao === null ? (
          <nav className="topo-nav" aria-label="Acesso">
            <NavLink to="/entrar" className={ativo}>Entrar</NavLink>
            <NavLink to="/cadastro/aluno" className={ativo}>Cadastrar aluno</NavLink>
            <NavLink to="/cadastro/empresa" className={ativo}>Cadastrar empresa</NavLink>
          </nav>
        ) : null}
      </header>
      <main className="miolo visitante" id="conteudo">
        {sessao === undefined ? <Carregando /> : <Outlet />}
      </main>
    </>
  )
}
