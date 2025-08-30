import { View, Text, StyleSheet, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function PostComponent({ item }) {
    const [likes, setLikes] = useState(0);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);

    const handleLike = () => setLikes(prev => prev + 1);
    const handleCommentSubmit = () => {
        if (comment.trim()) {
            setComments(prev => [...prev, comment]);
            setComment('');
        }
    };

    return (
        <View style={styles.itemBody}>
            <Image source={{ uri: item.image }} style={styles.picture} />
            <Text>{item.body_text}</Text>

            <View style={styles.interactionRow}>
                <Text style={styles.likeText}>Curtidas: {likes}</Text>
                <Text onPress={handleLike} style={styles.likeButton}>Curtir</Text>
            </View>

            <View style={styles.commentSection}>
            {comments.map((cmt, idx) => (
                    <Text key={idx} style={styles.commentText}>• {cmt}</Text>
                ))}
            <View style={styles.commentInputRow}>
                    <TextInput
                        style={styles.commentInput}
                        value={comment}
                        onChangeText={setComment}
                        placeholder="Comente aqui..."
                    />
                    <Text onPress={handleCommentSubmit} style={styles.commentButton}>Enviar</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    itemBody: {
        marginBottom: 20,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        padding: 10,
        
        
    },
    picture:{
        height:600,
        borderRadius:15,
    },
    deleteButton: {
        alignSelf: 'flex-end',
        backgroundColor: '#ff4444',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 6,
    },
    deleteText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    interactionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    likeText: {
        fontSize: 14,
        color: '#333',
    },
    itemImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 10,
    },
    likeButton: {
        fontSize: 14,
        color: '#007bff',
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

})