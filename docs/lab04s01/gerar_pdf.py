"""Gera o PDF da Lab04S01. Dependências: reportlab e Pillow."""
from pathlib import Path
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4, A3, landscape
from reportlab.lib.units import mm
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

pdfmetrics.registerFont(TTFont("Arial", r"C:\Windows\Fonts\arial.ttf"))
pdfmetrics.registerFont(TTFont("Arial-Bold", r"C:\Windows\Fonts\arialbd.ttf"))

ROOT = Path(__file__).resolve().parent
IMAGES = ROOT / "images"
OUT = ROOT / "Lab04S01_Moeda_Estudantil.pdf"


def build() -> Path:
    pdf = canvas.Canvas(str(OUT))
    pdf.setTitle("Lab04S01 — Moeda Estudantil")
    diagrams = [
        ("Visão geral de interação", "visao-geral-interacao.png", A3),
        ("UC01 — Realizar login", "sequencia-uc01-login.png", A4),
        ("UC02 — Cadastrar aluno", "sequencia-uc02-cadastrar-aluno.png", A4),
        ("UC03 — Cadastrar empresa parceira", "sequencia-uc03-cadastrar-empresa.png", A4),
        ("UC04 — Cadastrar vantagens", "sequencia-uc04-cadastrar-vantagem.png", A4),
        ("UC05 — Enviar moedas ao aluno", "sequencia-uc05-enviar-moedas.png", A4),
        ("UC06 — Consultar extrato", "sequencia-uc06-consultar-extrato.png", A4),
        ("UC07 — Resgatar vantagem", "sequencia-uc07-resgatar-vantagem.png", A4),
        ("UC08 — Notificar recebimento de moedas", "sequencia-uc08-notificar-recebimento.png", A4),
        ("UC09 — Enviar cupom de resgate", "sequencia-uc09-enviar-cupom.png", A4),
        ("UC10 — Creditar moedas semestrais", "sequencia-uc10-credito-semestral.png", A4),
    ]
    for title, filename, size in diagrams:
        width, height = landscape(size)
        pdf.setPageSize((width, height))
        margin = 12 * mm
        pdf.setFont("Arial-Bold", 14)
        pdf.drawString(margin, height - margin - 14, title)
        image = ImageReader(str(IMAGES / filename))
        image_w, image_h = image.getSize()
        available_h = height - 2 * margin - 30
        ratio = min((width - 2 * margin) / image_w, available_h / image_h)
        draw_w, draw_h = image_w * ratio, image_h * ratio
        pdf.drawImage(image, (width - draw_w) / 2, margin + (available_h - draw_h) / 2,
                      width=draw_w, height=draw_h, preserveAspectRatio=True, mask="auto")
        pdf.showPage()
    pdf.save()
    return OUT


if __name__ == "__main__":
    print(f"PDF gerado: {build()}")
