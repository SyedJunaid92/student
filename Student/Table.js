import * as React from 'react';
import {useEffect, useState, useCallback} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {
  View,
  Text,
  StyleSheet,
  Touchable,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {Table, Row, Rows} from 'react-native-table-component';
import * as db from './db';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

const tableHead = ['Title', 'Subject', 'Status', 'Action'];
// const tableData = [
//   ['', '', '', <MaterialCommunityIcons name="eye" size={30} />],
//   ['', '', '', ''],
//   ['', '', '', ''],
//   ['', '', '', ''],
//   ['', '', '', ''],
// ];

const App = ({navigation}) => {
  const [assignment, setAssignment] = useState();
  const [tableData, setTableData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  let temp = [];
  useEffect(() => {
    getOnlineUser();
  }, []);
  useEffect(() => {
    setAssignment(db.default.getAssignments());
  }, []);
  const getOnlineUser = async () => {
    try {
      let jsonValue = await AsyncStorage.getItem('email');
      let jsonValue1 = await AsyncStorage.getItem('name');
      if (jsonValue != null) {
        setEmail(JSON.parse(jsonValue));
        setName(JSON.parse(jsonValue1));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setTableData([]);
    setAssignment(db.default.getAssignments());
    setRefreshing(false);
  });
  const hasValue = (obj, key, value) => {
    return obj.hasOwnProperty(key) && obj[key] === value;
  };
  const checkValue = (attempted, std) => {
    if (email == undefined) {
      getOnlineUser();
    }
    // console.log(Object.values(attempted));
    const result = attempted.some(function (boy) {
      return hasValue(boy, 'email', email);
    });

    return result;
  };
  // echo "# student" >> README.md
  // git init
  // git add README.md
  // git commit -m "first commit"
  // git branch -M main
  // git remote add origin https://github.com/SyedJunaid92/student.git
  // git push -u origin main
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={styles.container}>
      <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
        <Row data={tableHead} style={styles.head} textStyle={styles.text} />
        <Rows data={tableData} textStyle={styles.text} />
      </Table>
      {assignment != undefined && tableData.length < assignment.length ? (
        <View>
          {assignment.forEach((element, index) => (
            <View key={index}>
              {(temp = [])}
              {(temp[0] = element.title)}
              {temp.push(element.className)}

              {temp.push(
                checkValue(Object.values(element.attempt))
                  ? 'Attempted'
                  : 'Not Attempt',
              )}

              {temp.push(
                <TouchableOpacity
                  style={{alignSelf: 'center'}}
                  disabled={checkValue(Object.values(element.attempt))}
                  onPress={() =>
                    navigation.navigate('mcqs', {
                      question: element.questions,
                      id: element.id,
                    })
                  }>
                  <FontAwesome5 name="edit" size={20} />
                </TouchableOpacity>,
              )}
              {/* {setTableData(tableData.push(temp))} */}
              {tableData.push(temp)}
            </View>
          ))}
        </View>
      ) : null}
    </ScrollView>
  );
};
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: '#fff',
  },
  head: {
    height: 40,
    backgroundColor: '#f1f8ff',
  },
  text: {
    margin: 6,
  },
});
