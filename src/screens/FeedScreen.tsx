import React, { useState, useEffect } from 'react';
import { FlatList, View, StyleSheet, Button, Text } from 'react-native';
import PostItem from '../components/PostItem';
import AddPostForm from '../components/AddPostForm';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Post {
  id: string;
  name: string;
  content: string;
  likes: number;
  timestamp: string;
}

const FeedScreen: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [sortType, setSortType] = useState<string>('timestamp'); // Default sort by timestamp

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const postsString = await AsyncStorage.getItem('posts');
        if (postsString) {
          setPosts(JSON.parse(postsString));
        }
      } catch (error) {
        console.error('Failed to load posts from AsyncStorage:', error);
      }
    };

    loadPosts();
  }, []);

  useEffect(() => {
    const savePosts = async () => {
      try {
        await AsyncStorage.setItem('posts', JSON.stringify(posts));
      } catch (error) {
        console.error('Failed to save posts to AsyncStorage:', error);
      }
    };

    savePosts();
  }, [posts]);

  // Sort posts by selected type (name or timestamp)
  const getSortedPosts = () => {
    return [...posts].sort((a, b) => {
      if (sortType === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortType === 'timestamp') {
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(); // Sort by newest first
      }
      return 0;
    });
  };

  const handleAddPost = (newPost: { name: string; content: string }) => {
    const post: Post = {
      id: Date.now().toString(),
      ...newPost,
      likes: 0,
      timestamp: new Date().toISOString(),
    };
    setPosts([post, ...posts]);
  };

  const handleLikePost = (id: string) => {
    setPosts(posts.map(post => post.id === id ? { ...post, likes: post.likes + 1 } : post));
  };

  return (
    <View style={styles.container}>
      <AddPostForm onAddPost={handleAddPost} />

      {/* Sorting Buttons */}
      <View style={styles.sortContainer}>
        <Text>Sort by: </Text>
        <Button title="Name" onPress={() => setSortType('name')} />
        <Button title="Timestamp" onPress={() => setSortType('timestamp')} />
      </View>

      <FlatList
        data={getSortedPosts()}
        keyExtractor={(post) => post.id}
        renderItem={({ item }) => <PostItem post={item} onLike={handleLikePost} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  sortContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default FeedScreen;
