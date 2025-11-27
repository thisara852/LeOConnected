import { supabase } from '../lib/supabase';

export const postService = {
  // Get all posts with user info
  async getPosts(limit = 20, offset = 0) {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          profiles:user_id (
            id,
            username,
            full_name,
            avatar_url
          )
        `)
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Get single post
  async getPost(postId) {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          profiles:user_id (
            id,
            username,
            full_name,
            avatar_url
          )
        `)
        .eq('id', postId)
        .maybeSingle();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Create post
  async createPost(userId, content, imageUrl) {
    try {
      const { data, error } = await supabase
        .from('posts')
        .insert([
          {
            user_id: userId,
            content,
            image_url: imageUrl,
          },
        ])
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Delete post
  async deletePost(postId) {
    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', postId);

      if (error) throw error;
      return { error: null };
    } catch (error) {
      return { error };
    }
  },

  // Like post
  async likePost(userId, postId) {
    try {
      const { error } = await supabase
        .from('likes')
        .insert([{ user_id: userId, post_id: postId }]);

      if (error) throw error;

      // Increment likes count
      const { error: updateError } = await supabase.rpc('increment_likes', {
        post_id: postId,
      });

      return { error: updateError };
    } catch (error) {
      return { error };
    }
  },

  // Unlike post
  async unlikePost(userId, postId) {
    try {
      const { error } = await supabase
        .from('likes')
        .delete()
        .eq('user_id', userId)
        .eq('post_id', postId);

      if (error) throw error;

      // Decrement likes count
      const { error: updateError } = await supabase.rpc('decrement_likes', {
        post_id: postId,
      });

      return { error: updateError };
    } catch (error) {
      return { error };
    }
  },

  // Check if user liked post
  async isPostLiked(userId, postId) {
    try {
      const { data, error } = await supabase
        .from('likes')
        .select('id')
        .eq('user_id', userId)
        .eq('post_id', postId)
        .maybeSingle();

      if (error) throw error;
      return { isLiked: !!data, error: null };
    } catch (error) {
      return { isLiked: false, error };
    }
  },

  // Save post
  async savePost(userId, postId) {
    try {
      const { error } = await supabase
        .from('saved_posts')
        .insert([{ user_id: userId, post_id: postId }]);

      if (error) throw error;
      return { error: null };
    } catch (error) {
      return { error };
    }
  },

  // Unsave post
  async unsavePost(userId, postId) {
    try {
      const { error } = await supabase
        .from('saved_posts')
        .delete()
        .eq('user_id', userId)
        .eq('post_id', postId);

      if (error) throw error;
      return { error: null };
    } catch (error) {
      return { error };
    }
  },

  // Get saved posts
  async getSavedPosts(userId) {
    try {
      const { data, error } = await supabase
        .from('saved_posts')
        .select(`
          post_id,
          posts (
            *,
            profiles:user_id (
              id,
              username,
              full_name,
              avatar_url
            )
          )
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { data: data?.map((item) => item.posts), error: null };
    } catch (error) {
      return { data: null, error };
    }
  },
};
