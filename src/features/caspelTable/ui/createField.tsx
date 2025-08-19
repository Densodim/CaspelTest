import { useFormik } from "formik"
import { Box, Button, Modal } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts"
import { TableSchema } from "../lib/TableSchema.ts"
import { style } from "../lib/styleModal.ts"
import WrapperTextField from "./WrapperTextField.tsx"
import { createField, selectField, updateField } from "../CaspelTableSlice.ts"

export default function CreateField({ open, setOpen }: Props) {
  const dispatch = useAppDispatch()
  const choiceField = useAppSelector(selectField)

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: choiceField?.firstName ?? "",
      lastName: choiceField?.lastName ?? "",
      data: choiceField?.data ?? "",
      age: choiceField?.age ?? 1,
    },
    validationSchema: TableSchema,
    onSubmit: values => {
      if (choiceField) {
        dispatch(
          updateField({ model: values, fieldId: String(choiceField.id) }),
        )
      } else {
        dispatch(createField(values))
      }
      setOpen(false)
    },
  })

  const handleClose = () => setOpen(false)

  return (
    <>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} onSubmit={formik.handleSubmit} component="form">
            <h3>{!choiceField ? "Create" : "Edit"}</h3>
            <WrapperTextField
              label={"First Name"}
              fieldProps={formik.getFieldProps("firstName")}
              placeholder={"First Name"}
              error={formik.errors.firstName}
            />
            <WrapperTextField
              label={"Last Name"}
              fieldProps={formik.getFieldProps("lastName")}
              placeholder={"Last Name"}
              error={formik.errors.lastName}
            />
            <WrapperTextField
              fieldProps={formik.getFieldProps("data")}
              type={"date"}
            />
            <WrapperTextField
              fieldProps={formik.getFieldProps("age")}
              error={formik.errors.age}
              type={"number"}
              label={"Age"}
              placeholder={"Age"}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              {!choiceField ? "Create" : "Edit"}
            </Button>
          </Box>
        </Modal>
      </div>
    </>
  )
}

type Props = {
  open: boolean
  setOpen: (open: boolean) => void
}
