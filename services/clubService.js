import { supabase } from '../lib/supabase';

export const clubService = {
  // Get all clubs
  async getClubs() {
    try {
      const { data, error } = await supabase
        .from('clubs')
        .select('*, districts(*)')
        .order('name');

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Get clubs by district
  async getClubsByDistrict(districtId) {
    try {
      const { data, error } = await supabase
        .from('clubs')
        .select('*, districts(*)')
        .eq('district_id', districtId)
        .order('name');

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Get single club
  async getClub(clubId) {
    try {
      const { data, error } = await supabase
        .from('clubs')
        .select('*, districts(*)')
        .eq('id', clubId)
        .maybeSingle();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Search clubs
  async searchClubs(searchTerm) {
    try {
      const { data, error } = await supabase
        .from('clubs')
        .select('*, districts(*)')
        .or(`name.ilike.%${searchTerm}%,location.ilike.%${searchTerm}%`)
        .order('name');

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },
};
