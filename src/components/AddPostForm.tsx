import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
 
interface AddPostFormProps {
  onAddPost: (post: { name: string; content: string }) => void;
}

const MAX_NAME_LENGTH = 50;
const MAX_CONTENT_LENGTH = 200;
 
//add post form 

const AddPostForm: React.FC<AddPostFormProps> = ({ onAddPost }) => {
  const [name, setName] = useState<string>('');
  const [content, setContent] = useState<string>('');
 
  //checking validations and submitting form
  const handleAddPost = () => {
    if (!name && !content) {
        Alert.alert('Validation Error', 'Both fields are required.');
        return;
    }

    if (!name) {
        Alert.alert('Validation Error', 'Name is required.');
        return;
    }

    if (!content) {
        Alert.alert('Validation Error', 'content is required.');
        return;
    }
  
    if (name.length > MAX_NAME_LENGTH) {
        Alert.alert('Validation Error', `Name cannot exceed ${MAX_NAME_LENGTH} characters.`);
        return;
    }

    if (content.length > MAX_CONTENT_LENGTH) {
        Alert.alert('Validation Error', `Content cannot exceed ${MAX_CONTENT_LENGTH} characters.`);
        return;
    }
    onAddPost({ name, content });
    setName('');
    setContent('');
  };
 
  return (
    <View style={styles.formContainer}>
      <TextInput
        placeholder="Your Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="What's on your mind?"
        value={content}
        onChangeText={setContent}
        style={styles.input}
      />
      <Button title="Add Post" onPress={handleAddPost} />
    </View>
  );
};
 
const styles = StyleSheet.create({
  formContainer: {
    padding: 10,
  },
  input: {
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
  },
});
 
export default AddPostForm;