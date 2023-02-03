import "./App.css";
import { useSelector, useDispatch, connect } from "react-redux";
import { addToDo, editToDo, completeToDo, removeToDo } from "./Store/toDo";
import { useState } from "react";

function App(props) {
  // set up hooks
  const [userInput, setUserInput] = useState("");
  const [userInputE, setUserInputE] = useState("");
  const [id, setId] = useState("");
  const [completed, setCompleted] = useState(false);
  const [deleted, setDeleted] = useState("");

  // set up use selectors

  const content = useSelector((state) => state.toDo.data);
  const dispatch = useDispatch();

  // convert data into a workable array
  let contentArray = Object.entries(content);
  // add to do function
  const addAToDo = (e) => {
    e.preventDefault();
    dispatch(addToDo(userInput));
    setUserInput("");
  };
  // edit to do function
  const editAToDo = (e) => {
    e.preventDefault();
    dispatch(
      editToDo({ content: userInputE, id: deleted, completed: completed })
    );
    setUserInputE("");
    setId("");
  };
  // complete to do function
  const completeAToDo = (e) => {
    e.preventDefault();
    dispatch(
      completeToDo({ id: deleted, completed: completed, content: userInputE })
    );
    setId("");
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>To Do</h1>
        {/* add to do function takes in user input passes it to the add to do function above */}
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
          {/* map over array post relevant content */}
          {contentArray.map((value, index) => {
            console.log(value[0]);
            return (
              <div
                // set up hooks to capture relevant data
                key={index}
                onMouseDownCapture={(e) => {
                  setId(index + 1);
                  setDeleted(value[0]);
                }}
                onMouseOver={(e) => {
                  setCompleted(value[1].completed);
                }}
              >
                <div>{value[1].content}</div>
                <form
                  // onclick repost relevant data to array using edit to do function
                  onClick={editAToDo}
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <label>
                    edit to do:
                    <input
                      type="text"
                      name="value"
                      onChange={(e) => setUserInputE(e.target.value)}
                    />
                  </label>
                  <button type="submit">submit</button>
                </form>
                {/* onclick toggle completed using hook in dispatched reducer */}
                <button
                  className="btn"
                  onMouseDownCapture={() => {
                    setCompleted(!completed);
                    setUserInputE(value[1].content);
                  }}
                  onMouseDown={completeAToDo}
                >
                  click to complete
                </button>
                <button
                  // send relevant hook to remove to do reducer
                  className="btn"
                  onMouseDown={(e) => {
                    dispatch(removeToDo(deleted));
                  }}
                >
                  click to delete
                </button>
                {/* display completed value */}
                {value[1].completed === false ? (
                  <div>completed: ✖️</div>
                ) : (
                  <div>completed: ✔️</div>
                )}
              </div>
            );
          })}
        </div>
      </header>
    </div>
  );
}

export default App;
