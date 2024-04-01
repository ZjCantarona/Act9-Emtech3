import React from 'react';
import { View, StatusBar as RNStatusBar } from 'react-native';
const StatusBar = ({ backgroundColor, barStyle }) => {
return (
<View style={{ height: RNStatusBar.currentHeight, backgroundColor
}}>
<RNStatusBar barStyle={barStyle} backgroundColor={backgroundColor}
/>
</View>
);
};
export default StatusBar;

