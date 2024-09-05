import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import timeDifference from '../utils';

interface Post {
  id: string;
  name: string;
  content: string;
  likes: number;
  timestamp: string
}

interface PostItemProps {
  post: Post;
  onLike: (id: string) => void;
}

//displaying post card

const PostItem: React.FC<PostItemProps> = ({ post, onLike }) => (
  <View style={styles.postContainer}>
    <View style={styles.header}>
      <Text style={styles.name}>{post.name}</Text>
      <Text style={styles.date}>{timeDifference(post.timestamp)} hours ago</Text>
    </View>
    <Text style={styles.content}>{post.content}</Text>
    <View style={styles.footer}>
      <TouchableOpacity style={styles.likeButton} onPress={() => onLike(post.id)}>
        <Text style={styles.likeText}>👍 Like</Text>
      </TouchableOpacity>
      <Text style={styles.likes}>Likes: {post.likes}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  postContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#fff',
    margin: 15,
    borderRadius: 5
  },
  header: {
    marginBottom: 10,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'blue'
  },
  date: {
    color: '#888',
    fontSize: 12,
  },
  content: {
    marginVertical: 10,
    lineHeight: 20,
    color: 'black'
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  likeButton: {
    padding: 5,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  likeText: {
    fontSize: 16,
  },
  likes: {
    color: 'red',
  },
});

export default PostItem;
