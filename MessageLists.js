import React from 'react';
 import PropTypes from 'prop-types';
 import { FlatList, StyleSheet, Image, Text, TouchableOpacity, View }
 from 'react-native';
 import { MessageShape } from '../utils/MessageUtils';
 import MapView, { Marker } from 'react-native-maps';
 const keyExtractor = item => item.id.toString();
export default class MessageList extends React.Component {
 static propTypes = {
 messages: PropTypes.arrayOf(MessageShape).isRequired,
 onPressMessage: PropTypes.func,
 };
 static defaultProps = {
 onPressMessage: () => {},
 };
 renderMessageItem = ({ item }) => {
 const { onPressMessage } = this.props;
 return (
 <View key={item.id} style={[styles.messageRow,
 styles.rightAlign]}>
 <TouchableOpacity onPress={() => onPressMessage(item)}>
 {this.renderMessageBody(item)}
 </TouchableOpacity>
 </View>
 );
 };
 renderMessageBody = ({ type, text, uri, coordinate }) => {
 switch (type) {
 case 'text':
 return (
 <View style={[styles.messageBubble, styles.textMessage]}>
 <Text style={styles.text}>{text}</Text>
 </View>
 );
 case 'image':
 return <Image style={[styles.messageBubble,
 styles.imageMessage]} source={{ uri }} />;
 case 'location':
 return (
 <View style={[styles.messageBubble, styles.locationMessage]}>
 <MapView
 style={styles.map}
 initialRegion={{
...coordinate,
 latitudeDelta: 0.08,
 longitudeDelta: 0.04,
 }}
 >
 <Marker coordinate={coordinate} />
 </MapView>
 </View>
 );
 default:
 return null;
 }
 };
 render() {
 const { messages } = this.props;
 return (
 <FlatList
 style={styles.container}
 inverted
 data={messages}
 renderItem={this.renderMessageItem}
 keyExtractor={keyExtractor}
 keyboardShouldPersistTaps={'handled'}
 />
 );
 }
 }
 const styles = StyleSheet.create({
 container: {
 flex: 1,
 overflow: 'visible',
 paddingHorizontal: 10,
 },
 messageRow: {
 flexDirection: 'row',
 justifyContent: 'flex-end',
 marginBottom: 10,
},
 rightAlign: {
 alignItems: 'flex-end',
 },
 messageBubble: {
 borderRadius: 10,
 padding: 10,
 marginHorizontal: 5,
 },
 textMessage: {
 backgroundColor: '#007AFF',
 alignSelf: 'flex-end',
 maxWidth: '100%',
 borderRadius: 10,
 padding: 10,
 marginHorizontal: 5,
 },
 imageMessage: {
 width: 200,
 height: 150,
 alignSelf: 'flex-end',
 borderRadius: 10,
 },
 locationMessage: {
 width: 200,
 height: 150,
 alignSelf: 'flex-end',
 },
 text: {
 fontSize: 16,
 color: 'white',
 },
 map: {
 width: '100%',
 height: '100%',
 borderRadius: 10,
 },
 });