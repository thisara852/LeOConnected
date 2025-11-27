/*
  # Add Helper Functions

  ## New Functions
  1. increment_likes - Increment post likes count
  2. decrement_likes - Decrement post likes count
  3. increment_comments - Increment post comments count
  4. increment_views - Increment post views count
*/

-- Function to increment likes count
CREATE OR REPLACE FUNCTION increment_likes(post_id uuid)
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE posts
  SET likes_count = likes_count + 1
  WHERE id = post_id;
END;
$$;

-- Function to decrement likes count
CREATE OR REPLACE FUNCTION decrement_likes(post_id uuid)
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE posts
  SET likes_count = GREATEST(likes_count - 1, 0)
  WHERE id = post_id;
END;
$$;

-- Function to increment comments count
CREATE OR REPLACE FUNCTION increment_comments(post_id uuid)
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE posts
  SET comments_count = comments_count + 1
  WHERE id = post_id;
END;
$$;

-- Function to increment views count
CREATE OR REPLACE FUNCTION increment_views(post_id uuid)
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE posts
  SET views_count = views_count + 1
  WHERE id = post_id;
END;
$$;

-- Trigger to automatically increment comments count when a comment is added
CREATE OR REPLACE FUNCTION handle_new_comment()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  PERFORM increment_comments(NEW.post_id);
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_comment_created ON comments;
CREATE TRIGGER on_comment_created
  AFTER INSERT ON comments
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_comment();
