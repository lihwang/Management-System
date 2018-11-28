import counter from './reducers/couter';

export default function combineReducers(state = {}, action) {
    return {
        counter: counter(state.counter, action)
    }
}
