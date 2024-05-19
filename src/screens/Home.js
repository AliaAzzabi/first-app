import { View, FlatList, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import Header from '../components/Header';
import { LinearGradient } from 'expo-linear-gradient';
import CommonBtn from '../components/CommonBtn';
import { SafeAreaView } from 'react-native';

const Home = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <Header
                title={'HealthBooker'}
                icon={require('../image/logo.png')}
            />
            <FlatList
                data={[{ type: 'banner' }, { type: 'category' }, { type: 'doctors' }]}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => {
                    if (item.type === 'banner') {
                        return (
                            <View>
                                <Image source={require('../image/banner.jpg')} style={styles.banner} />
                            </View>
                        );
                    } else if (item.type === 'category') {
                        return (
                            <View>
                                <Text style={styles.heading}>Selectionner Catégorie</Text>
                                <FlatList
                                    data={[1, 1, 1, 1, 1, 1, 1]}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    renderItem={({ item, index }) => {
                                        return (
                                            <TouchableOpacity>
                                                <LinearGradient
                                                    colors={['#4facfe', '#00f2fe']}
                                                    style={styles.linearGradient}
                                                >
                                                    <Text style={styles.catName}>
                                                        {'Category ' + (index + 1)}
                                                    </Text>
                                                </LinearGradient>
                                            </TouchableOpacity>
                                        );
                                    }}
                                    keyExtractor={(item, index) => index.toString()}
                                />
                            </View>
                        );
                    } else if (item.type === 'doctors') {
                        return (
                            <View>
                                <Text style={styles.heading}>Découvrez Nos Médecins</Text>
                                <FlatList
                                    numColumns={2}
                                    data={[1, 1, 1, 1, 1, 1, 1]}
                                    renderItem={({ item, index }) => {
                                        return (
                                            <View style={styles.docItem} >
                                                <Image source={require('../image/doctor.png')} style={styles.docImg} />
                                                <Text style={styles.docName}>Docteur {index + 1}</Text>
                                                <Text style={styles.docSpl}>Spécialité</Text>
                                                <CommonBtn
                                                    w={150}
                                                    h={40}
                                                    txt='Rendez-vous 📅🕒'
                                                    onClick={() => {
                                                        navigation.navigate('BookAppointment');
                                                    }}
                                                />
                                            </View>
                                        );
                                    }}
                                />
                            </View>
                        );
                    }
                }}
            />
            <View style={[styles.bottomView, { alignSelf: 'flex-end' }]}>

                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('Pending');
                    }}>
                    <Image
                        source={require('../image/pending.png')}
                        style={styles.bottomIcon}
                    />
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    banner: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: 10,
    },
    heading: {
        color: '#000',
        fontSize: 18,
        fontWeight: '700',
        marginTop: 15,
        marginLeft: 15,
    },
    linearGradient: {
        width: 120,
        height: 80,
        borderRadius: 10,
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    catName: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },
    docItem: {
        width: '45%',
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 0.2,
        margin: 10,
    },
    docImg: {
        width: 60,
        height: 60,
        borderRadius: 30,
        alignSelf: 'center',
        marginTop: 20,
    },
    docName: {
        fontSize: 18,
        fontWeight: '700',
        alignSelf: 'center',
        marginTop: 10,
    },
    docSpl: {
        fontSize: 14,
        marginTop: 5,
        fontWeight: '600',
        alignSelf: 'center',
        color: 'green',
        backgroundColor: '#f2f2f2',
        padding: 5,
        borderRadius: 10,
    },
    bottomView: {
        width: '20%',
        height: 60,
        borderRadius: 10,
        elevation: 5,
        position: 'absolute',
        bottom: 20,
        backgroundColor: '#fff',
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    bottomIcon: {
        width: 30,
        height: 30,
    },
});
