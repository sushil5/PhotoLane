import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Container} from '../../components';
import UserCard from '../../components/UserCard';
import {User} from '../../models';

const Photos: React.FC = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => {
        setUsers(users);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const renderItem = ({item, index}: {item: User; index: number}) => {
    return <UserCard user={item} />;
  };

  return (
    <Container>
      <FlatList data={users} renderItem={renderItem} />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Photos;

// import React, {Component} from 'react';
// import {View, StyleSheet, Animated, TouchableOpacity} from 'react-native';

// class Photos extends Component {

//   componentWillMount = () => {
//     this.animatedWidth = new Animated.Value(50);
//     this.animatedHeight = new Animated.Value(100);
//   };
//   animatedBox = () => {
//     Animated.timing(this.animatedWidth, {
//       toValue: 200,
//       duration: 1000,
//     }).start();
//     Animated.timing(this.animatedHeight, {
//       toValue: 500,
//       duration: 500,
//     }).start();
//   };
//   render() {
//     const animatedStyle = {
//       width: this.animatedWidth,
//       height: this.animatedHeight,
//     };
//     return (
//       <TouchableOpacity style={styles.container} onPress={this.animatedBox}>
//         <Animated.View style={[styles.box, animatedStyle]} />
//       </TouchableOpacity>
//     );
//   }
// }
// export default Photos;

// const styles = StyleSheet.create({
//   container: {
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   box: {
//     backgroundColor: 'blue',
//     width: 50,
//     height: 100,
//   },
// });
