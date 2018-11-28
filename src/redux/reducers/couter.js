import { INCREMENT, DECREMENT, RESET } from '../actions/couter';
//提取公共的方法名字。从action处控制方法action类型，方便修改方法名字

/*
* 初始化state
*/
const initState = {
    count: 0,
};
  
  /*
  * reducer(可以写很多个)
  */
export default function counter(state = initState, action) {
    switch (action.type) {
      case INCREMENT:
      console.log(state)
        return {
          count: state.count + 1,
        };
      case DECREMENT:
        return {
          count: state.count - 1,
        };
      case RESET:
        return { count: 0 };
      default:
        return state;
    }
  }

  
