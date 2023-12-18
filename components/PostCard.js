import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import moment from 'moment';
import 'moment-duration-format';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import EditModal from './EditModal';


export default PostCard = ({ post, showName = true }) => {
    const postTime = moment(post.createdAt);
    const duration = moment.duration(moment().diff(postTime));
    const formattedDuration = duration.format('h [hr], m [min]');

    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const [editPost, setEditPost] = useState({});
    const [modalVisible, setModalVisible] = useState(false);


    const deletePostPrompt = (id) => {
        Alert.alert('Attention', 'Are you sure you want to delete this post ?', [
            {
                text: 'Cancel',
                onPress: () => { console.log("Cancelled") }
            }, {
                text: "Delete",
                onPress: () => handleDeletePost(id)
            }
        ])
    }

    const handleDeletePost = async (id) => {
        try {
            setLoading(true);
            const { data } = await axios.delete(`/post/deletePost/${id}`)
            setLoading(false);
            alert(data.message);
            navigation.push('MyPost');

        } catch (error) {
            console.log(error);
            alert(error.message);
            setLoading(false);
        }
    }
    return (
        <View style={styles.container}>
            <EditModal modalVisible={modalVisible} setModalVisible={setModalVisible} post={editPost} />
            <View>
                <Text style={styles.title}> {post.title} </Text>
                <Text style={styles.description}> {post.description} </Text>
            </View>
            <View style={styles.info}>
                {showName && (<Text style={styles.postedBy}>By {post.postedBy.name} </Text>)}
                <Text style={styles.createdAt}> {formattedDuration} ago</Text>
            </View>
            <View style={styles.operationContainer}>
                <TouchableOpacity style={styles.likebtn} onPress={() => { setEditPost(post); setModalVisible(!modalVisible) }}>
                    <AntDesign name={!showName && "edit"} style={styles.like} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.likebtn} onPress={() => deletePostPrompt(post?._id)}>
                    <AntDesign name={!showName && "delete"} style={styles.like} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        marginVertical: 10,
        paddingHorizontal: 15,
        marginHorizontal: 10,
        paddingVertical: 20,
        borderRadius: 20,
        elevation: 2,
    },
    title: {
        fontSize: 25,
        fontWeight: '600',
        color: 'blue',
        marginBottom: 10,
    },
    description: {
        fontSize: 15,
    },
    createdAt: {
        fontSize: 12,
        textAlign: 'right'
    },
    postedBy: {
        fontSize: 15,
        color: 'blue',
        fontWeight: '600',
        textAlign: 'right'
    },
    info: {
        flex: 1,
        alignSelf: 'flex-end',
        justifyContent: 'space-between',
        paddingHorizontal: 10,

    },
    like: {
        fontSize: 25,
    },
    operationContainer: {
        position: 'absolute',
        top: 30,
        right: 30,
        flex: 1,
        flexDirection: 'row',
        gap: 15,
    },
})
