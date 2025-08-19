import type { GridColDef } from "@mui/x-data-grid"
import { IconButton } from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import { useAppDispatch } from "../../../app/hooks.ts"
import { choiceField } from "../CaspelTableSlice.ts"

export function useColums({ onEdit }: { onEdit: () => void }) {
  const dispatch = useAppDispatch()
  const colums: GridColDef[] = [
    { field: "id", headerName: "ID", width: 200 },
    { field: "firstName", headerName: "First Name", width: 130 },
    { field: "lastName", headerName: "Last Name", width: 200 },
    { field: "createdAt", headerName: "Created", width: 250 },
    { field: "age", headerName: "age", width: 70 },
    {
      field: "edit",
      headerName: "Edit",
      width: 80,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: params => (
        <IconButton
          color="primary"
          onClick={() => {
            dispatch(choiceField(String(params.id)))
            onEdit()
          }}
        >
          <EditIcon />
        </IconButton>
      ),
    },
  ]
  return colums
}
