import * as zod from "zod"
export const checkoutSchema = zod.object({

details: zod.string().nonempty("field is required"),
phone: zod.string().nonempty("field is required").regex(/^(?:\+20|0)?1[0125]\d{8}$/ , "not valid phone number"),
city: zod.string().nonempty("field is required"),

})

export type checkoutSchemaType = zod.infer<typeof checkoutSchema>



