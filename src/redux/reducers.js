import { combineReducers } from 'redux';
import counter from './reducers/couter';
import userInfo from './reducers/userInfo';

export default combineReducers({
  counter,
  userInfo,
});

// 封装类似的函数

// export default function combineReducers(state = {}, action) {
//     return {
//         counter: counter(state.counter, action),
//         userInfo:userInfo(state.userInfo, action)
//     }
// }
