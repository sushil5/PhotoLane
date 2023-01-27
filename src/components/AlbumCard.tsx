import {useNavigation} from '@react-navigation/native';
import React, {type PropsWithChildren, useEffect} from 'react';
import {
  ViewStyle,
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Album, User} from '../models';
import {colors} from '../theme';

type AlbumCardProps = {
  album: Album;
  onAlbumPress: (album: Album) => void;
};
const AlbumCard: React.FC<AlbumCardProps> = ({album, onAlbumPress}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onAlbumPress(album);
      }}
      style={styles.card}>
      <Image
        style={{width: 150, height: 150, borderRadius: 5}}
        source={{uri: 'https://via.placeholder.com/150/24f355'}}
      />
      <Text
        numberOfLines={2}
        style={{
          color: colors.secondary,
          maxWidth: 150,
          fontWeight: 'bold',
          textTransform: 'capitalize',
          marginVertical: 2,
        }}>
        {album.title}
      </Text>
      <Text style={{color: colors.secondary, opacity: 0.6}}>{25}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {margin: 10},
});

export default AlbumCard;
