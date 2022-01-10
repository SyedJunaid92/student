import * as firebase from 'firebase';
import Firebase from '../config/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

const auth = Firebase.auth();

//storing students data after sign up
async function storeStudentData(name, mail, uid) {
  firebase
    .database()
    .ref(`db/students/${uid}`)
    .update({
      name: name,
      mail: mail,
    })
    .then(result => {
      console.log('ss', result);
      return 'stored';
    })
    .catch(err => {
      console.log(err);
    });
  return 'stored';
}

async function getStudentData(uid) {
  let user = new Object();
  firebase
    .database()
    .ref(`db/students/${uid}`)
    .on('value', snapshot => {
      const temp = snapshot.val();
      if (temp) {
        user = Object.values(temp);
        const Email = JSON.stringify(user[0]);
        AsyncStorage.setItem('email', Email);
        const Name = JSON.stringify(user[1]);
        AsyncStorage.setItem('name', Name);
      }
    });

  return user;
}

function getAssignments() {
  let assignments = [];
  firebase
    .database()
    .ref(`db/assignments`)
    .on('value', snapshot => {
      const temp = snapshot.val();
      if (temp) {
        assignments = Object.values(temp); //returns an array of all assignments
      }
    });

  return assignments;
}

function assignmentAttempted(studentName, assignmentID, marks, email) {
  let timestamp = moment().format('YYYYMMDDhhmmss');
  firebase
    .database()
    .ref(`db/assignments/${assignmentID}/attempt/${timestamp}`)
    .update({
      studentName: studentName,
      marks: marks,
      email: email,
    });
}
export default {
  storeStudentData,
  getStudentData,
  getAssignments,
  assignmentAttempted,
};
