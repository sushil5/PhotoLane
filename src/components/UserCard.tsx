import {useNavigation} from '@react-navigation/native';
import React, {type PropsWithChildren} from 'react';
import {
  ViewStyle,
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
} from 'react-native';
import {User} from '../models';
import {colors} from '../theme';

type UserCardProps = {
  user: User;
};
const UserCard: React.FC<UserCardProps> = ({user}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('UserAlbums', {user})}
      style={styles.card}>
      <View style={{}}>
        <Text
          style={{color: colors.secondary, fontWeight: 'bold', fontSize: 16}}>
          {user.name}
        </Text>
      </View>
      <View style={{marginVertical: 10}}>
        <Text style={{color: colors.secondary, fontSize: 14}}>
          {user.email}
        </Text>
        <Text style={{color: colors.secondary, fontSize: 14}}>
          {user.phone}
        </Text>
      </View>
      <View
        style={{
          marginVertical: 10,
          paddingTop: 10,
          borderTopWidth: 0.3,
          borderTopColor: colors.secondary,
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <Text style={{color: colors.secondary, fontSize: 14}}>
          {user.company?.name}
        </Text>
        <Text style={{color: colors.secondary, fontSize: 14}}>25</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.primary,
    borderRadius: 6,
    padding: 20,
    paddingBottom: 10,
    margin: 10,
    elevation: 1,
  },
});

export default UserCard;
