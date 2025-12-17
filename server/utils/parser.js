// server/utils/parser.js

export function parseOrderItems(rawText) {
  if (!rawText) return [];

  const lines = rawText.split('\n').filter(line => line.trim());
  const items = [];

  for (const line of lines) {
    // Regex : "Nom produit x2 @ 10000" OU "Nom produit x2"
    const match = line.match(/^(.+?)\s*[xX]\s*(\d+)(?:\s*[@à]\s*(\d+))?$/);

    if (match) {
      const [, name, qtyStr, priceStr] = match;
      const quantity = parseInt(qtyStr, 10);
      const unitPrice = priceStr ? parseFloat(priceStr) : null;

      if (quantity >= 1 && quantity <= 99) {
        items.push({
          product_name: name.trim(),
          quantity,
          unit_price: unitPrice
        });
      }
    } else {
      // Si le format n'est pas reconnu, on garde tout comme un produit (quantité 1)
      items.push({
        product_name: line.trim(),
        quantity: 1,
        unit_price: null
      });
    }
  }

  return items;
}