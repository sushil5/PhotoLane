import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  Animated,
  Modal,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Container} from '../../components';
import AlbumCard from '../../components/AlbumCard';
import {Album, Photo, User} from '../../models';
import {colors} from '../../theme';
import FastImage from 'react-native-fast-image';

const UserAlbums: React.FC<any> = ({route}: {route: any}) => {
  const [albums, setAlbums] = useState<Array<Album>>([]);

  const [selectedAlbum, setSelectedAlbum] = useState<Album>();

  const [albumPhotos, setAlbumPhotos] = useState([]);

  const user: User = route?.params?.user;
  const navigation = useNavigation();
  const [albumViewColumn, setAlbumViewColumn] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      title: user.name,
    });
  }, []);

  useEffect(() => {
    getAlbums();
  }, []);

  const getAlbums = () => {
    fetch(`https://jsonplaceholder.typicode.com/albums?userId=${user.id}`)
      .then(response => response.json())
      .then(albums => {
        setAlbums(albums);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const getAlbumPhotos = (id: number) => {
    fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${id}`)
      .then(response => response.json())
      .then(albumPhotos => {
        setAlbumPhotos(albumPhotos);
        console.log(albumPhotos, 'album');
      })
      .catch(error => {
        console.error(error);
      });
  };

  const renderAlbums = ({item, index}: {item: Album; index: number}) => {
    const onAlbumPress = (item: Album) => {
      getAlbumPhotos(item?.id);
      setAlbumViewColumn(true);
      setSelectedAlbum(item);
    };
    return <AlbumCard onAlbumPress={onAlbumPress} album={item} />;
  };

  return (
    <Container>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
        }}>
        {albumViewColumn ? (
          <>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: colors.primary,
              }}>
              <AlbumVerticalList albums={albums || []} />
            </View>
            <View
              style={{
                flex: 2,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <AlbumPhotoList albumPhotos={albumPhotos || []} />
            </View>
          </>
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <FlatList
              keyExtractor={item => item.id.toString()}
              numColumns={2}
              data={albums}
              renderItem={renderAlbums}
            />
          </View>
        )}
      </View>
    </Container>
  );
};

export default UserAlbums;

const renderVerticalAlbums = ({item, index}: {item: Album; index: number}) => {
  return (
    <TouchableOpacity onPress={() => {}} style={{marginVertical: 5}}>
      <Image
        style={{width: 80, height: 80, borderRadius: 5}}
        source={{uri: 'https://via.placeholder.com/150/24f355'}}
      />
      <Text
        numberOfLines={1}
        style={{
          color: colors.secondary,
          maxWidth: 100,
          fontWeight: 'bold',
          textTransform: 'capitalize',
          marginVertical: 2,
        }}>
        {item?.title.substring(0, 8) + '...'}
      </Text>
      <Text
        style={{
          color: colors.secondary,
          textAlign: 'center',
          opacity: 0.6,
          fontSize: 12,
        }}>
        {25}
      </Text>
    </TouchableOpacity>
  );
};

const AlbumVerticalList = ({albums}: {albums: Array<Album>}) => {
  return (
    <View>
      <FlatList
        keyExtractor={item => item.id.toString()}
        data={albums}
        renderItem={renderVerticalAlbums}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const AlbumPhotoList = ({albumPhotos}: {albumPhotos: Array<Photo>}) => {
  const [photoModal, setPhotoModal] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo>();

  const onPhotoPress = (item: Photo) => {
    setPhotoModal(true);
    setSelectedPhoto(item);
  };

  const renderAlbumPhotos = ({item, index}: {item: Photo; index: number}) => {
    return (
      <TouchableOpacity onPress={() => onPhotoPress(item)} style={{margin: 5}}>
        {/* <Image
          style={{width: 120, height: 120, borderRadius: 5}}
          source={{
            uri: item.thumbnailUrl,
          }}
        /> */}
        <FastImage
          style={{width: 120, height: 120}}
          source={{
            uri: item.thumbnailUrl,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
      </TouchableOpacity>
    );
  };
  return (
    <View>
      <Modal transparent statusBarTranslucent visible={photoModal}>
        <View
          onTouchCancel={() => setPhotoModal(false)}
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Image
              source={{uri: selectedPhoto?.url}}
              style={{width: 300, height: 600, borderRadius: 10}}
            />
          </View>
        </View>
      </Modal>
      <FlatList
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        data={albumPhotos?.splice(0, 4)}
        renderItem={renderAlbumPhotos}
      />
    </View>
  );
};
