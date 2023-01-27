import React, {type PropsWithChildren} from 'react';
import {
  ViewStyle,
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {colors} from '../theme';

const Container: React.FC<
  PropsWithChildren<{
    style?: ViewStyle;
  }>
> = ({children, style}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <View style={style || styles.container}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Container;
