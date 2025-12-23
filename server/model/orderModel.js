// server/controllers/orderController.js
import supabase from '../config/connexionDB.js';
import { parseOrderItems } from '../utils/parser.js';

// 🧾 Créer une nouvelle commande
export const createOrder = async (req, res) => {
  const { customer_name, customer_phone, products, total_amount, customer_address } = req.body;
  const userId = "152"; //req.user.id; //le token or JWT middleware a attaché l'utilisateur

  try {
    // ✅ 1. Validation des champs obligatoires
    if (!customer_name?.trim()) {
      return res.status(400).json({ error: "Le nom du client est requis." });
    }

    if (!customer_phone?.trim()) {
      return res.status(400).json({ error: "Le numéro de téléphone du client est requis." });
    }


    // if (!products_raw?.trim()) {
    //   return res.status(400).json({ error: "Veuillez saisir au moins un produit." });
    // }

    // if (typeof total_amount !== 'number' || total_amount <= 0) {
    //   return res.status(400).json({ error: "Le montant total doit être un nombre positif." });
    // }

    // ✅ 2. Parsing des produits order_items, pause pour l'instant
    const parsedItems = products.trim();
    console.log("our products= ", parsedItems);
    
    
    if (parsedItems.length === 0) {
      return res.status(400).json({ error: "Impossible d'extraire les produits. Vérifiez le format." });
    }

    
    const { order, error: orderError } = await supabase.from("orders")
      .insert([{ 
        user_id: userId,
        customer_name: customer_name.trim(),
        customer_phone: customer_phone.trim(),
        customer_address: customer_address?.trim() || null,
        total_amount: parseFloat(total_amount.toFixed(2)),
        products : products,
        currency: 'FC',
        status: 'received' // Statut initial
        }]).select(' customer_name, customer_phone, total_amount, created_at')
        .single();
    if (orderError) throw error;

    if (orderError) {
      console.error("Erreur insertion commande:", orderError);
      return res.status(500).json({ error: "Impossible d'enregistrer la commande." });
    }
   
    

    /* ✅ 4. Insérer les lignes de produits
    const itemsToInsert = parsedItems.map(item => ({
      order_id: 52,
      product_name: item.product_name,
      quantity: item.quantity,
      unit_price: item.unit_price,
      parsed_from: 'rule_based'
    }));

    const { data, error: itemsError } = await supabase.from('order_items')
      .insert([{
        idorder_items: 4,
        order_id: 82,
        product_name: "item.product_name",
        quantity: 5,
        unit_price: 67
      }]);

    
    if (itemsError) {
      console.warn("Erreur insertion items (mais commande sauvegardée):", itemsError);
    }*/


    //✅ 5. Réponse succès check order items save
    res.status(201).json({
      success: true,
      message: "Commande enregistrée avec succès with all.", order
    })
    //  res
    //   .status(201)
    //   .json({ message: "Commande enregistree avec succès", data });

  } catch (err) {
    console.error("Erreur serveur dans createOrder:", err);
    res.status(500).json({ error: "Erreur interne. Réessayez plus tard." });
  }
}


// 🧾 Créer une nouvelle commande
export const getMyOrders = async (req, res) => {
  const { iduser } = req.params;
  const { data, error } = await supabase
    .from("orders")
    .select()
    .eq("user_id", iduser);

  if (error) throw error;
  return data;
}