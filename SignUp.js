import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  ScrollView,
  StatusBar,
  ToastAndroid,
  AlertIOS,
  ImageBackground,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

const SignupScreen = ({navigation}) => {
  const manual_data = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };
  const init = {
    username: '',
    password: '',
    email: '',
    confirm_password: '',
    check_textInputChange: false,
    check_email: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
    match_password: true,
  };
  const [data, setData] = React.useState(init);
  const capitalizeName = name => {
    const n = name.split(' ');
    for (var i = 0; i < n.length; i++) {
      n[i] = n[i].charAt(0).toUpperCase() + n[i].slice(1);
    }
    name = n.join(' ');
    return name;
  };

  const changeusername = val => {
    if (val.length !== 0) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
      });
    }
  };
  const SignupUser = async data => {
    await CONSTANT.API.post('/users/signup', data)
      .then(response => {
        ToastAndroid.show(
          `Account Created, Please Verify the Email Address `,
          ToastAndroid.SHORT,
        );
        setData(init);

        navigation.goBack();
      })
      .catch(error => showmsg(`${error.message}`));
  };
  const createuser = () => {
    if (data.username.trim().length < 1) {
      showmsg('Please Enter Username');
    } else if (data.email.trim().length < 1) {
      showmsg('Please Enter Email');
    } else if (data.check_email === false) {
      showmsg('Please Enter Valid Email');
    } else if (
      data.password.trim().length < 1 ||
      data.confirm_password.trim().length < 1
    ) {
      showmsg('Please enter password');
    } else if (data.match_password === false) {
      showmsg(`Password dont match`);
    } else {
      if (Platform.OS === 'android') {
        manual_data.name = capitalizeName(data.username);
        manual_data.email = data.email.toLowerCase();
        manual_data.password = data.password;
        manual_data.confirmPassword = data.confirm_password;
        SignupUser(manual_data);
      } else {
        // implementation for IOS
      }
    }
  };
  const changeemail = val => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(val) === true) {
      setData({
        ...data,
        email: val,
        check_email: true,
      });
    } else {
      setData({
        ...data,
        email: val,
        check_email: false,
      });
    }
  };

  const handlePasswordChange = val => {
    if (data.confirm_password === val) {
      setData({
        ...data,
        match_password: true,
        password: val,
      });
    } else {
      setData({
        ...data,
        match_password: false,
        password: val,
      });
    }
  };

  const handleConfirmPasswordChange = val => {
    if (data.password === val) {
      setData({
        ...data,
        match_password: true,
        confirm_password: val,
      });
    } else {
      setData({
        ...data,
        match_password: false,
        confirm_password: val,
      });
    }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const updateConfirmSecureTextEntry = () => {
    setData({
      ...data,
      confirm_secureTextEntry: !data.confirm_secureTextEntry,
    });
  };
  const showmsg = msg => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
      AlertIOS.alert(msg);
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#160d22" barStyle="light-content" />
      <Animatable.View
        style={styles.header}
        animation="fadeInDownBig"></Animatable.View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <ScrollView>
          <Text style={styles.text_footer}>Username</Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#000" size={20} />
            <TextInput
              placeholder="Your Username"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={val => changeusername(val)}
            />
            {data.check_textInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>
          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 35,
              },
            ]}>
            Email
          </Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#000" size={20} />
            <TextInput
              placeholder="Your Email"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={val => changeemail(val)}
            />
            {data.check_email ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>

          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 35,
              },
            ]}>
            Password
          </Text>
          <View style={styles.action}>
            <Feather name="lock" color="#000" size={20} />
            <TextInput
              placeholder="Your Password"
              secureTextEntry={data.secureTextEntry ? true : false}
              style={styles.textInput}
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

          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 35,
              },
            ]}>
            Confirm Password
          </Text>
          <View style={styles.action}>
            <Feather name="lock" color="#000" size={20} />
            <TextInput
              placeholder="Confirm Your Password"
              secureTextEntry={data.confirm_secureTextEntry ? true : false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={val => handleConfirmPasswordChange(val)}
            />
            <TouchableOpacity onPress={updateConfirmSecureTextEntry}>
              {data.confirm_secureTextEntry ? (
                <Feather name="eye-off" color="grey" size={20} />
              ) : (
                <Feather name="eye" color="#000" size={20} />
              )}
            </TouchableOpacity>
          </View>
          {data.password.trim().length > 1 &&
          data.confirm_password.trim().length > 1 &&
          data.match_password ? (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.msg}>Password Match.</Text>
            </Animatable.View>
          ) : (
            data.password.trim().length > 1 &&
            data.confirm_password.trim().length > 1 && (
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMsg}>Password not match.</Text>
              </Animatable.View>
            )
          )}

          <View style={styles.textPrivate}>
            <Text style={styles.color_textPrivate}>
              By signing up you agree to our
            </Text>
            <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>
              {' '}
              Terms of service
            </Text>
            <Text style={styles.color_textPrivate}> and</Text>
            <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>
              {' '}
              Privacy policy
            </Text>
          </View>
          <View style={styles.button}>
            <TouchableOpacity
              style={styles.signIn}
              onPress={() => createuser()}>
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
                  Sign Up
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={[
                styles.signIn,
                {
                  borderColor: '#000',
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
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animatable.View>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 10,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: 'orange',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    color: '#000',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
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
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  msg: {
    color: '#00FF00',
    fontSize: 14,
  },
  color_textPrivate: {
    color: '#3c4443',
  },
});