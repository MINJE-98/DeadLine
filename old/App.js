import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import RootNavigation from './src/navigation/RootNavigation';
import { store, persistor } from './src/redux/store/Store';

/**
 * app
 */

export default class App extends Component{
  // 렌더링전 로딩 컴포넌트
  renderLoading = () => { 
    return ( 
      <View>               
          <ActivityIndicator size={"large"} /> 
      </View>         
    );    
  };
  render(){
    return(
    <Provider store={store}>
      <PersistGate loading={this.renderLoading()} persistor={persistor}>
        <RootNavigation />
      </PersistGate>
    </Provider>
  )
  }
}

// import React, {useState} from 'react';
// import {View, Button, Platform} from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker';

// export default function App(){
//   const [date, setDate] = useState(new Date());
//   const [mode, setMode] = useState('date');
//   const [show, setShow] = useState(false);

//   const onChange = (event, selectedDate) => {
//     const currentDate = selectedDate || date;
//     setShow(Platform.OS === 'ios');
//     setDate(currentDate);
//   };

//   const showMode = (currentMode) => {
//     setShow(true);
//     setMode(currentMode);
//   };

//   const showDatepicker = () => {
//     showMode('date');
//   };

//   const showTimepicker = () => {
//     showMode('time');
//   };

//   return (
//     <View>
//       <View>
//         <Button onPress={showDatepicker} title="Show date picker!" />
//       </View>
//       <View>
//         <Button onPress={showTimepicker} title="Show time picker!" />
//       </View>
//       {console.log(date)}
//       {show && (
//         <DateTimePicker
//           testID="dateTimePicker"
//           value={date}
//           mode={mode}
//           is24Hour={true}
//           display="default"
//           onChange={onChange}
//         />
//       )}
//     </View>
//   );
// };