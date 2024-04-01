import { Constants } from 'expo';
import { Platform, StatusBar, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import NetInfo from "@react-native-community/netinfo";


export default class Status extends React.Component {
    state = {
        isConnected: false,
    };


    componentDidMount() {
        this.unsubscribe = NetInfo.addEventListener(state => {
            this.setState({ isConnected: state.isConnected });
        });
    }


    componentWillUnmount() {
        this.unsubscribe();
    }


    render() {
        const { isConnected } = this.state;
        const backgroundColor = isConnected ? 'green' : 'red';
        const statusBar = (
            <StatusBar
                backgroundColor={backgroundColor}
                barStyle={isConnected ? 'dark-content' : 'light-content'}
                animated={false}
            />
        );


        return (
            <View style={[styles.status, { backgroundColor }]}>
                {statusBar}
                {!isConnected && (
                    <View style={styles.messageContainer}>
                        <View style={styles.bubble}>
                            <Text style={styles.text}>No Network Connection!</Text>
                        </View>
                    </View>
                )}
            </View>
        );
    }
}




const statusHeight = (Platform.OS === 'ios' ? Constants.statusBarHeight : 0);




const styles = StyleSheet.create({
    status: {
        zIndex: 1,
        height: statusHeight
    },
    messageContainer: {
        zIndex: 1,
        position: 'absolute',
        top: statusHeight + 50,
        right: 0, left: 0,
        height: 100,
        alignItems: 'center'
    },
    bubble: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: 'blue'
    },
    text: {
        color: 'white'
    },
    bubbleWithConnection: {
        marginTop: 10,
        backgroundColor: 'green',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20
    },
    connectedText: {
        color: 'white'
    },
});
