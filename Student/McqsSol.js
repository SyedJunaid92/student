import React, {useState, useEffect} from 'react';
import {
  ImageBackground,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import GradientView from './GradientView';
const {width, height} = Dimensions.get('window');
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as db from './db';

const McqsSol = ({navigation, route}) => {
  const id = route.params.id;

  const allQuestions = route.params.question;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
  const [correctOption, setCorrectOption] = useState(null);
  const [showNextButton, setShowNextButton] = useState(false);
  const [btnText, setBtntext] = useState('Next');
  const [email, setEmail] = useState();
  const [sum, setSum] = useState(0);
  const [name, setName] = useState();

  useEffect(() => {
    getOnlineUser();
  }, []);
  useEffect(() => {
    submitAssignment(sum);
  }, [sum]);
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
  const validateAnswer = selectedOption => {
    let correct_option = allQuestions[currentQuestionIndex]['correct'];
    setCurrentOptionSelected(selectedOption);
    setCorrectOption(correct_option);
    // Show Next Button
    setShowNextButton(true);
    if (currentQuestionIndex == allQuestions.length - 1) {
      setBtntext('Submit');
    }
  };
  const submitAssignment = async marks => {
    if (currentQuestionIndex == allQuestions.length - 1) {
      if (btnText === 'Submit') {
        db.default.assignmentAttempted(name, id, marks, email);
        setBtntext('Next');
        setCurrentQuestionIndex(0);
        setCorrectOption(null);
        setCurrentOptionSelected(null);
        setShowNextButton(false);
        setSum(0);
        navigation.navigate('detail');
      }
    }
  };
  const handleNext = async () => {
    if (currentOptionSelected.toUpperCase() == correctOption.toUpperCase()) {
      // Set Score
      setSum(sum + 1);
    }

    if (
      currentQuestionIndex == allQuestions.length - 1 &&
      currentOptionSelected.toUpperCase() != correctOption.toUpperCase()
    ) {
      submitAssignment(sum);
    } else if (currentQuestionIndex == allQuestions.length - 1) {
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentOptionSelected(null);
      setCorrectOption(null);
      setShowNextButton(false);
    }
  };
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        {/* instruction Container */}
        <View style={styles.instructionContainer}>
          <GradientView
            colors={['#4d2e33', '#d7a083']}
            style={styles.questionCount}>
            <Text style={styles.subHeading}>
              {currentQuestionIndex + 1}/{allQuestions.length}
            </Text>
          </GradientView>
        </View>
        {/* Body options Section  */}
        <View style={styles.optionsSection}>
          <Text style={styles.question}>
            Question:
            {allQuestions[currentQuestionIndex]?.question}
          </Text>
          <Text style={styles.headingText}>Select the correct option</Text>
          <View style={styles.optionContainer}>
            <View style={styles.optionContainer}>
              {allQuestions[currentQuestionIndex]?.options.map(
                (option, index) => (
                  <View key={index}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                      }}>
                      <TouchableOpacity
                        onPress={() => validateAnswer(option)}
                        key={option}>
                        <View style={styles.optionView}>
                          <Text style={styles.optionText}>{option}</Text>
                          {option == currentOptionSelected ? (
                            <View
                              style={{
                                width: 30,
                                height: 30,
                                borderRadius: 30 / 2,
                                backgroundColor: '#00C851',
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              <MaterialCommunityIcons
                                name="check"
                                style={{
                                  color: '#000',
                                  fontSize: 20,
                                }}
                              />
                            </View>
                          ) : null}
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                ),
              )}
            </View>
          </View>
        </View>
        {showNextButton ? (
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleNext}>
              <GradientView
                colors={['#4d2e33', '#d7a083']}
                style={styles.nextButton}>
                <Text style={(styles.headingText, {color: '#fff'})}>
                  {btnText}
                </Text>
              </GradientView>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#4d2e33',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: 15,
  },
  bodyContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  instructionContainer: {
    width: width,
    height: height * 0.1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  headingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'rgba(255,255,255,0.8)',
  },

  optionText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'rgba(255,255,255,0.8)',
  },
  questionCount: {
    width: width * 0.2,
    height: width * 0.1,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subHeading: {
    color: 'white',
    fontSize: 20,
  },
  optionsSection: {
    width: width,
    height: height * 0.6,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  listenImage: {
    width: width * 0.28,
    height: width * 0.28,
    borderRadius: (width * 0.28) / 2,
    borderWidth: 1,
    borderColor: 'black',
    resizeMode: 'cover',
  },
  question: {
    alignItems: 'center',
    flexDirection: 'row',
    fontSize: 24,
    fontWeight: 'bold',
    color: 'rgba(255,255,255,0.7)',
    borderRadius: 35,
    borderWidth: 2,
    padding: 15,
    borderColor: '#d7a083',
  },
  optionContainer: {
    height: height * 0.4,
    width: width,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  optionView: {
    height: height * 0.07,
    width: width * 0.65,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: '#d7a083',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  nextButton: {
    height: height * 0.05,
    width: width * 0.35,
    borderRadius: 30,

    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: height * 0.1,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
    color: '#0000',
  },
});

export default McqsSol;
