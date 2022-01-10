import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  ToastAndroid,
  AlertIOS,
  ImageBackground,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import * as auth from './authorization';
const SignInScreen = ({navigation}) => {
  const init = {
    email: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidPassword: true,
    isValidUser: true,
  };
  const [data, setData] = React.useState(init);

  // const getData = async () => {
  //   try {
  //     const jsonValue = await AsyncStorage.getItem('email');
  //     return jsonValue != null ? navigation.navigate('Main') : null;
  //   } catch (e) {
  //     console.log(error);
  //   }
  // };

  const textInputChange = val => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    if (reg.test(val) === true) {
      setData({
        ...data,
        email: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        email: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
    if (val.length < 1) {
      setData({
        ...data,
        email: val,
        isValidUser: true,
      });
    }
  };
  const showmsg = msg => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
      AlertIOS.alert(msg);
    }
  };

  const handlePasswordChange = val => {
    if (val.trim().length >= 6) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      });
    }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };
  // const storeData = async (email, name) => {
  //   try {
  //     const Email = JSON.stringify(email);
  //     await AsyncStorage.setItem('email', Email);
  //     navigation.navigate('AppStack');
  //     const Name = JSON.stringify(name);
  //     await AsyncStorage.setItem('name', Name);
  //   } catch (e) {
  //     showmsg(e);
  //   }
  // };
  const SignInUser = async data => {
    try {
      await CONSTANT.API.post('/users/signin', data)
        .then(response => {
          if (response.data.success) {
            storeData(response.data.result.email, response.data.result.name);
            showmsg('User Signed In!');
            setData(init);
            //navigation.navigate('Main');
          } else {
            showmsg(response.data.message);
          }
        })
        .catch(error => console.log(error.message));
    } catch (error) {
      console.log(error.message);
    }
  };
  const SignInWithemail = async () => {
    if (data.email.length < 1) {
      showmsg('Please Enter email');
    } else if (data.isValidUser === false) {
      showmsg('Please Enter Valid email');
    } else if (data.password.trim().length < 1) {
      showmsg('Please Enter Password');
    } else if (data.isValidPassword === false) {
      showmsg('Please Enter Valid Password');
    } else {
      if (Platform.OS === 'android') {
        const result = await auth.default.onLogin(
          data.email.toLowerCase(),
          data.password,
        );
        if (result) {
          navigation.navigate('detail');
          showmsg('User Signed In!');
          setData(init);
        } else {
          showmsg('Something went wrong. Please try again');
        }
      } else {
        // implementation for IOS
      }
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#160d22" barStyle="light-content" />
      <Animatable.View style={styles.header} animation="fadeInDownBig">
        <Text style={styles.text_header}>Welcome!</Text>
      </Animatable.View>
      <Animatable.View animation="fadeInUpBig" style={[styles.footer]}>
        <Text style={styles.text_footer}>Email</Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" color={'#000'} size={20} />
          <TextInput
            value={data.email}
            placeholder="Your Email"
            placeholderTextColor="#666666"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={val => textInputChange(val)}
          />
          {data.check_textInputChange ? (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="green" size={20} />
            </Animatable.View>
          ) : null}
        </View>
        {data.isValidUser ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>email is not Valid.</Text>
          </Animatable.View>
        )}
        <Text style={styles.text_footer}>Password</Text>
        <View style={styles.action}>
          <Feather name="lock" color={'#000'} size={20} />
          <TextInput
            placeholder="Your Password"
            placeholderTextColor="#666666"
            secureTextEntry={data.secureTextEntry ? true : false}
            style={styles.textInput}
            value={data.password}
            autoCapitalize="none"
            onChangeText={val => handlePasswordChange(val)}
          />
          <TouchableOpacity onPress={updateSecureTextEntry}>
            {data.secureTextEntry ? (
              <Feather name="eye-off" color="grey" size={20} />
            ) : (
              <Feather name="eye" color="#000" size={20} />
            )}
          </TouchableOpacity>
        </View>
        {data.isValidPassword ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Password must be 6 characters long.
            </Text>
          </Animatable.View>
        )}

        <TouchableOpacity>
          <Text style={{color: '#009387', marginTop: 15}}>
            Forgot password?
          </Text>
        </TouchableOpacity>

        <View style={styles.button}>
          <TouchableOpacity
            style={styles.signIn}
            onPress={() => SignInWithemail()}>
            <LinearGradient
              colors={['#4d2e33', '#d7a083']}
              style={styles.signIn}>
              <Text
                style={[
                  styles.textSign,
                  {
                    color: '#fff',
                  },
                ]}>
                Sign In
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Signup')}
            style={[
              styles.signIn,
              {
                borderColor: '#160d22',
                borderWidth: 1,
                marginTop: 15,
              },
            ]}>
            <Text
              style={[
                styles.textSign,
                {
                  color: '#000',
                },
              ]}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4d2e33',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
