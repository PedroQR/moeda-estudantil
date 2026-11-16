import { Navigate } from 'react-router-dom'
import { useSessao } from '../sessao'
import { destino, moedas } from '../util'

export function Exige({ papel, children }) {
  const { sessao } = useSessao()
  if (sessao === undefined) return <Carregando />
  if (!sessao) return <Navigate to="/entrar" replace />
  if (sessao.papel !== papel) return <Navigate to={destino(sessao.papel)} replace />
  return children
}

export function Carregando() {
  return <p className="carregando" role="status">Carregando</p>
}

export function Marca({ tamanho = 32 }) {
  return (
    <svg className="sinal" width={tamanho} height={tamanho} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 0H0v12A12 12 0 0 1 12 0Z" className="sinal-cor" />
      <rect x="12" y="0" width="12" height="12" className="sinal-base" />
      <rect x="0" y="12" width="12" height="12" className="sinal-base" />
      <path d="M12 24h12V12a12 12 0 0 1-12 12Z" className="sinal-cor" />
    </svg>
  )
}

export function Faixa({ ok, erro, aviso }) {
  if (!ok && !erro && !aviso) return null
  return (
    <div className="faixas">
      {ok ? <p className="faixa">{ok}</p> : null}
      {aviso ? <p className="faixa">{aviso}</p> : null}
      {erro ? <p className="faixa erro" role="alert">{erro}</p> : null}
    </div>
  )
}

export function Cabecalho({ titulo, children, acoes }) {
  return (
    <header className="cabecalho">
      <div>
        <h1>{titulo}</h1>
        {children ? <div className="cabecalho-sub">{children}</div> : null}
      </div>
      {acoes ? <div className="acoes">{acoes}</div> : null}
    </header>
  )
}

export function Saldo({ valor, rotulo = 'Saldo disponível', nota, compacto = false, children }) {
  return (
    <section className={compacto ? 'saldo compacto' : 'saldo'} aria-label={rotulo}>
      <div className="saldo-numero">
        <p className="saldo-rotulo">{rotulo}</p>
        <p className="saldo-valor">
          <span>{moedas(valor)}</span>
          <small>moedas</small>
        </p>
        {nota ? <p className="saldo-nota">{nota}</p> : null}
      </div>
      {children ? <div className="saldo-acoes">{children}</div> : null}
    </section>
  )
}

export function Campo({ id, rotulo, tipo = 'text', valor, aoMudar, obrigatorio, placeholder, autoComplete, min, maxLength, largo }) {
  return (
    <div className={largo ? 'campo largo' : 'campo'}>
      <label htmlFor={id}>{rotulo}</label>
      <input
        id={id}
        name={id}
        type={tipo}
        value={valor}
        onChange={(event) => aoMudar(event.target.value)}
        required={obrigatorio}
        placeholder={placeholder}
        autoComplete={autoComplete}
        min={min}
        maxLength={maxLength}
      />
    </div>
  )
}

export function Foto({ url, alt }) {
  if (url) return <img className="foto" src={url} alt={alt} />
  return (
    <div className="foto sem-foto" role="img" aria-label={alt}>
      <Marca tamanho={40} />
    </div>
  )
}

export function Exclusao({ titulo, texto, rotulo, aoExcluir }) {
  return (
    <section className="exclusao" aria-labelledby="exclusao-titulo">
      <div>
        <h2 id="exclusao-titulo">{titulo}</h2>
        <p>{texto}</p>
      </div>
      <button className="botao perigo" type="button" onClick={aoExcluir}>{rotulo}</button>
    </section>
  )
}
