#Store
Store 就是保存数据的地方，你可以把它看成一个容器。整个应用只能有一个 Store。
Redux 提供createStore这个函数，用来生成 Store
import { createStore } from 'redux';
const store = createStore(fn);

#State
Store对象包含所有数据。如果想得到某个时点的数据，就要对 Store 生成快照。这种时点的数据集合，就叫做 State。
当前时刻的 State，可以通过store.getState()拿到。
Redux 规定， 一个 State 对应一个 View。只要 State 相同，View 就相同。你知道 State，就知道 View 是什么样，反之亦然。
import { createStore } from 'redux';
const store = createStore(fn);

const state = store.getState();


#Action
State 的变化，会导致 View 的变化。但是，用户接触不到 State，只能接触到 View。所以，State 的变化必须是 View 导致的。Action 就是 View 发出的通知，表示 State 应该要发生变化了。
Action 是一个对象。其中的type属性是必须的，表示 Action 的名称。其他属性可以自由设置，社区有一个规范可以参考。
const ADD_TODO = '添加 TODO';

function addTodo(text) {
  return {
    type: ADD_TODO,
    text
  }
}

const action = addTodo('Learn Redux');

#Action Creator
可以这样理解，Action 描述当前发生的事情。改变 State 的唯一办法，就是使用 Action。它会运送数据到 Store。
const ADD_TODO = '添加 TODO';

function addTodo(text) {
  return {
    type: ADD_TODO,
    text
  }
}

const action = addTodo('Learn Redux');

#store.dispatch()
store.dispatch()是 View 发出 Action 的唯一方法。

import { createStore } from 'redux';
const store = createStore(fn);

store.dispatch({
  type: 'ADD_TODO',
  payload: 'Learn Redux'
});

上面代码中，store.dispatch接受一个 Action 对象作为参数，将它发送出去。
结合 Action Creator，这段代码可以改写如下。

store.dispatch(addTodo('Learn Redux'));



###Reducer
Reducer 就是Store处理Action和State的函数，返回新的State
Store 收到 Action 以后，必须给出一个新的 State，这样 View 才会发生变化。这种 State 的计算过程就叫做 Reducer。
Reducer 是一个函数，它接受 Action 和当前 State 作为参数，返回一个新的 State。

const reducer = function (state, action) {
  // ...
  return new_state;
};


const defaultState = 0;
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD':
      return state + action.payload;
    default: 
      return state;
  }
};

//执行后
const state = reducer(1, {
  type: 'ADD',
  payload: 2
});
上面代码中，reducer函数收到名为ADD的 Action 以后，就返回一个新的 State，作为加法的计算结果。其他运算的逻辑（比如减法），也可以根据 Action 的不同来实现。

实际应用中，Reducer 函数不用像上面这样手动调用，store.dispatch方法会触发 Reducer 的自动执行。为此，Store 需要知道 Reducer 函数，做法就是在生成 Store 的时候，将 Reducer 传入createStore方法。
--就是将处理state的reducer传入创建store；

import { createStore } from 'redux';
const store = createStore(reducer);

上面代码中，createStore接受 Reducer 作为参数，生成一个新的 Store。以后每当store.dispatch发送过来一个新的 Action，就会自动调用 Reducer，得到新的 State。
为什么这个函数叫做 Reducer 呢？因为它可以作为数组的reduce方法的参数。请看下面的例子，一系列 Action 对象按照顺序作为一个数组。

##reduce
reduce（）;相当于一个函数累加器，接受一个回调函数的结果，然后将前一次的函数结果再和下一次的数据再次执行此回调函数.
reduce(function(previousValue,currentValue,index,array){

return xxx  //需要执行的函数结果，
previousValue---------上一次的值-
currentValue---------当前值
index------当前值的索引
array-------数组
})；
[1,2,3,4,5].reduce(function(a,b){return a+b;});

const actions = [
  { type: 'ADD', payload: 0 },
  { type: 'ADD', payload: 1 },
  { type: 'ADD', payload: 2 }
];
const total = actions.reduce(reducer, 0); // 3
上面代码中，数组actions表示依次有三个 Action，分别是加0、加1和加2。数组的reduce方法接受 Reducer 函数作为参数，就可以直接得到最终的状态3。

#纯函数
Reducer 函数最重要的特征是，它是一个纯函数。也就是说，只要是同样的输入，必定得到同样的输出。
纯函数是函数式编程的概念，必须遵守以下一些约束。

+++++不管什么时候，同样输入，同样输出++++
不得改写参数
不能调用系统 I/O 的API
不能调用Date.now()或者Math.random()等不纯的方法，因为每次会得到不一样的结果
-----------------------------------------------
由于 Reducer 是纯函数，就可以保证同样的State，必定得到同样的 View。但也正因为这一点，Reducer 函数里面不能改变 State，必须返回一个全新的对象，请参考下面的写法。

// State 是一个对象
function reducer(state, action) {
  return Object.assign({}, state, { thingToChange });
  // 或者
  return { ...state, ...newState };
}

// State 是一个数组
function reducer(state, action) {
  return [...state, newItem];
}

最好把 State 对象设成只读。你没法改变它，要得到新的 State，唯一办法就是生成一个新对象。这样的好处是，任何时候，与某个 View 对应的 State 总是一个不变的对象。（不要直接修改state，通过新生成state返回）

#store.subscribe()
Store 允许使用store.subscribe方法设置监听函数，一旦 State 发生变化，就自动执行这个函数。

import { createStore } from 'redux';
const store = createStore(reducer);

store.subscribe(listener);

显然，只要把 View 的更新函数（对于 React 项目，就是组件的render方法或setState方法）放入listen，就会实现 View 的自动渲染。
----------------------------------------------------
store.subscribe方法返回一个函数，调用这个函数就可以解除监听。

let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
);
unsubscribe();


#Store 的实现
Store 提供了三个方法。
store.getState()
store.dispatch()
store.subscribe()

import { createStore } from 'redux';
let { subscribe, dispatch, getState } = createStore(reducer);

createStore方法还可以接受第二个参数，表示 State 的最初状态。这通常是服务器给出的。
let store = createStore(todoApp, window.STATE_FROM_SERVER)

上面代码中，window.STATE_FROM_SERVER就是整个应用的状态初始值。注意，如果提供了这个参数，它会覆盖 Reducer 函数的默认初始值。

下面是createStore方法的一个简单实现，可以了解一下 Store 是怎么生成的。
 
 reducer纯函数处理(state,action);
const createStore = (reducer) => {
  let state;
  let listeners = [];

  const getState = () => state;

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  };

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    }
  };

  dispatch({});

  return { getState, dispatch, subscribe };
};

#Reducer 的拆分

Reducer 函数负责生成 State。由于整个应用只有一个 State 对象，包含所有数据，对于大型应用来说，这个 State 必然十分庞大，导致 Reducer 函数也十分庞大。

const chatReducer = (state = defaultState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_CHAT:
      return Object.assign({}, state, {
        chatLog: state.chatLog.concat(payload)
      });
    case CHANGE_STATUS:
      return Object.assign({}, state, {
        statusMessage: payload
      });
    case CHANGE_USERNAME:
      return Object.assign({}, state, {
        userName: payload
      });
    default: return state;
  }
};

上面代码中，三种 Action 分别改变 State 的三个属性。
ADD_CHAT：chatLog属性
CHANGE_STATUS：statusMessage属性
CHANGE_USERNAME：userName属性

这三个属性之间没有联系，这提示我们可以把 Reducer 函数拆分。不同的函数负责处理不同属性，最终把它们合并成一个大的 Reducer 即可。


const chatReducer = (state = defaultState, action = {}) => {
  return {
    chatLog: chatLog(state.chatLog, action),
    statusMessage: statusMessage(state.statusMessage, action),
    userName: userName(state.userName, action)
  }
};

上面代码中，Reducer 函数被拆成了三个小函数，每一个负责生成对应的属性。

这样一拆，Reducer 就易读易写多了。而且，这种拆分与 React 应用的结构相吻合：一个 React 根组件由很多子组件构成。这就是说，子组件与子 Reducer 完全可以对应。

Redux 提供了一个combineReducers方法，用于 Reducer 的拆分。你只要定义各个子 Reducer 函数，然后用这个方法，将它们合成一个大的 Reducer。

import { combineReducers } from 'redux';

const chatReducer = combineReducers({
  chatLog,
  statusMessage,
  userName
})

export default todoApp;

上面的代码通过combineReducers方法将三个子 Reducer 合并成一个大的函数。

这种写法有一个前提，就是 State 的属性名必须与子 Reducer 同名。如果不同名，就要采用下面的写法。

const reducer = combineReducers({
  a: doSomethingWithA,
  b: processB,
  c: c
})

// 等同于
function reducer(state = {}, action) {
  return {
    a: doSomethingWithA(state.a, action),
    b: processB(state.b, action),
    c: c(state.c, action)
  }
}

总之，combineReducers()做的就是产生一个整体的 Reducer 函数。该函数根据 State 的 key 去执行相应的子 Reducer，并将返回结果合并成一个大的 State 对象。

下面是combineReducer的简单实现。

const combineReducers = reducers => {
  return (state = {}, action) => {
    return Object.keys(reducers).reduce(
      (nextState, key) => {
        nextState[key] = reducers[key](state[key], action);
        return nextState;
      },
      {} 
    );
  };
};

你可以把所有子 Reducer 放在一个文件里面，然后统一引入。
import { combineReducers } from 'redux'
import * as reducers from './reducers'

const reducer = combineReducers(reducers)

reducer就是纯函数，接收state 和 action，然后返回一个新的 state。
看上面的代码，无论是combineReducers函数也好，还是reducer函数也好，都是接收state和action，
返回更新后的state。区别就是combineReducers函数是处理整棵树，reducer函数是处理树的某一点。
接下来，我们要创建一个store。



![Image text]('./bg2016091802.jpg)

##工作流程##
本节对 Redux 的工作流程，做一个梳理。
    1.首先，用户发出 Action。
        tore.dispatch(action);

    2.然后，Store 自动调用 Reducer，并且传入两个参数：当前 State 和收到的 Action。 Reducer 会返回新的 State 。
        let nextState = todoApp(previousState, action);

    3.State 一旦有变化，Store 就会调用监听函数。
        // 设置监听函数
        store.subscribe(listener);

    4.listener可以通过store.getState()得到当前状态。如果使用的是 React，这时可以触发重新渲染 View。
        function listerner() {
            let newState = store.getState();
            component.setState(newState);   
        }


面我们可以使用 action 来描述“发生了什么”，使用action创建函数来返回action。
还可以使用 reducers 来根据 action 更新 state 。
那我们如何提交action？提交的时候，怎么才能触发reducers呢？
store 就是把它们联系到一起的对象。store 有以下职责：
提供 getState() 方法获取 state；
提供 dispatch(action) 触发reducers方法更新 state；
通过subscribe(listener) 注册监听器;
通过 subscribe(listener) 返回的函数注销监听器。

相比Flux，Redux有如下两个特点：

在整个应用只提供一个Store，它是一个扁平的树形结构，一个节点状态应该只属于一个组件。
不允许修改数据。即不能修改老状态，只能返回一个新状态。

#store 的位置，
说Redux之前，我想说一下自己学的时候遇到的一个小坑，就是Redux中的state和React中的state完全不是一回事，React中的state是组件内部自己的状态信息，而Redux中的state是Redux自己的数据，然后React就拿Redux中的数据来用，其实Redux也可以在其他框架下使用，并不是非要跟React一起使用。

Redux 和 React
到此为止，Redux自己就折腾完了，那么Redux自己的数据并没有用，它要把数据交给React用才行，接下来讲一讲怎么把数据交给React来用。如果每个应用都引入太复杂，如果定在全局容易暴露；=====》

上面我们创建了一个对象store，我们要把这个store对象作为props传给React，那React就可以用了。

这个store只能有一个，也就只能创建一次，也就是说你必须在最顶层处创建一个store对象，然后再一层层的传递下去，才能让所有的组件都能获得这个store对象，调用它的方法。

结合redux和react   --->react-redux  


#react-redux 
?=====Context就是“上下文环境”，让一个数状组件上所有组件都能访问一个共有的对象。
https://www.cnblogs.com/bax-life/p/8440326.html
在React-redux中有两个比较关键的概念：Provider和connect方法。 

  1.Provider组件是让所有的组件可以访问到store。不用手动去传。也不用手动去监听。
  2.connect函数作用是从 Redux state 树中读取部分数据，并通过 props 来把这些数据提供给要渲染的组件。也传递dispatch(action)函数到props。
