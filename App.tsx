/* eslint-disable prettier/prettier */
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

//FORM VALIDATION START
import * as Yup from 'yup';
import { Formik } from 'formik';

const PasswordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(6, 'Minimum length should be of 6 characters.')
    .max(16, 'Maximum length should be of 16 characters.')
    .required('This is an required feild.'),
});
//FORM VALIDATION END

export default function App(){
  const [password, setPassword] = useState('');
  const [passAvailable, setPassAvailable] = useState(false);

  const [lowerCase, setLowerCase] = useState(true);
  const [upperCase, setUpperCase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);


  //CREATING THE PASSWORD STRING OF REQUIRED LENGTH
  const generatePasswordString = (passwordLength: number) => {

    let list = '';

    let lc = 'abcdefghijklmnopqrstuvwxyz';
    let uc = 'ABCDEFGHIJKLMNOOPQRSTUVWXYZ';
    let nums = '1234567890';
    let sc = '!@#$%^&*~_+-|?><';

    if (lowerCase) { list += lc; }
    if (upperCase) { list += uc; }
    if (numbers) { list += nums; }
    if (symbols) { list += sc; }

    let res_string = createPassword(list,passwordLength);
    setPassword(res_string);
    setPassAvailable(true);
  };

  //MAIN LOGIC FOR CREATING PASSWORD STRING
  const createPassword = (characters: string, passwordLength: number) => {
    let result = '';
    for (let i = 0; i < passwordLength; i++){
      let char_index = Math.floor(Math.random() * characters.length);
      result += characters.charAt(char_index);
    }

    return result;
  };

  //RESETING TO DEFAULT
  const resetPassword = () => {
    setPassword('');
    setPassAvailable(false);
    setLowerCase(true);
    setUpperCase(false);
    setNumbers(false);
    setSymbols(false);
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.formContainer}>

          <Text style={styles.headerText}>Password Generator</Text>

          <Formik
       initialValues={{ passwordLength: '' }}
       validationSchema={PasswordSchema}
       onSubmit={ values => {
        console.log(values);
        generatePasswordString(Number(values.passwordLength));
       }}
     >
       {({
         values,
         errors,
         touched,
         handleChange,
         isValid,
         handleSubmit,
         handleReset,
         /* and other goodies */
       }) => (

        <>
        {/* INPUT FIELD AREA */}
        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>Password Length</Text>
          <View style={styles.inputStyles}>
          <TextInput
          value={values.passwordLength}
          onChangeText={handleChange('passwordLength')}
          keyboardType="numeric"
          placeholder="Example. 9"
          />
          </View>
        </View>

        {/* Error Message Display */}
        {touched.passwordLength && errors.passwordLength &&  (
            <Text style={styles.errorText}>{errors.passwordLength}</Text>
        )}

        {/* CHECKBOXES SECTION */}
        <View style={styles.checkBoxSec}>
          <View style={styles.checkFeild}>
            <Text style={styles.checkText}>Include LowerCase</Text>
            <BouncyCheckbox
            disableBuiltInState
            isChecked={lowerCase}
            onPress={ () => setLowerCase(!lowerCase) }
            fillColor="#487eb0"
            />
          </View>

          <View style={styles.checkFeild}>
            <Text style={styles.checkText}>Include UpperCase</Text>
            <BouncyCheckbox
            disableBuiltInState
            isChecked={upperCase}
            onPress={ () => setUpperCase(!upperCase) }
            fillColor="#487eb0"
            />
          </View>

          <View style={styles.checkFeild}>
            <Text style={styles.checkText}>Include Numbers</Text>
            <BouncyCheckbox
            disableBuiltInState
            isChecked={numbers}
            onPress={ () => setNumbers(!numbers) }
            fillColor="#487eb0"
            />
          </View>

          <View style={styles.checkFeild}>
            <Text style={styles.checkText}>Include Special Characters</Text>
            <BouncyCheckbox
            disableBuiltInState
            isChecked={symbols}
            onPress={ () => setSymbols(!symbols) }
            fillColor="#487eb0"
            />
          </View>
        </View>

        {/* FORM BUTTONS/ACTION BUTTONS */}
        <View style={styles.formButtons}>
          <TouchableOpacity disabled={!isValid} style={styles.btnOne} onPress={handleSubmit}>
            <Text>Generate Password</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnTwo} onPress={ () => {
            handleReset();
            resetPassword();
          }}>
            <Text>Reset</Text>
          </TouchableOpacity>
        </View>
        </>

       )}
     </Formik>

        </View>

        {/* CONDITION RENDERING FOR RESULT(GENERATED PASSWORD) */}
        {passAvailable ? (
          <View style={styles.resultContainer}>
            <Text selectable style={styles.resultText}>{password}</Text>
          </View>
        ) : null}

      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {},
  formContainer: {},
  headerText: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    fontFamily: 'Raleway',
  },
  inputWrapper: {
    margin: 7,
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputStyles: {
    borderWidth: 1,
    borderColor: '#fff',
    width: 170,
    padding:4,
    paddingBottom: 0,
    paddingTop: 0,
    borderRadius: 10,
  },
  inputLabel: {
    fontSize: 19,
    fontWeight: '600',
    fontFamily: 'Raleway',
  },
  errorText: {
    textAlign: 'center',
    paddingVertical: 10,
    color: '#F97F51',
  },
  checkBoxSec: {
    paddingLeft: 10,
    paddingTop: 15,
    paddingBottom: 15,
  },
  checkText: {
    fontSize: 18,
  },
  checkFeild: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  formButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  btnOne: {
    backgroundColor: '#273c75',
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 8,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  btnTwo: {
    backgroundColor: '#273c75',
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 8,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  resultContainer: {
    width: 300,
    height: 100,
    alignSelf: 'center',
    backgroundColor: '#487eb0',
    marginVertical: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
  },
  resultText: {
    fontSize: 30,
  },
});
