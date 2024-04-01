import React from 'react';
import { StatusBar, Alert, BackHandler, View } from 'react-native'; // Add View import
import { StyleSheet, Text, ScrollView, Image, TouchableHighlight} from 'react-native'; // Remove StatusBar and Alert imports
import Status from './components/Status';
import MessageList from './components/MessageLists';
import ToolBar from './components/Toolbar'; // Add Toolbar import
import { createImageMessage, createLocationMessage, createTextMessage } from './utils/MessageUtils';

export default class App extends React.Component {
  state = {
    messages: [
      createImageMessage('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStPXKR64BLnh34GW9Wbhdn9mllOn18-GCcIr5xm9RtEw&s'),
      createTextMessage('Welcome'),
      createTextMessage('Hi'),
      createLocationMessage({
        latitude: 37.78825,
        longitude: -122.4324,
      }),
    ],
    fullscreenimageid: null,
    isInputFocused: false, // Add isInputFocused state
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    const { fullscreenimageid } = this.state;
    if (fullscreenimageid) {
      this.dismissFullscreenimage();
      return true;
    }
    return false;
  };

  handlePressMessage = ({ id, type }) => {
    switch (type) {
      case 'text':
        this.showDeleteDialog(id);
        break;
      case 'image':
        this.setState({ fullscreenimageid: id });
        break;
      default:
        break;
    }
  };

  showDeleteDialog = (id) => {
    Alert.alert(
      'Delete Message',
      'Are you sure you want to delete this message?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => this.deleteMessage(id),
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };

  deleteMessage = (id) => {
    const { messages } = this.state;
    const updatedMessages = messages.filter(message => message.id !== id);
    this.setState({ messages: updatedMessages });
  };

  dismissFullscreenimage = () => {
    this.setState({ fullscreenimageid: null });
  };

  handlePressToolbarCamera = () => {
    // Implement camera toolbar action
  };

  handlePressToolbarLocation = () => {
    // Implement location toolbar action
  };

  handleChangeFocus = (isFocused) => {
    this.setState({ isInputFocused: isFocused });
  };

  handleSubmit = (text) => {
    const { messages } = this.state;
    this.setState({
      messages: [createTextMessage(text), ...messages],
    });
  };

  renderFullscreenimage = () => {
    const { messages, fullscreenimageid } = this.state;
    if (!fullscreenimageid) return null;
    const image = messages.find(message => message.id === fullscreenimageid);
    if (!image) return null;
    const { uri } = image;
    return (
      <TouchableHighlight style={styles.fullscreenOverlay} onPress={this.dismissFullscreenimage}>
        <Image style={styles.fullscreenimage} source={{ uri }} />
      </TouchableHighlight>
    );
  };

  renderMessageList() {
    const { messages } = this.state;
    return (
      <View style={styles.content}>
        <MessageList messages={messages} onPressMessage={this.handlePressMessage} />
      </View>
    );
  }

  renderToolbar() {
    const { isInputFocused } = this.state;
    return (
      <View style={styles.toolbar}>
        <ToolBar
          isFocused={isInputFocused}
          onSubmit={this.handleSubmit}
          onChangeFocus={this.handleChangeFocus}
          onPressCamera={this.handlePressToolbarCamera}
          onPressLocation={this.handlePressToolbarLocation}
        />
      </View>
    );
  }

  renderinputMethodEditor() {
    // Implement your inputMethodEditor rendering logic here
    return <View style={styles.inputMethodEditor}></View>;
  }

  render() {
    return (
      <View style={styles.container}>
        <Status />
        {this.renderMessageList()}
        {this.renderToolbar()}
        {this.renderinputMethodEditor()}
        {this.renderFullscreenimage()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 6,
    backgroundColor: 'white',
    padding: 20,
  },
  inputMethodEditor: {
    flex: 5,
    backgroundColor: 'white',
  },
  toolbar: {
    flex: 1,
    borderTopColor: 'rgba(0,0,0,0.04)',
    backgroundColor: 'white',
  },
  fullscreenOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullscreenimage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});
