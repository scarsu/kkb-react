export default function createStore(reducer, enhancer) {
  if (enhancer) {
    // 原版dispatch只能接受普通对象，加强之后变强大，可以处理多种形式，如callback、promise等
    return enhancer(createStore)(reducer);
  }
  let currentState;
  let currentListeners = [];
  function getState() {
    return currentState;
  }
  function dispatch(action) {
    currentState = reducer(currentState, action);
    // 变更后 遍历执行所有订阅的回调
    currentListeners.forEach(listener => listener());
  }
  function subscribe(listener) {
    // 订阅：向store存储回调
    currentListeners.push(listener);

    // 返回unSubscribe函数
    return () => {
      // 自己实现过滤
      currentListeners = [];
    };
  }

  // 随便传一个action type，就会走reducer的 switch 的default分支，返回默认值
  // 在源码中是随机生成的字符串，目的就是得到state的默认值
  dispatch({type: "REDUX/KKKB"});

  return {
    getState, //获取状态
    dispatch, // 触发改变state
    subscribe //订阅
  };
}
