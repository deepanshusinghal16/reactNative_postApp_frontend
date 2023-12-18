import React, { useCallback, useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { PostContext } from '../context/postContext';
import FooterMenu from '../components/Menus/FooterMenu';
import HeaderMenu from '../components/Menus/HeaderMenu';
import PostCard from '../components/PostCard';

export default function Home() {
    const [post, getAllPost, loading] = useContext(PostContext)
    const [refreshing, setRefreshing] = useState(false);
    useEffect(() => { }, [getAllPost]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getAllPost;
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    return (
        <>
            <HeaderMenu />
            <ScrollView
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                <View style={styles.container}>

                    <Text style={styles.totalPost}>Total Post: {post?.length}</Text>
                    <View>
                        {
                            post?.map((post, id) => (
                                <PostCard post={post} key={id} />
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
