const supabase = require("../config/connexionDB");
import { getDayRange, parseDate } from '../utils/dateUtils';

export const getDailyReport = async (req, res) => {
    const { date } = req.query; // ex: ?date=2025-04-05
    const userId = req.user.id;
    // const {dateTofind, userId } = req.params;
  
    try {
      // 1. Valider et normaliser la date
      let targetDate;
      try {
        targetDate = parseDate(date);
      } catch (err) {
        return res.status(400).json({ error: 'Format de date invalide. Utilisez AAAA-MM-JJ.' });
      }
  
      const { start, end } = getDayRange(targetDate);
  
      // 2. Récupérer toutes les commandes du jour
      const { data: orders, error } = await supabase
        .from('orders')
        .select('id, total_amount, status, created_at')
        .eq('user_id', userId)
        .gte('created_at', start)
        .lte('created_at', end)
        .order('created_at', { ascending: false });
  
      if (error) {
        console.error('Erreur Supabase:', error);
        return res.status(500).json({ error: 'Impossible de charger les données.' });
      }
  
      // 3. Calculer les stats
      const totalOrders = orders.length;
      const totalAmount = orders.reduce((sum, o) => sum + (o.total_amount || 0), 0);
      const paidOrders = orders.filter(o => o.status === 'paid').length;
      const confirmedOrders = orders.filter(o => o.status === 'confirmed').length;
      const shippedOrders = orders.filter(o => o.status === 'shipped').length;
      const deliveredOrders = orders.filter(o => o.status === 'delivered').length;
  
      // 4. Formater la réponse
      const report = {
        date: targetDate,
        totalOrders,
        totalAmount: parseFloat(totalAmount.toFixed(2)),
        paidOrders,
        confirmedOrders,
        shippedOrders,
        deliveredOrders,
        orders // Liste complète pour le frontend
      };
  
      res.json({ success: true, report });
  
    } catch (err) {
      console.error('Erreur dans getDailyReport:', err);
      res.status(500).json({ error: 'Erreur serveur. Réessayez plus tard.' });
    }
};

// 📈 Obtenir un résumé hebdomadaire (optionnel bonus)
export const getWeeklySummary = async (req, res) => {
    const userId = req.user.id;
    const now = new Date();
    const sevenDaysAgo = new Date(now);
    sevenDaysAgo.setDate(now.getDate() - 7);
  
    try {
      const { data: orders, error } = await supabase
        .from('orders')
        .select('total_amount, status, created_at')
        .eq('user_id', userId)
        .gte('created_at', sevenDaysAgo.toISOString())
        .order('created_at', { ascending: false });
  
      if (error) throw error;
  
      const totalAmount = orders.reduce((sum, o) => sum + (o.total_amount || 0), 0);
      const totalOrders = orders.length;
  
      res.json({
        success: true,
        summary: {
          period: '7 derniers jours',
          totalOrders,
          totalAmount: parseFloat(totalAmount.toFixed(2))
        }
      });
  
    } catch (err) {
      res.status(500).json({ error: 'Erreur chargement résumé.' });
    }
};