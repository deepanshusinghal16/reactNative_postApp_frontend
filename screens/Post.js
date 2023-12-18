import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import FooterMenu from '../components/Menus/FooterMenu';
import HeaderMenu from '../components/Menus/HeaderMenu';
import InputBox from '../components/forms/InputBox';
import SubmitButton from '../components/forms/SubmitButton';
import axios from 'axios';
import { PostContext } from '../context/postContext';

export default function Post({ navigation }) {
    const [post, setPost] = useContext(PostContext)

    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async () => {
        try {
            if (!title) {
                return alert("Please enter title");
            }
            if (!description) {
                return alert("Please enter description");
            }
            setLoading(true);
            const { data } = await axios.post('/post/createPost', { title, description });
            console.log(data);
            alert(data?.message)
            setLoading(false);
            setPost([data?.post, ...post])
            navigation.navigate("Home");

        } catch (error) {
            setLoading(false);
            alert(error.response.data.message)
            console.warn(error);
        }
    }

    return (
        <>
            <HeaderMenu />
            <ScrollView>
                <View style={styles.container}>
                    <View>
                        <Text style={styles.heading}>Create a post</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <InputBox inputTitle={"Title"} value={title} setValue={setTitle} />
                        <InputBox inputTitle={'Description'} value={description} setValue={setDescription} multiline={true} numberOfLines={10} />
                    </View>
                    <SubmitButton btnTitle={loading ? "Creating Post..." : "Create Post"} handleSubmit={handleSubmit} loading={loading} />
                </View>
            </ScrollView>
            <FooterMenu />
        </>
    );
}


const styles = StyleSheet.create({
    container: {
        paddingTop: 40,
        paddingHorizontal: 10,
        flex: 1,
    },
    inputContainer: {
        marginTop: 40,
        gap: 10,
    },
    heading: {
        fontSize: 30,
        fontWeight: "600",
        paddingLeft: 5,
    },
    inputBox: {
        marginBottom: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        paddingLeft: 10,
        marginTop: 4,
        color: '#b78d4b',
        fontStyle: 'italic',
        marginHorizontal: 20,
    },
})
