import React, {Component} from "react";
import store from "../store/";

export default class ReduxPage extends Component {
  componentDidMount() {
    console.log(store)
    this.unsubscribe = store.subscribe(() => {
      // store state 改变
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  add = () => {
    store.dispatch({type: "ADD"});
  };

  asyAdd = () => {
    store.dispatch((dispatch, getState) => {
      setTimeout(() => {
        dispatch({type: "ADD"});
        console.log("getState", getState()); //sy-log
      }, 1000);
    });
  };

  promiseMinus = () => {
    store.dispatch(
      Promise.resolve({
        type: "MINUS",
        payload: 100
      })
    );
  };

  render() {
    return (
      <div>
        <h3>ReduxPage： combineReducers 分key管理state</h3>
        <h3>暗号：毛里塔尼亚</h3>
        <p>firstName ===== {store.getState().firstName}</p>
        <p>lastName ===== {store.getState().lastName}</p>
        <p>fullName ===== {store.getState().firstName + '  ' + store.getState().lastName}</p>
        <button onClick={this.add}>change</button>
        {/* <button onClick={this.asyAdd}>asyAdd</button>
        <button onClick={this.promiseMinus}>promise minus</button> */}
      </div>
    );
  }
}
