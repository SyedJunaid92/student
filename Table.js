import * as React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { View, Text ,StyleSheet} from 'react-native';
import { Table,Row, Rows} from 'react-native-table-component';



  const tableHead= ['Name', 'Subject', 'Class', 'Status','Action']
     const  tableData= [
        ['', '', '', '',<MaterialCommunityIcons name='eye' size={30}/>],
        ['', '', '', '',''],
        ['', '', '', '',''],
        ['', '', '', '',''],
        ['', '', '', '',''],
      ]




const App = () => {


  return (
    <View style={styles.container}>
        <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
          <Row data={tableHead} style={styles.head} textStyle={styles.text}/>
          <Rows data={tableData} textStyle={styles.text}/>
        </Table>
      </View>   
  )
}
export default App;

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16, 
    paddingTop: 30, 
    backgroundColor: '#fff' 
  },
  head: { 
    height: 40, 
    backgroundColor: '#f1f8ff' 
  },
  text: { 
    margin: 6 
  }
});