import { createSlice } from "@reduxjs/toolkit";

// create slice
const initialState = {
  id: 1,
  nextId: 2,
  data: {
    1: {
      content: "Content 1",
      completed: false,
      id: 1,
    },
  },
};
export const toDoSlice = createSlice({
  // name slice
  name: "toDo",

  // intialise counter
  initialState: initialState,

  // create 4 reducers one which increases by payload one that decreases by payload one which adds 5% one which decreases by 15%

  reducers: {
    addToDo: (state, action) => {
      state.data = {
        ...state.data,
        [state.nextId]: {
          content: action.payload,
          completed: false,
        },
      };
      state.id += 1;
      state.nextId += 1;
    },
    editToDo: (state, action) => {
      // state.data[action.id].content = action.payload;
      let id = state.indexOf(action.payload.id);
      const initialData = [...state.data.content];
      let finalData = initialData.splice(id, 1, action.payload.content);
      state.data = {
        ...state.data,
        store.data = finalData,

      }
        // [action.payload.id]: {
        //   content: action.payload.content,
        // },
    },

    // completeToDo: (state, action) => {
    //   return (
    //     (state.nextId = state.nextId),
    //     (state.data.content = state.data.content),
    //     (state.data.completed = !state.data.completed)
    //   );
    // },
    // removeToDo: (state, action) => {
    //   return state.filter((todo, i) => i !== action.payload.nextId);
    // },
  },
});

// export the reducers

export const { addToDo, editToDo } = toDoSlice.actions;

// export counterslice

export default toDoSlice.reducer;
