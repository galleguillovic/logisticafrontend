import { useState, useEffect } from 'react';
import * as service from '../services/ordenesService';

export default function useStats() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const data = await service.getEstadisticas();
      setStats(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('useStats error', err);
      setError(err);
      setStats([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  return { stats, loading, error, refresh: load };
}