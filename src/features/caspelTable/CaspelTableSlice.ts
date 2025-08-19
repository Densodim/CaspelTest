import type { CaspelTableType } from "./lib/TableSchema.ts"
import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"
import { INITIAL_STATE } from "./lib/INITIAL_STATE.ts"
import { v4 as uuidv4 } from "uuid"

export const initialState: InitialStateType = {
  field: null,
  fields: INITIAL_STATE,
  searchFields: [],
  status: "idle",
}

export const CaspelTableSlice = createSlice({
  name: "CaspelTable",
  initialState: initialState,
  reducers: create => ({
    createField: create.reducer(
      (state, action: PayloadAction<CreateFieldPayload>) => {
        state.fields.push({
          id: uuidv4(),
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          age: action.payload.age,
          data: action.payload.data,
        })
      },
    ),
    deleteField: create.reducer((state, action: PayloadAction<string>) => {
      state.fields = state.fields.filter(el => el.id !== action.payload)
    }),
    choiceField: create.reducer((state, action: PayloadAction<string>) => {
      state.field = state.fields.find(el => el.id === action.payload) ?? null
    }),
    updateField: create.reducer(
      (
        state,
        action: PayloadAction<{ fieldId: string; model: CaspelTableType }>,
      ) => {
        const index = state.fields.findIndex(
          index => index.id === action.payload.fieldId,
        )
        if (index !== -1) {
          state.fields[index] = {
            ...state.fields[index],
            ...action.payload.model,
          }
        }
        state.field = null
      },
    ),
    searchField: create.reducer(
      (state, action: PayloadAction<CaspelTableType[]>) => {
        state.searchFields = action.payload
      },
    ),
  }),
  selectors: {
    selectFields: state => state.fields,
    selectField: state => state.field,
    selectStatus: state => state.status,
    selectSearchFields: state => state.searchFields,
  },
})

export const {
  createField,
  deleteField,
  choiceField,
  updateField,
  searchField,
} = CaspelTableSlice.actions
export const { selectFields, selectStatus, selectField, selectSearchFields } =
  CaspelTableSlice.selectors

//types
type CreateFieldPayload = Omit<CaspelTableType, "id">
type InitialStateType = {
  field: CaspelTableType | null
  fields: CaspelTableType[]
  searchFields: CaspelTableType[]
  status: "idle" | "loading" | "failed"
}
