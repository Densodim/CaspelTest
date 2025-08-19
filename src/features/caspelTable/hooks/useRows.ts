import { useAppSelector } from "../../../app/hooks.ts"
import { selectFields, selectSearchFields } from "../CaspelTableSlice.ts"

export default function useRows() {
  const caspelFieldRows = useAppSelector(selectFields)
  const searchFieldsRows = useAppSelector(selectSearchFields)

  const sourceRows =
    searchFieldsRows.length > 0 ? searchFieldsRows : caspelFieldRows

  return sourceRows.map(el => ({
    id: el.id,
    firstName: el.firstName,
    lastName: el.lastName,
    createdAt: el.data,
    age: el.age,
  }))
}
