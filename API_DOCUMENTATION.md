# LeoConnect Backend API Documentation

## Overview
Complete Supabase backend integration for LeoConnect social platform.

## Environment Setup

### Required Environment Variables
```env
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Database Schema

### Tables

#### profiles
- User profiles with Leo Club information
- Fields: id, username, full_name, avatar_url, bio, club_name, year, role, district_id, member_since

#### districts
- Leo Districts across Sri Lanka and Maldives
- Fields: id, name, location, description, banner_url, avatar_url

#### clubs
- Leo Clubs within districts
- Fields: id, name, description, district_id, avatar_url, banner_url, location, rating, members_count

#### posts
- User posts and content
- Fields: id, user_id, content, image_url, likes_count, comments_count, views_count

#### comments
- Comments on posts
- Fields: id, post_id, user_id, content

#### likes
- Post likes tracking
- Fields: id, post_id, user_id

#### stories
- 24-hour ephemeral stories
- Fields: id, user_id, media_url, expires_at

#### notifications
- User notifications
- Fields: id, user_id, title, body, type, is_read

#### events
- Community events
- Fields: id, title, description, location, date, image_url, organizer_id

#### followers
- User follow relationships
- Fields: id, follower_id, following_id

#### saved_posts
- Saved posts for users
- Fields: id, user_id, post_id

## Service APIs

### Auth Service (`services/authService.js`)

#### signUp(email, password, username)
Creates a new user account and profile.
```javascript
const { data, error } = await authService.signUp(
  'user@example.com',
  'password123',
  'username'
);
```

#### signIn(email, password)
Authenticates a user.
```javascript
const { data, error } = await authService.signIn(
  'user@example.com',
  'password123'
);
```

#### signOut()
Signs out the current user.
```javascript
await authService.signOut();
```

#### getCurrentUser()
Gets the currently authenticated user.
```javascript
const { user, error } = await authService.getCurrentUser();
```

### Profile Service (`services/profileService.js`)

#### getProfile(userId)
Fetches a user's profile.
```javascript
const { data, error } = await profileService.getProfile(userId);
```

#### updateProfile(userId, updates)
Updates a user's profile.
```javascript
const { data, error } = await profileService.updateProfile(userId, {
  club_name: 'Leo Club of Colombo',
  year: '2024',
  role: 'President'
});
```

### Post Service (`services/postService.js`)

#### getPosts(limit, offset)
Fetches posts with user information.
```javascript
const { data, error } = await postService.getPosts(20, 0);
```

#### createPost(userId, content, imageUrl)
Creates a new post.
```javascript
const { data, error } = await postService.createPost(
  userId,
  'Post content here',
  'https://example.com/image.jpg'
);
```

#### likePost(userId, postId)
Likes a post.
```javascript
const { error } = await postService.likePost(userId, postId);
```

#### unlikePost(userId, postId)
Unlikes a post.
```javascript
const { error } = await postService.unlikePost(userId, postId);
```

#### savePost(userId, postId)
Saves a post.
```javascript
const { error } = await postService.savePost(userId, postId);
```

#### getSavedPosts(userId)
Gets all saved posts for a user.
```javascript
const { data, error } = await postService.getSavedPosts(userId);
```

### District Service (`services/districtService.js`)

#### getDistricts()
Fetches all districts.
```javascript
const { data, error } = await districtService.getDistricts();
```

#### getDistrict(districtId)
Fetches a single district.
```javascript
const { data, error } = await districtService.getDistrict(districtId);
```

#### searchDistricts(searchTerm)
Searches districts by name or location.
```javascript
const { data, error } = await districtService.searchDistricts('Colombo');
```

### Club Service (`services/clubService.js`)

#### getClubs()
Fetches all clubs.
```javascript
const { data, error } = await clubService.getClubs();
```

#### getClubsByDistrict(districtId)
Fetches clubs in a specific district.
```javascript
const { data, error } = await clubService.getClubsByDistrict(districtId);
```

#### searchClubs(searchTerm)
Searches clubs by name or location.
```javascript
const { data, error } = await clubService.searchClubs('Moratuwa');
```

### Story Service (`services/storyService.js`)

#### getStories()
Fetches all active stories (not expired).
```javascript
const { data, error } = await storyService.getStories();
```

#### createStory(userId, mediaUrl)
Creates a new story (expires in 24 hours).
```javascript
const { data, error } = await storyService.createStory(
  userId,
  'https://example.com/story.jpg'
);
```

### Notification Service (`services/notificationService.js`)

#### getNotifications(userId)
Fetches all notifications for a user.
```javascript
const { data, error } = await notificationService.getNotifications(userId);
```

#### markAsRead(notificationId)
Marks a notification as read.
```javascript
const { error } = await notificationService.markAsRead(notificationId);
```

#### getUnreadCount(userId)
Gets count of unread notifications.
```javascript
const { count, error } = await notificationService.getUnreadCount(userId);
```

## Auth Context (`contexts/AuthContext.js`)

Global authentication state management.

### Usage
```javascript
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Wrap app with provider
<AuthProvider>
  <App />
</AuthProvider>

// Use in components
const { user, profile, isAuthenticated, signIn, signOut } = useAuth();
```

### Available Methods
- `signIn(email, password)` - Sign in user
- `signUp(email, password, username)` - Sign up new user
- `signOut()` - Sign out current user
- `updateProfile(updates)` - Update user profile
- `refreshProfile()` - Refresh profile data

### Available State
- `user` - Current user object
- `profile` - User profile data
- `loading` - Loading state
- `isAuthenticated` - Boolean authentication status

## Security (Row Level Security)

All tables have RLS enabled with appropriate policies:

- **Users can only modify their own data**
- **Public content (posts, districts, clubs) is viewable by all authenticated users**
- **Private data (notifications, saved posts) is only accessible to the owner**
- **Follow and like actions are restricted to authenticated users**

## Database Functions

### increment_likes(post_id)
Increments the likes count for a post.

### decrement_likes(post_id)
Decrements the likes count for a post.

### increment_comments(post_id)
Automatically triggered when a new comment is added.

### increment_views(post_id)
Increments the views count for a post.

## Error Handling

All service methods return an object with `data` and `error`:
```javascript
const { data, error } = await someService.someMethod();

if (error) {
  console.error('Error:', error.message);
  // Handle error
} else {
  // Use data
}
```

## Best Practices

1. **Always check for errors** before using returned data
2. **Use maybeSingle()** for queries that might return 0 or 1 row
3. **Implement loading states** in UI components
4. **Handle authentication state** using AuthContext
5. **Use RefreshControl** for pull-to-refresh functionality
6. **Implement proper error messages** for user feedback

## Testing

To test the backend:

1. Sign up a new user through the app
2. Complete profile information
3. Create posts, like, comment
4. Test search functionality
5. Test notifications
6. Verify RLS policies work correctly

## Support

For issues or questions, refer to:
- Supabase Documentation: https://supabase.com/docs
- React Native Documentation: https://reactnative.dev/docs
