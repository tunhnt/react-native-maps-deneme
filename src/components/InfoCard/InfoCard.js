import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';

import Modal from 'react-native-modal';
import styles from './InfoCard.style'


const InfoCard = ({visible, close, user}) => {
    return(
        <Modal
            style={styles.modal}
            isVisible={visible} 
            swipeDirection="down" 
            onSwipeComplete={close}
            onBackdropPress={close}
            onBackButtonPress={close}
            backdropOpacity={0.1}
            >
            
            <View sytle={styles.container} >
                <Text style={styles.username}>{user.username}</Text>
                <Text style={styles.fullname}>{user.first_name} {user.last_name}</Text>
                <SafeAreaView style={styles.safeArea} />
            </View>
        </Modal>
    );
}

export default InfoCard;