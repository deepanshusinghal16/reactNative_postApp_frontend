import { View, Text, StyleSheet, Modal, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import InputBox from './forms/InputBox';
import SubmitButton from './forms/SubmitButton';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

export default EditModal = ({ modalVisible, setModalVisible, post }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation()
    useEffect(() => {
        setTitle(post?.title)
        setDescription(post?.description)
    }, [modalVisible])

    const updatePostHandler = async (id) => {
        try {
            setLoading(true);
            const { data } = await axios.put(`/post/updatePost/${id}`, { title, description });
            alert(data?.message)
            setLoading(false);
            navigation.push('MyPost');
        }
        catch (error) {
            console.log(error)
            alert(error.message)

        }
    }

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>

                <View style={styles.centeredView}>

                    <View style={styles.modalView}>
                        <Text style={styles.modalText}> Update Your Post</Text>
                        <Text>
                            {/* hi{JSON.stringify(post, null, 4)} */}
                        </Text>
                        <View style={{ width: 380 }}>
                            <InputBox inputTitle={"Title"} value={title} setValue={setTitle} />
                            <InputBox inputTitle={"Description"} multiline={true} numberOfLines={6} value={description} setValue={setDescription} />
                        </View>
                        <View style={{ flexDirection: 'row', gap: 20, }}>
                            <SubmitButton handleSubmit={() => { updatePostHandler(post?._id); setModalVisible(!modalVisible) }} btnTitle={"Update"} />
                            <SubmitButton handleSubmit={() => setModalVisible(!modalVisible)} btnTitle={"Cancel"} />
                        </View>
                    </View>

                </View>
            </Modal>
        </View>
    )
}
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        width: 400,
        backgroundColor: '#f6cccc',
        borderRadius: 20,
        paddingVertical: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    modalText: {
        marginBottom: 20,
        textAlign: 'center',
        fontSize: 30,
        fontWeight: '600'
    },
});

