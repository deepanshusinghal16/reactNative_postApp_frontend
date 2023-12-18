import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { PostContext } from '../../context/postContext';
import FooterMenu from '../../components/Menus/FooterMenu';
import HeaderMenu from '../../components/Menus/HeaderMenu';
import PostCard from '../../components/PostCard';
import axios from 'axios';

export default function MyPost() {
    const [post, setPost] = useState([]);
    const [loading, setLoading] = useState(false);

    const getUserPosts = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get('/post/getUserPosts');
            setPost(data?.userPost)
            setLoading(false);

        } catch (error) {
            console.log(error);
            alert(error.message);
            setLoading(false);
        }
    }



    useEffect(() => {
        getUserPosts();
    }, []);

    return (
        <>
            <HeaderMenu />
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.totalPost}>Your Post: {post?.length}</Text>
                    <View>
                        {
                            post.map((post, id) => (
                                <PostCard post={post} key={id} showName={false} />
                            ))
                        }
                    </View>
                </View>
            </ScrollView>
            <FooterMenu />
        </>
    );
}


const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        flex: 1,
        justifyContent: 'space-between',
    },
    totalPost: {
        fontSize: 30,
        textAlign: 'center',
        color: 'green',
        fontWeight: '800'
    }
})
