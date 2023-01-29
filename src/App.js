import "./App.css";
import { useSelector, useDispatch, connect } from "react-redux";
import { addToDo, editToDo, completeToDo, removeToDo } from "./Store/toDo";
import { useState } from "react";

function App(props) {
  const [userInput, setUserInput] = useState("");
  const [userInputE, setUserInputE] = useState("");
  const [id, setId] = useState("");

  const [state, setState] = useState([]);

  const content = useSelector((state) => state.toDo.data);
  const dispatch = useDispatch();

  let contentArray = Object.entries(content);

  const addAToDo = (e) => {
    e.preventDefault();
    dispatch(addToDo(userInput));
    setUserInput("");
  };
  const editAToDo = (e) => {
    e.preventDefault();
    dispatch(editToDo({ content: userInputE, id: id }));
    setUserInputE("");
    setId("");
  };

  console.log(contentArray);
  console.log(content);

  return (
    <div className="App">
      <header className="App-header">
        <h1>To Do</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <label>
            add to do:
            <input
              type="text"
              name="value"
              onChange={(e) => {
                setUserInput(e.target.value);
              }}
              value={userInput}
            />
          </label>
          <button type="submit" onClick={addAToDo}>
            submit
          </button>
        </form>
        {content !== null}
        <div>
          {contentArray.map((value, index) => {
            console.log(value[1].content);

            return (
              <div key={index} onClick={(e) => setId(index + 1)}>
                <div>{value[1].content}</div>
                {id !== index ? (
                  <form onClick={editAToDo}>
                    <label>
                      edit to do:
                      <input
                        type="text"
                        name="value"
                        onChange={(e) => setUserInputE(e.target.value)}
                        value={userInputE}
                      />
                    </label>
                    <button type="submit">submit</button>
                  </form>
                ) : (
                  <div>hello</div>
                )}
                {/* <button
                  className="btn"
                  onClick={() => dispatch(completeToDo())}
                >
                  click to complete
                </button>
                <button className="btn" onClick={() => dispatch(removeToDo())}>
                  click to delete
                </button> */}
              </div>
            );
          })}
        </div>
      </header>
    </div>
  );
}

export default App;
