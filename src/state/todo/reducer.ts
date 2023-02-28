import {createSlice} from "@reduxjs/toolkit";
import {HYDRATE} from "next-redux-wrapper";
import {AppState} from "../store";

const initialState = {
    list: [] as { content: string, id: number }[],
    count: 0,
    title: ''
}

const todoReducer = createSlice({
    name: 'todo',
    initialState: initialState,
    reducers: {
        _addTodo: (state, action) => {
            state.list?.unshift(action.payload)
        },
        _setTitle: (state, action) => {
            state.title = action.payload;
        }
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            // TODO - handle client side overrides
            if (!action.payload.todo.title) {
                return state;
            }
            state.list = action.payload.todo.list;
            state.title = action.payload.todo.title;
        }
    }
})

const {reducer, actions} = todoReducer;

export const selectTodo = (state: AppState) => state.todo;
export const {_addTodo, _setTitle} = actions;
export default reducer;
