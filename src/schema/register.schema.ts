import * as zod from "zod"
export const registerSchema = zod.object({

name : zod.string().nonempty("name is required").min(2, "Name must be at least 2 characters long.").max(10, "Name cannot be longer than 10 characters."),
email: zod.email().nonempty("email is required"),
password: zod.string().nonempty("password is required").min(6,"Password must be at least 6 characters long."),
rePassword: zod.string().nonempty("Please confirm your password."),
phone : zod.string().regex(/^(?:\+20|0)?1[0125]\d{8}$/)
})
.refine((object)=> object.password === object.rePassword,{path:["rePassword"], error:"Passwords do not match."});

export type registerSchemaType = zod.infer<typeof registerSchema>



