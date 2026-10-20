export const CATEGORIES = ['Sensors', 'Relays', 'Motors', 'Displays', 'Cables'];

const ADJECTIVES = ['Compact', 'Heavy-duty', 'Precision', 'Rugged', 'Smart', 'Micro', 'Industrial', 'Dual', 'Modular', 'Sealed'];
const NOUNS = ['Unit', 'Module', 'Controller', 'Probe', 'Driver', 'Panel', 'Switch', 'Coupler', 'Board', 'Assembly'];

// Deterministic generator: same 600 records on every load (no Math.random).
export function generateProducts(count = 600) {
  return Array.from({ length: count }, (_, i) => {
    const category = CATEGORIES[i % CATEGORIES.length];
    const name = `${ADJECTIVES[(i * 7) % ADJECTIVES.length]} ${category.slice(0, -1)} ${NOUNS[(i * 3) % NOUNS.length]} ${i + 1}`;
    const price = Math.round((5 + ((i * 37) % 495) + (i % 10) / 10) * 100) / 100;
    return { id: i + 1, name, category, price };
  });
}
