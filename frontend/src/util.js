export function destino(papel) {
  if (papel === 'PROFESSOR') return '/professor'
  if (papel === 'EMPRESA') return '/empresa'
  return '/aluno'
}

export function rotuloPapel(papel) {
  if (papel === 'PROFESSOR') return 'professor'
  if (papel === 'EMPRESA') return 'empresa'
  return 'aluno'
}

export function quando(iso) {
  if (!iso) return ''
  const data = new Date(iso)
  if (Number.isNaN(data.getTime())) return String(iso)
  return data.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function moedas(valor) {
  const numero = Number(valor)
  if (!Number.isFinite(numero)) return '0'
  return numero.toLocaleString('pt-BR')
}

export function fotoSegura(url) {
  return typeof url === 'string' && url.startsWith('/uploads/') ? url : ''
}

export function tomEmail(status) {
  const texto = String(status || '').toLowerCase()
  if (texto.startsWith('enviado')) return 'ok'
  if (texto.startsWith('aguardando')) return 'espera'
  if (texto.includes('não concluído')) return 'falha'
  return 'neutro'
}

export function movimentosAluno(extrato) {
  const entradas = extrato.recebimentos.map((item, indice) => ({
    chave: `r${indice}`,
    tipo: 'entrada',
    dataHora: item.dataHora,
    valor: item.valor,
    titulo: `Recebido de ${item.professorNome}`,
    detalhe: item.motivo,
  }))
  const saidas = extrato.resgates.map((item, indice) => ({
    chave: `s${indice}`,
    tipo: 'saida',
    dataHora: item.dataHora,
    valor: item.valor,
    titulo: `Resgate · ${item.empresaNome}`,
    detalhe: item.vantagemDescricao,
    cupom: item.codigoCupom,
  }))
  return ordenarRecentes([...entradas, ...saidas])
}

export function movimentosProfessor(envios) {
  return ordenarRecentes(envios.map((item, indice) => ({
    chave: `e${indice}`,
    tipo: 'saida',
    dataHora: item.dataHora,
    valor: item.valor,
    titulo: `Enviado para ${item.alunoNome}`,
    detalhe: item.motivo,
  })))
}

function ordenarRecentes(lista) {
  return lista.sort((a, b) => new Date(b.dataHora) - new Date(a.dataHora))
}
