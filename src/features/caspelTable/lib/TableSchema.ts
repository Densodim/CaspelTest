import type { InferType } from "yup"
import * as Yup from "yup"

export const TableSchema = Yup.object().shape({
  id: Yup.string(),
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  data: Yup.string()
    .transform(() => new Date().toISOString())
    .required(),
  age: Yup.number().min(0, "Min 0").max(100, "Max 100").required("Required"),
})

export type CaspelTableType = InferType<typeof TableSchema>
