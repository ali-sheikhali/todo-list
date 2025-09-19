import {z} from "zod"


export const newListSchema = z.object({
  newList: z.string().min(3, "List name is must more than 3 letters")
})