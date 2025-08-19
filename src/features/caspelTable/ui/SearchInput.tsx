import { Autocomplete, Stack, TextField } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts"
import { searchField, selectFields } from "../CaspelTableSlice.ts"
import MiniSearch from "minisearch"
import type { CaspelTableType } from "../lib/TableSchema.ts"

export default function SearchInput() {
  const fields = useAppSelector(selectFields)
  const dispatch = useAppDispatch()

  let miniSearch = new MiniSearch({
    fields: ["firstName", "lastName", "age"],
    storeFields: ["id", "firstName", "lastName", "age", "data"],
    idField: "id",
  })
  miniSearch.addAll(fields)

  const handleSearch = (value: string) => {
    const result = miniSearch.search(value, { prefix: true })

    const fullResults: CaspelTableType[] = result
      .map(r => fields.find(f => f.id === r.id)) // ищем объект по ID
      .filter((f): f is CaspelTableType => f !== undefined) // фильтруем undefined

    dispatch(searchField(fullResults))
    console.log(result)
  }
  return (
    <>
      <Stack spacing={2} sx={{ width: 300 }}>
        <Autocomplete
          freeSolo
          id="free-solo-2-demo"
          disableClearable
          options={fields.map(
            el => `${el.firstName} ${el.lastName} - ${el.age}`,
          )}
          renderInput={params => (
            <TextField
              {...params}
              label="Search input"
              slotProps={{
                input: {
                  ...params.InputProps,
                  type: "search",
                },
              }}
            />
          )}
          onInputChange={(_, value) => {
            handleSearch(value)
          }}
        />
      </Stack>
    </>
  )
}
