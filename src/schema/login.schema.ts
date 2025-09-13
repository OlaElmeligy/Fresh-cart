import * as zod from "zod"
export const loginSchema = zod.object({

email: zod.email().nonempty("email is required"),
password: zod.string().nonempty("password is required").min(6,"Password must be at least 6 characters long."),
})

export type loginSchemaType = zod.infer<typeof loginSchema>



