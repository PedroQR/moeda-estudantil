import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSessao } from '../sessao'
import { destino } from '../util'

export default function NaoExiste() {
  const { sessao } = useSessao()
  useEffect(() => { document.title = 'Página não encontrada' }, [])

  return (
    <section className="nao-existe">
      <p className="nao-existe-codigo" aria-hidden="true">404</p>
      <h1>Essa página não existe.</h1>
      <p>O endereço pode ter mudado ou foi digitado errado.</p>
      <div className="acoes">
        <Link className="botao" to={sessao ? destino(sessao.papel) : '/'}>{sessao ? 'Voltar ao meu balcão' : 'Ir para o início'}</Link>
      </div>
    </section>
  )
}
