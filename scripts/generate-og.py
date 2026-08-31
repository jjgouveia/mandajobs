"""Generate the Manda Jobs Open Graph image (1200x630)."""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
YELLOW = (253, 245, 0)
BLUE = (0, 51, 255)
PINK = (255, 61, 110)
INK = (19, 19, 19)
PAPER = (245, 240, 230)
WHITE = (255, 255, 255)

FONTS = Path(r"C:\Windows\Fonts")
OUT = Path(__file__).resolve().parents[1] / "public" / "og.png"


def font(name: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(FONTS / name), size)


def draw_shadow_rect(draw: ImageDraw.ImageDraw, box, fill, shadow=8):
    x0, y0, x1, y1 = box
    draw.rectangle((x0 + shadow, y0 + shadow, x1 + shadow, y1 + shadow), fill=INK)
    draw.rectangle(box, fill=fill, outline=INK, width=5)


def main() -> None:
    img = Image.new("RGB", (W, H), PAPER)
    draw = ImageDraw.Draw(img)

    draw.rectangle((0, 0, W - 1, H - 1), outline=INK, width=16)
    draw.rectangle((16, 16, W - 17, H - 17), outline=INK, width=3)

    display = font("arialbd.ttf", 58)
    stamp = font("arialbd.ttf", 42)
    display_sm = font("arialbd.ttf", 28)
    body = font("arial.ttf", 26)
    mono = font("consola.ttf", 26)
    chip = font("arialbd.ttf", 22)
    small = font("arialbd.ttf", 20)

    draw_shadow_rect(draw, (64, 52, 310, 108), YELLOW, shadow=6)
    draw.text((86, 64), "MANDA JOBS", font=display_sm, fill=INK)

    draw.text((64, 142), "SEU FILTRO", font=display, fill=INK)
    draw.text((64, 206), "INTELIGENTE", font=display, fill=INK)
    draw.text((64, 270), "DE VAGAS", font=display, fill=INK)

    linkedin_box = (64, 348, 318, 416)
    web_box = (338, 348, 548, 416)
    draw_shadow_rect(draw, linkedin_box, INK, shadow=6)
    draw.text((80, 360), "LINKEDIN", font=stamp, fill=YELLOW)
    draw_shadow_rect(draw, web_box, BLUE, shadow=6)
    draw.text((362, 360), "NA WEB", font=stamp, fill=WHITE)

    draw.text(
        (64, 452),
        "Consultas booleanas com IA.",
        font=body,
        fill=INK,
    )
    draw.text(
        (64, 488),
        "Gratuito, sem login.",
        font=body,
        fill=INK,
    )

    chips = [
        ((64, 530, 158, 578), YELLOW, INK, "AND"),
        ((178, 530, 262, 578), BLUE, WHITE, "OR"),
        ((282, 530, 378, 578), PINK, INK, "NOT"),
    ]
    for box, fill, text_fill, label in chips:
        draw_shadow_rect(draw, box, fill, shadow=5)
        tw = draw.textlength(label, font=chip)
        x0, y0, x1, y1 = box
        draw.text(((x0 + x1 - tw) / 2, y0 + 10), label, font=chip, fill=text_fill)

    card = (700, 90, 1120, 500)
    draw_shadow_rect(draw, card, YELLOW, shadow=10)
    draw.text((730, 118), "QUERY", font=small, fill=INK)
    query_lines = [
        "(React OR Next.js)",
        "AND Senior",
        "AND Remoto",
        "NOT PHP",
        "NOT Junior",
    ]
    y = 170
    for line in query_lines:
        draw.text((730, y), line, font=mono, fill=INK)
        y += 44

    draw.text((730, 440), "mandajobs.vercel.app", font=small, fill=INK)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    img.save(OUT, "PNG", optimize=True)
    print(f"Wrote {OUT} ({OUT.stat().st_size} bytes)")


if __name__ == "__main__":
    main()
