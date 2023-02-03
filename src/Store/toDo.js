import { createSlice } from "@reduxjs/toolkit";

// create slice
const initialState = {
  nextId: 2,
  data: {
    1: {
      content: "Content 1",
      completed: false,
    },
  },
};
export const toDoSlice = createSlice({
  // name slice
  name: "toDo",

  // intialise counter
  initialState: initialState,
  // initialise reducers
  reducers: {
    // addtodo takes in payload from app.js and creates a new object
    addToDo: (state, action) => {
      state.data = {
        ...state.data,
        [state.nextId]: {
          content: action.payload,
          completed: false,
        },
      };
      state.nextId += 1;
    },
    // edittodo takes in payload from app.js and makes changes to current object
    editToDo: (state, action) => {
      state.data = {
        ...state.data,
        [action.payload.id]: {
          content: action.payload.content,
          completed: action.payload.completed,
        },
      };
    },
    // completetodo takes in payload from app.js and toggles relevant objects completed state
    completeToDo: (state, action) => {
      state.data = {
        ...state.data,
        [action.payload.id]: {
          content: action.payload.content,
          completed: action.payload.completed,
        },
      };
    },
    // removetodo takes in payload from app.js and deletes relevant object from state
    removeToDo: (state, action) => {
      delete state.data[action.payload];
    },
  },
});

// export the reducers

export const { addToDo, editToDo, completeToDo, removeToDo } =
  toDoSlice.actions;

// export counterslice

export default toDoSlice.reducer;
