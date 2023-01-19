import React, { useState } from 'react';
import './App.css';
import { createStore } from 'redux';
// raect-redux 가 제공하는 중요 기능
// 1. Provider: state 를 어떤 컴포넌트들에게 제공할 것인지에 대해 가장 바깥 울타리를 정의하는 것.
// 2. useSelector: 어떤 state 값을 쓰고 싶은 지 선택할 때.
// 3. useDispatch: state 값을 변경시킬 때.
// 4. connect:
import { Provider, useSelector, useDispatch, connect } from 'react-redux';

// 2. store 를 생성할 때 반드시 주입해줘야 하는 것. reducer.
// reducer 의 역할은? store 안에 있는 state 를 어떻게 바꿀 것인가를 결정. 2개의 parameter 를 갖는다. 첫 번째는 현재의 state 값, 두 번째는 어떻게 바꿀지에 대한 요청을 받는 action.
// 그리고 그렇게 받은 값을 return 해주면 그 return 한 값이 새로운 state 값이 된다.
// redux 는 각각 state 값을 불변하게 유지해야 하는데 그렇게 하기 위해 새로운 state 를 만드는 데 과거의 state 를 복제한다. 이 복제본을 수정하면 불변성을 유지할 수 있다. 그리고 이 복제본을 return 한다.
// 만약 state 가 정의되지 않았다면 기본 state 값을 return 함. (if문)

function reducer(currentState, action) {
  if (currentState === undefined) {
    return {
      number: 1,
    };
  }
  const newState = { ...currentState };
  if (action.type === 'PLUS') {
    newState.number++;
  }
  return newState;
}

// 1. store 생성.
const store = createStore(reducer);

export default function App() {
  // 3. reducer 생성 후 이 data 가 필요 없어지니 주석 처리함.
  // const [number, setNumber] = useState(1);

  return (
    <div id="container">
      {/* 얘도 필요 없음.
      <h1>Root : {number}</h1> */}

      <h1>Root : </h1>
      <div id="grid">
        {/* 4. 필요한 컴포넌트들을 Provider 로 감싸준다.
        Provider 의 prop 중에 store 를 반드시 정의해줘야 함. 이제 Provider 내 컴포넌트들은 store 를 사용할 수 있다. */}
        <Provider store={store}>
          <Left1></Left1>
          <Right1></Right1>
        </Provider>
      </div>
    </div>
  );
}
function Left1(props) {
  return (
    <div>
      <h1>Left1 </h1>
      <Left2></Left2>
    </div>
  );
}
function Left2(props) {
  return (
    <div>
      <h1>Left2 : </h1>
      <Left3></Left3>
    </div>
  );
}
function Left3(props) {
  // 5. 리듀서를 Left3 에 표시하고 싶으면?
  // useSelector 를 사용한다. 무선으로 연결하는 것.
  // useSelector 는 함수를 인자로 받는다.
  function f(state) {
    return state.number;
  }
  const number = useSelector((state) => state.number);

  return (
    <div>
      {/* store 에 저장되어 있는 number state 와 말단에 있는 number 를 무선 연결 함. prop drilling 없이 하위 컴포넌트에 무선 연결한 것. */}
      <h1>Left3 : {number}</h1>
    </div>
  );
}
function Right1(props) {
  return (
    <div>
      <h1>Right1</h1>
      <Right2></Right2>
    </div>
  );
}
function Right2(props) {
  return (
    <div>
      <h1>Right2</h1>
      <Right3></Right3>
    </div>
  );
}
function Right3(props) {
  // 6. 말단에 있는 버튼을 클릭해서 state 의 값을 바꾸고 싶다?
  // useDispatch 를 사용한다.

  const dispatch = useDispatch();
  return (
    <div>
      <h1>Right3</h1>
      <input
        type="button"
        value="+"
        onClick={() => {
          // dispatch 를 사용하면 reducer 가 호출되는데 type 은 reducer 에서 지정해주면 된다.
          dispatch({ type: 'PLUS' });
        }}
      ></input>
    </div>
  );
}
