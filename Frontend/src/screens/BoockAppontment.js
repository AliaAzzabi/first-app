import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    TextInput,
    Switch,
    ScrollView,
    SafeAreaView,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import CommonBtn from '../components/CommonBtn';
import { FlatList } from 'react-native';
const BookAppointment = ({ navigation }) => {
    const [selectedSlot, setSelectedSlot] = useState(0);
    const [isNewPatient, setIsNewPatient] = useState(false);
    const [selectedDay, setSelectedDay] = useState(-1);
    const [patientInfo, setPatientInfo] = useState({
        name: '',
        phone: '',
        email: ''
    });

    const handleInputChange = (field, value) => {
        setPatientInfo({
            ...patientInfo,
            [field]: value
        });
    };
    const [days, setDays] = useState([]);

    useEffect(() => {
        DaysList = [];
        for (let i = 1; i <= getDays(new Date().getMonth() + 1); i++) {
            DaysList.push({ day: i, selected: false });
        }
        setDays(DaysList);
    }, []);
    const getDays = month => {
        let days = 0;
        if (month == 1) {
            days = 31;
        } else if (month == 2) {
            days = 28;
        } else if (month == 3) {
            days = 31;
        } else if (month == 4) {
            days = 30;
        } else if (month == 5) {
            days = 31;
        } else if (month == 6) {
            days = 30;
        } else if (month == 7) {
            days = 31;
        } else if (month == 8) {
            days = 31;
        } else if (month == 9) {
            days = 30;
        } else if (month == 10) {
            days = 31;
        } else if (month == 11) {
            days = 30;
        } else if (month == 12) {
            days = 31;
        }
        return days;
    };

    return (
        <ScrollView>
            <SafeAreaView style={styles.container}>
                <Header
                    icon={require('../image/back.png')}
                    onPress={() => navigation.navigate('Home')} // Utilisez une fonction pour appeler navigation.navigate
                    title={'Rendez-Vous 📅 '}
                />
                <Image source={require('../image/doctor.png')} style={styles.docImg} />
                <Text style={styles.name}>Docteur Sami</Text>
                <Text style={styles.spcl}>Docteur de dermotologie</Text>
                <Text style={styles.heading}> Planifiez Votre Rendez-vous</Text>
                <View style={{ marginTop: 20 }}>
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={days}
                        keyExtractor={(item, index) => index.toString()} // Utilisez l'index comme clé
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity
                                    key={index} // Assurez-vous d'ajouter une clé unique à chaque élément
                                    style={{
                                        width: 60,
                                        height: 70,
                                        borderRadius: 20,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: selectedDay === index ? 'blue' : 'white',
                                        borderWidth: selectedDay === index ? 0 : 1,
                                        marginLeft: 10,
                                    }}
                                    onPress={() => {
                                        if (item.day < new Date().getDate()) {
                                            // Ajoutez votre logique ici si nécessaire
                                        } else {
                                            setSelectedDay(index);
                                        }
                                    }}>
                                    <Text style={{ color: selectedDay === index ? '#fff' : 'blue' }}>
                                        {item.day}
                                    </Text>
                                </TouchableOpacity>
                            );
                        }}
                    />

                </View>
                <Text style={styles.heading}>Temps disponibles</Text>
                <View style={styles.timeSlotsContainer}>
                    {[...Array(6).keys()].map((index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.timeSlot,
                                { borderColor: selectedSlot == index ? 'blue' : 'black' }
                            ]}
                            onPress={() => {
                                setSelectedSlot(index);
                            }}
                        >
                            <Text style={{ color: index == selectedSlot ? 'blue' : 'black' }}>
                                {['10.00-12:00PM', '12.00-14:00PM', '14.00-16:00PM', '10.00-12:00PM', '12.00-14:00PM', '14.00-16:00PM'][index]}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <Text style={styles.heading}>Coordonné Patient</Text>
                <View style={styles.patientInfoContainer}>
                    <Text>Êtes-vous un nouveau patient?</Text>
                    <Switch
                        value={isNewPatient}
                        onValueChange={(value) => setIsNewPatient(value)}
                    />
                    {isNewPatient ? (
                        <View>
                            <TextInput
                                style={styles.input}
                                placeholder="CIN"
                                value={patientInfo.cin}
                                onChangeText={(text) => handleInputChange('cin', text)}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Nom & Prénom"
                                value={patientInfo.name}
                                onChangeText={(text) => handleInputChange('name', text)}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Téléphone"
                                value={patientInfo.phone}
                                onChangeText={(text) => handleInputChange('phone', text)}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Email"
                                value={patientInfo.email}
                                onChangeText={(text) => handleInputChange('email', text)}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Date de naissance (jj/mm/aaaa)"
                                value={patientInfo.dob}
                                onChangeText={(text) => handleInputChange('dob', text)}
                            />

                            <TextInput
                                style={styles.input}
                                placeholder="Adresse"
                                value={patientInfo.address}
                                onChangeText={(text) => handleInputChange('address', text)}
                            />
                            <View style={styles.radioContainer}>
                                <Text>Sexe:</Text>
                                <TouchableOpacity
                                    style={[styles.radioButton, patientInfo.sexe === 'Homme' && styles.radioButtonSelected]}
                                    onPress={() => handleInputChange('sexe', 'Homme')}
                                >
                                    <Text>Homme</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.radioButton, patientInfo.sexe === 'Femme' && styles.radioButtonSelected]}
                                    onPress={() => handleInputChange('sexe', 'Femme')}
                                >
                                    <Text>Femme</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.notifyContainer}>
                                <Text>Notifier par:</Text>
                                <View style={styles.notifyOptions}>
                                    <View style={styles.notifyOption}>
                                        <Text>SMS</Text>
                                        <Switch
                                        // value={patientInfo.notifier.includes('sms')}
                                        //  onValueChange={(checked) => handleNotifierChange('sms', checked)}
                                        />
                                    </View>
                                    <View style={styles.notifyOption}>
                                        <Text>Email</Text>
                                        <Switch
                                        //  value={patientInfo.notifier.includes('email')}
                                        // onValueChange={(checked) => handleNotifierChange('email', checked)}
                                        />
                                    </View>
                                    <View style={styles.notifyOption}>
                                        <Text>Appel</Text>
                                        <Switch
                                        // value={patientInfo.notifier.includes('call')}
                                        // onValueChange={(checked) => handleNotifierChange('call', checked)}
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>
                    ) : (
                        <TextInput
                            style={styles.input}
                            placeholder="Entrez vos coordonnées"
                        />
                    )}
                </View>
                <View style={styles.btnView}>
                    <CommonBtn
                        w={300}
                        h={45}
                        txt={'Réserver'}
                        status={true}
                        onClick={() => {
                            navigation.navigate('Success');
                        }}
                    />
                </View>
            </SafeAreaView>
        </ScrollView>
    );
};

export default BookAppointment;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    docImg: {
        width: 100,
        height: 100,
        marginTop: 50,
        alignSelf: 'center',
    },
    name: {
        fontSize: 20,
        fontWeight: '700',
        alignSelf: 'center',
        marginTop: 10,
    },
    spcl: {
        fontSize: 16,
        fontWeight: '700',
        alignSelf: 'center',
        marginTop: 10,
        backgroundColor: '#f2f2f2',
        color: 'green',
        padding: 5,
        borderRadius: 10,
    },
    heading: {
        color: '#000',
        fontSize: 18,
        fontWeight: '700',
        marginTop: 15,
        marginLeft: 15,
    },
    timeSlotsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },
    timeSlot: {
        width: '48%',
        height: 40,
        borderRadius: 10,
        borderWidth: 0.5,
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    patientInfoContainer: {
        marginHorizontal: 15,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginTop: 10,
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    btnView: {
        alignItems: 'center',
        marginTop: 20,
    },
    radioContainer: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    radioButton: {
        borderWidth: 1,
        borderColor: '#ccc',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    radioButtonSelected: {
        backgroundColor: '#ccc',
    },
    notifyContainer: {
        marginTop: 10,
    },
    notifyOptions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
    },
    notifyOption: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});
