#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from pathlib import Path
import re

ROOT = Path(__file__).resolve().parent
TOPICS_7 = ROOT / "js" / "data" / "topics"
TOPICS_8 = ROOT / "js" / "data" / "topics-8"


# ============================================================
# ХРОНОЛОГИЯ 7 КЛАССА (id → порядковый номер)
# ============================================================

ORDER_7 = {
    # Введение (§1–6)
    'physical-terms': 1,
    'scientific-methods': 2,
    'physical-quantities': 3,
    'measurement-accuracy': 4,
    'physics-in-technology': 5,
    'si-system': 6,
    'length-measurement': 7,
    'time-measurement': 8,
    'small-body-diameter': 9,
    'si-prefixes': 10,
    'instruments-accuracy': 11,

    # Строение вещества (§7–13)
    'matter-structure': 12,
    'molecules': 13,
    'brownian-motion': 14,
    'diffusion': 15,
    'molecular-forces': 16,
    'aggregate-states': 17,
    'molecular-differences': 18,

    # Взаимодействие тел (§14–34)
    'mechanical-motion': 19,
    'uniform-motion': 20,
    'speed': 21,
    'path-time': 22,
    'average-speed-tasks': 23,
    'motion-graphs': 24,
    'inertia': 25,
    'body-interaction': 26,
    'mass': 27,
    'mass-measurement': 28,
    'density': 29,
    'mass-volume': 30,
    'force': 31,
    'gravity-force': 32,
    'elastic-force': 33,
    'weight': 34,
    'planets-gravity': 35,
    'dynamometer': 36,
    'force-addition': 37,
    'friction': 38,
    'static-friction': 39,
    'friction-nature': 40,
    'center-of-gravity': 41,
    'equilibrium-conditions': 42,
    'equilibrium-types': 43,
    'gravity': 44,

    # Давление (§35–49)
    'pressure': 45,
    'gas-pressure': 46,
    'pascal-law': 47,
    'liquid-pressure': 48,
    'pressure-calculation': 49,
    'communicating-vessels': 50,
    'air-weight': 51,
    'torricelli': 52,
    'barometer': 53,
    'manometer': 54,
    'hydraulic-press': 55,
    'fluid-action': 56,
    'archimedes-force': 57,
    'floating-bodies': 58,
    'ships-aeronautics': 59,

    # Работа и энергия (§50–60)
    'mechanical-work': 60,
    'power': 61,
    'simple-mechanisms': 62,
    'lever': 63,
    'moment-of-force': 64,
    'levers-in-life': 65,
    'block': 66,
    'golden-rule': 67,
    'efficiency': 68,
    'mechanical-energy': 69,
    'energy-conversion': 70,

    # Дополнительные и прикладные (в конец)
    'physics-in-sport': 71,
    'physics-in-kitchen': 72,
    'physics-in-car': 73,
    'physics-in-bicycle': 74,
    'physics-in-nature': 75,
    'physics-in-space': 76,
    'physics-in-ocean': 77,
    'physics-in-atmosphere': 78,
    'physics-in-home': 79,
    'physics-in-health': 80,
    'why-sky-blue': 81,
    'rainbow-physics': 82,
    'why-space-dark': 83,
    'why-plane-flies': 84,
    'why-ice-slippery': 85,
    'moon-footprints': 86,
    'thermos-physics': 87,
    'sound-speed-media': 88,
    'vacuum': 89,
    'bicycle-physics': 90,
    'crane-physics': 91,
    'simple-mechanisms-animals': 92,
    'simple-mechanisms-body': 93,
    'simple-mechanisms-home': 94,
    'archimedes': 95,
    'cavendish': 96,
    'galileo': 97,
    'newton-apple': 98,
    'pascal-experiments': 99,
    'torricelli-history': 100,
    'how-g-measured': 101,
    'aerostatics-history': 102,
    'magdeburg-hemispheres': 103,
    'atmospheric-pressure-home': 104,
    'smartphone-barometer': 105,
    'ocean-depth-sound': 106,
    'hydrometer': 107,
    'aircraft-thrust': 108,
    'water-supply': 109,
}


# ============================================================
# ХРОНОЛОГИЯ 8 КЛАССА
# ============================================================

ORDER_8 = {
    # Тепловые явления (§1–26)
    'molecular-theory': 1,
    'aggregate-states-8': 2,
    'capillary-effects': 3,
    'temperature': 4,
    'internal-energy': 5,
    'change-internal-energy': 6,
    'heat-conduction': 7,
    'convection': 8,
    'radiation': 9,
    'heat-quantity': 10,
    'specific-heat': 11,
    'heat-calculation': 12,
    'fuel-energy': 13,
    'energy-conservation-thermal': 14,
    'melting': 15,
    'melting-graph': 16,
    'specific-melting-heat': 17,
    'evaporation': 18,
    'evaporation-energy': 19,
    'humidity': 20,
    'boiling': 21,
    'specific-vaporization-heat': 22,
    'gas-work': 23,
    'combustion-engine': 24,
    'steam-turbine': 25,
    'heat-engine-efficiency': 26,

    # Электрические явления (§27–49)
    'electrification': 27,
    'electroscope': 28,
    'coulomb-law': 29,
    'electric-charge': 30,
    'atom-structure': 31,
    'charge-conservation': 32,
    'static-electricity': 33,
    'electric-current': 34,
    'electric-circuit': 35,
    'current-in-metals': 36,
    'current-actions': 37,
    'current-strength': 38,
    'voltage': 39,
    'ohms-law': 40,
    'resistivity': 41,
    'resistance-tasks': 42,
    'rheostats': 43,
    'series-connection': 44,
    'parallel-connection': 45,
    'electric-work-power': 46,
    'joule-lenz-law': 47,
    'lamps-heaters': 48,
    'short-circuit': 49,

    # Электромагнитные явления (§50–62)
    'permanent-magnets': 50,
    'magnetic-field': 51,
    'magnetic-lines': 52,
    'electromagnets': 53,
    'earth-magnetic-field': 54,
    'magnetic-force': 55,
    'magnetic-induction': 56,
    'electric-motor': 57,
    'magnetic-flux': 58,
    'electromagnetic-induction': 59,
    'lenz-rule': 60,
    'electric-energy-production': 61,
    'electric-energy-transfer': 62,
}


# ============================================================
# ЛОГИКА
# ============================================================

def add_order_field(content: str, order: int) -> str:
    """Добавляет поле order после grade."""
    # Уже есть order?
    if re.search(r'\border\s*:', content):
        # Заменяем значение
        return re.sub(
            r'order:\s*\d+,',
            f'order: {order},',
            content,
            count=1
        )

    # Ищем строку с grade и добавляем order после
    pattern = r"(grade:\s*\d+,)"
    replacement = rf"\1\n  order: {order},"
    new_content, count = re.subn(pattern, replacement, content, count=1)

    # Если grade нет — после category
    if count == 0:
        pattern2 = r"(category:\s*['\"][^'\"]+['\"],)"
        new_content, count = re.subn(pattern2, rf"\1\n  order: {order},", content, count=1)

    return new_content


def process_folder(folder: Path, order_dict: dict, label: str):
    if not folder.exists():
        print(f"⚠️  Папка не найдена: {folder}")
        return 0, 0, 0

    updated = 0
    skipped = 0
    unknown = 0

    for file in folder.glob("*.js"):
        topic_id = file.stem
        if topic_id not in order_dict:
            print(f"  ❓ [{label}] {file.name} — не в хронологии")
            unknown += 1
            continue

        content = file.read_text(encoding="utf-8")
        new_content = add_order_field(content, order_dict[topic_id])

        if new_content != content:
            file.write_text(new_content, encoding="utf-8")
            print(f"  ✅ [{label}] {file.name} — order: {order_dict[topic_id]}")
            updated += 1
        else:
            print(f"  ⏭  [{label}] {file.name}")
            skipped += 1

    return updated, skipped, unknown


def main():
    print("🚀 Добавляю поле order в статьи\n")

    print("📁 7 класс:")
    u7, s7, x7 = process_folder(TOPICS_7, ORDER_7, "7")

    print("\n📁 8 класс:")
    u8, s8, x8 = process_folder(TOPICS_8, ORDER_8, "8")

    print(f"\n✅ Готово!")
    print(f"   7 класс: обновлено {u7}, пропущено {s7}, не в хронологии {x7}")
    print(f"   8 класс: обновлено {u8}, пропущено {s8}, не в хронологии {x8}")


if __name__ == "__main__":
    main()