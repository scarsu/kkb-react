import React, {Component} from "react";
// import {connect} from "react-redux";
// import {bindActionCreators} from "redux";
import {connect, bindActionCreators} from "../kReactRedux";

@connect(
  // connect第一个参数：mapStateToProps函数
  // 将store映射到组件props上
  // 传入对象 返回对象
  ({count}) => ({count}),

  // connect第二个参数：mapDispatchToProps object对象 或者 函数function
  // object对象：
  // {
  //   add: () => ({type: "ADD"})
  //   会给组件上添加一个add方法
  // }
  // 函数function：
  // 会给组件上添加一个dispatch方法
  dispatch => {
    let creators = {
      add: () => ({type: "ADD"}),
      minus: () => ({type: "MINUS"})
    };
    creators = bindActionCreators(creators, dispatch);

    return {
      dispatch,
      ...creators
    };
  }
)
class ReactReduxPage extends Component {
  render() {
    const {count, dispatch, add} = this.props;
    console.log("pr", this.props); //sy-log
    return (
      <div>
        <h3>ReactReduxPage</h3>
        <p>{count}</p>
        <button onClick={() => dispatch({type: "ADD"})}>dispatch add</button>
        <button onClick={add}>add</button>
      </div>
    );
  }
}
export default ReactReduxPage;
