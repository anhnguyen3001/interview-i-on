import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PBComponent, PBContentInterface, ROOT_ID } from "modules/core";
import get from "lodash.get";
import set from "lodash.set";
import clonedeep from "lodash.clonedeep";

interface BuilderState {
  content: PBContentInterface;
  selectedNode: string;
  relatedMapping: Record<string, object>;
}

const PROPS = "props";

const initialState: BuilderState = {
  content: {},
  selectedNode: null,
  relatedMapping: {},
};

export const builderSlice = createSlice({
  name: "builder",
  initialState,
  reducers: {
    setContent: (state, action: PayloadAction<PBContentInterface>) => {
      return { ...state, content: action.payload };
    },
    addNode: (state, action: PayloadAction<PBComponent>) => {
      if (!state.content?.[ROOT_ID]) return state;

      const { id } = action.payload;

      const newState = clonedeep(state);

      if (!newState.content[ROOT_ID].children) {
        newState.content[ROOT_ID].children = [];
      }

      newState.content[ROOT_ID].children.push(id);
      newState.content[id] = {
        children: [],
        ...action.payload,
      };

      return newState;
    },
    setProp: (
      state,
      action: PayloadAction<{ id: string; propKey: string; value: any }>
    ) => {
      const { id, propKey, value } = action.payload;

      if (!state.content[id]) return state;
      const newState = clonedeep(state);

      set(newState.content, [id, PROPS, propKey], value);

      return newState;
    },
    selectNode: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        selectedNode: action.payload,
      };
    },
    setRelatedMapping: (
      state,
      action: PayloadAction<{ id: string; related: object }>
    ) => {
      const { id, related } = action.payload;

      return {
        ...state,
        relatedMapping: {
          ...(state.relatedMapping || {}),
          [id]: related,
        },
      };
    },
  },
});

// Action
export const builderActions = builderSlice.actions;

// Selector
export const selectContent = (state: any): PBContentInterface =>
  state.builder.content;

export const selectPropValue = (state: any, id: string, propKey: string) =>
  get(state.builder.content, [id, PROPS, propKey]);

export const selectSelectedNode = (state: any) => state.builder.selectedNode;

export const selectRelatedMapping = (state: any) =>
  state.builder.relatedMapping;

export default builderSlice.reducer;
