import Firebase from '../config/firebase'; // firebase config that you got from firebase console.
import db from './db';
import {ToastAndroid, Platform, AlertIOS} from 'react-native';

const auth = Firebase.auth();

const onSignUp = async (name, mail, password) => {
  try {
    let user_detail;
    await auth.createUserWithEmailAndPassword(mail, password).then(() => {
      user_detail = db.storeStudentData(
        name,
        mail.toLowerCase(),
        auth.currentUser.uid,
      );
    });

    return user_detail;
  } catch (error) {
    showmsg(error.message);
  }
};

const onLogin = async (mail, password) => {
  try {
    await auth.signInWithEmailAndPassword(mail, password);

    let user_detail = await db.getStudentData(auth.currentUser.uid);

    //check if user mail is verified
    return user_detail;
  } catch (error) {
    showmsg(error.message);
  }
};
const showmsg = msg => {
  if (Platform.OS === 'android') {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  } else {
    AlertIOS.alert(msg);
  }
};
export default {
  onSignUp,
  onLogin,
};
