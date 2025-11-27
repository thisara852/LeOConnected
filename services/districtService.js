import { supabase } from '../lib/supabase';

export const districtService = {
  // Get all districts
  async getDistricts() {
    try {
      const { data, error } = await supabase
        .from('districts')
        .select('*')
        .order('name');

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Get single district
  async getDistrict(districtId) {
    try {
      const { data, error } = await supabase
        .from('districts')
        .select('*')
        .eq('id', districtId)
        .maybeSingle();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Search districts
  async searchDistricts(searchTerm) {
    try {
      const { data, error } = await supabase
        .from('districts')
        .select('*')
        .or(`name.ilike.%${searchTerm}%,location.ilike.%${searchTerm}%`)
        .order('name');

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },
};
