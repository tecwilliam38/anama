import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { supabase } from '../../api/supabaseClient';
import * as FileSystem from 'expo-file-system';


export default function PostComponent({ item, index, activeMenuIndex, setActiveMenuIndex, fetchUserImages }) {
  const isMenuOpen = activeMenuIndex === index;

  const [likes, setLikes] = useState(0);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [showReactions, setShowReactions] = useState(false);
  const [selectedReaction, setSelectedReaction] = useState(null);
  const [showCommentBox, setShowCommentBox] = useState(false);


  const handleCommentSubmit = () => {
    if (comment.trim()) {
      setComments(prev => [...prev, comment]);
      setComment('');
    }
  };

  const handleDeletePost = async () => {
    Alert.alert('Excluir postagem', 'Tem certeza que deseja excluir esta postagem?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          try {
            const path = item.image?.split('/anama/')[1];
            if (!path) throw new Error('Caminho da imagem inválido');

            const { error: storageError } = await supabase.storage
              .from('anama')
              .remove([path]);
            if (storageError) throw storageError;

            const { error: dbError } = await supabase
              .from('anama_posts')
              .delete()
              .eq('image_url', item.image);
            if (dbError) throw dbError;

            Alert.alert('Postagem excluída com sucesso');
            fetchUserImages();

          } catch (err) {
            console.error('Erro ao excluir postagem:', err.message);
            Alert.alert('Erro', 'Não foi possível excluir a postagem.');
          }
        },
      },
    ]);
  };
  // console.log(item);
  

  return (
    <View style={styles.itemBody}>      
      <TouchableOpacity style={styles.menuButton} onPress={() => setActiveMenuIndex(index)}>
        <Icon name="ellipsis-v" size={28} color="#000" />        
      </TouchableOpacity>


      {isMenuOpen && (
        <View style={styles.optionsMenu}>
          <TouchableOpacity onPress={() => Alert.alert('Post ocultado')}>
            <Text style={styles.optionText}>Ocultar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDeletePost}>
            <Text style={styles.optionText}>Excluir</Text>
          </TouchableOpacity>
        </View>
      )}

      {item.body_text && <Text style={styles.bodyText}>{item.body_text}</Text>}
      <Image source={{ uri: item.image }} style={styles.picture} />

      <View style={styles.interactionRow}>
        <View style={styles.iconGroup}>
          <Text style={styles.likeText}>{likes}</Text>
          <Icon
            name={selectedReaction || 'heart'}
            size={24}
            color="#e74c3c"
            onPress={() => setShowReactions(prev => !prev)}
          />
          <Icon
            name="comment-o"
            size={24}
            color="#3498db"
            onPress={() => setShowCommentBox(prev => !prev)}
            style={styles.commentIcon}
          />
          <Icon name="share" size={20} color="#2ecc71" />
        </View>
      </View>

      {showReactions && (
        <View style={styles.reactionMenu}>
          {['heart', 'smile-o', 'thumbs-up', 'star', 'fire'].map(icon => (
            <Icon
              key={icon}
              name={icon}
              size={24}
              color="#555"
              style={styles.reactionIcon}
              onPress={() => {
                setSelectedReaction(icon);
                setShowReactions(false);
                setLikes(prev => prev + 1);
              }}
            />
          ))}
        </View>
      )}

      {showCommentBox && (
        <View style={styles.commentSection}>
          {comments.map((cmt, idx) => (
            <Text key={idx} style={styles.commentText}>
              {cmt}
            </Text>
          ))}
          <View style={styles.commentInputRow}>
            <TextInput
              style={styles.commentInput}
              value={comment}
              onChangeText={setComment}
              placeholder="Comente aqui..."
            />
            <Text onPress={handleCommentSubmit} style={styles.commentButton}>
              Enviar
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  itemBody: {
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#555',
  },
  menuButton: {
    padding: 10,
    alignSelf: 'flex-end',
  },
  picture: {
    height: 600,
    borderRadius: 15,
    marginVertical: 10,
  },
  bodyText: {
    backgroundColor: '#eef2f5',
    padding: 8,
    borderRadius: 8,
    borderLeftWidth: 4,
    marginBottom: 5,
    borderLeftColor: '#007bff',
  },
  interactionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  iconGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  likeText: {
    fontSize: 14,
    color: '#333',
  },
  commentIcon: {
    marginHorizontal: 10,
  },
  reactionMenu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    padding: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  reactionIcon: {
    marginHorizontal: 6,
  },
  commentSection: {
    marginTop: 10,
  },
  commentText: {
    fontSize: 13,
    color: '#555',
    marginBottom: 4,
  },
  commentInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 6,
    marginRight: 8,
  },
  commentButton: {
    color: '#28a745',
    fontWeight: 'bold',
  },
  optionsMenu: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    zIndex: 999,
  },
  optionText: {
    fontSize: 14,
    paddingVertical: 6,
    color: '#333',
  },
});