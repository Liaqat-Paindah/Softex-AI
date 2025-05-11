import { z } from "zod";


export const RulesValidation= z.object({
    Email:z.string().email({message:"Please enter a valid email"}).min(1, {message:"Email is required"}).trim(),
    Password:z.string().min(8, {message:"Password must be at least 8 characters"}).min(1, {message:"Password is required"})
    .regex(/(?=.*[0-9])/, {message:"Password must contain at least one number"})
    .regex(/(?=.*[a-z])/, {message:"Password must contain at least one lowercase letter"})
    .regex(/(?=.*[A-Z])/, {message:"Password must contain at least one uppercase letter"})
    .regex(/(?=.*[!@#$%^&*])/, {message:"Password must contain at least one special character"})
    .trim(),
    ConfrimPassword:z.string().min(1, {message:"Confirm Password is required"}).trim()
}).superRefine((val, ctx)=> {
    if(val.Password !== val.ConfrimPassword){
        ctx.addIssue({
            code:z.ZodIssueCode.custom,
            message:"Password do not match",
            path:["ConfrimPassword"]
});
    }

})


export const LoginValidation= z.object({
    Email:z.string().email({message:"Please enter a valid email"}).min(1, {message:"Email is required"}).trim(),    
    Password:z.string().min(8, {message:"Password must be at least 8 characters"}).min(1, {message:"Password is required"})
})



export const CreatePostValidation = z.object({
  Title: z
    .string()
    .min(1, { message: "Title is required" })
    .max(100, { message: "Title can't be more than 100 characters" })
    .trim(),

  Date: z
    .string()
    .min(1, { message: "Date is required" }).trim(),

  Description: z
    .string()
    .min(1, { message: "Description is required" })
    .max(250, { message: "Content can't be more than 250 characters" })
    .trim(),

    Photo: z
    .instanceof(File)
    .refine(file => file.type.startsWith('image/'), { message: "File must be an image" })
    .refine(file => file.size <= 5 * 1024 * 1024, { message: "File must be smaller than 5MB" })
    .optional(),  // Make the photo optional if the user can skip it
});
