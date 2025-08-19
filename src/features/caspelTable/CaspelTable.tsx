import { Button, ButtonGroup, Paper } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import DeleteIcon from "@mui/icons-material/Delete"
import { DataGrid, type GridRowSelectionModel } from "@mui/x-data-grid"
import { useState } from "react"
import { paginationModel } from "./lib/CONST.ts"
import useRows from "./hooks/useRows.ts"
import { useColums } from "./hooks/useColums.tsx"
import CreateField from "./ui/createField.tsx"
import { useAppDispatch } from "../../app/hooks.ts"
import { deleteField } from "./CaspelTableSlice.ts"
import SearchInput from "./ui/SearchInput.tsx"

export default function CaspelTable() {
  const [create, setCreate] = useState<boolean>(false)
  const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>()
  const gridRowId = selectedRows?.ids ? Array.from(selectedRows.ids) : []
  const rows = useRows()
  const columns = useColums({ onEdit: () => setCreate(true) })
  const dispatch = useAppDispatch()

  const handleCreate = () => {
    setCreate(prevState => !prevState)
  }

  const handleDelete = () => {
    for (const id of gridRowId) {
      dispatch(deleteField(String(id)))
    }
  }

  return (
    <>
      <CreateField open={create} setOpen={setCreate} />
      <ButtonGroup variant="outlined" aria-label="Loading button group">
        <Button startIcon={<AddIcon />} onClick={handleCreate}>
          Create Category
        </Button>
        <Button
          startIcon={<DeleteIcon />}
          color="error"
          onClick={handleDelete}
          disabled={!selectedRows?.ids && selectedRows === undefined}
        >
          Delete
        </Button>
      </ButtonGroup>

      <Paper sx={{ height: "100%", width: "80%" }}>
        <SearchInput />
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{ border: 0 }}
          onRowSelectionModelChange={prevSelect => setSelectedRows(prevSelect)}
          rowSelectionModel={selectedRows}
        />
      </Paper>
    </>
  )
}
