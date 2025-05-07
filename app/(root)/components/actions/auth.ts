'use server'

import { GetCollection } from "@/lib/db";
import { LoginValidation, RulesValidation } from "@/lib/rules";
import {  CreateSession } from "@/lib/session";
import bcrypt from 'bcryptjs'
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export async function CreateUser(state, formData: FormData)
{
   // await new Promise(e=>{setInterval(e, 3000)}) Getting the Email and Password from Zod
   const Validation = RulesValidation.safeParse({
        Email: formData.get('Email'),
        Password: formData.get('Password'),
        ConfrimPassword: formData.get('ConfrimPassword')
    });
 // Checking the Email and Password
    if (!Validation.success) {
        return {
            errors: Validation.error.flatten().fieldErrors,
            Email: formData.get('Email'),
        };
    }
    // Getting Email and Password for Insertion......
    const {Email, Password} = Validation.data;
      // e.g. Hash the user's password before storing it
  const hashedPassword = await bcrypt.hash(Password, 10)
    // Checking if the Email already exists in the database
    const UserExists = await GetCollection('Users')
    if(UserExists)
    {
        const User = await UserExists.findOne({Email})
        if(User)    
        {
            return {
                errors: {Email: ['Email already exists']},
                Email: formData.get('Email'),
            };
        }
    }
    // Getting the Collection For Insertion.......
    const Collection = await GetCollection('Users')
    if(Collection)
    {   
        const result = await Collection.insertOne({Email, Password:hashedPassword})
        await CreateSession(result.insertedId.toString())
        if(result.acknowledged)
        {
            return {
                success: true,
                message: "User created successfully!"
            }
        }
    }
    else
    {
    }
    // create Session 
    
    // return {
}

export async function LoginAction(state, formData: FormData)
{


const LoginValidations = LoginValidation.safeParse({
    Email: formData.get('Email'),   
    Password: formData.get('Password')
});
 if (!LoginValidations.success) {
    return {
        errors: LoginValidations.error.flatten().fieldErrors,
        Email: formData.get('Email'),
    };
}
// Getting Email and Password for Insertion......
const {Email, Password} = LoginValidations.data;    

// Checking if the Email already exists in the database 
const UserExists = await GetCollection('Users')
if(UserExists)
{
    const User = await UserExists.findOne({Email})
    const CheckEmail = await UserExists.findOne({Email})
    if(!CheckEmail)
    {
        return {
            errors: {Email: ['Invalid Credentials']},
            Email: formData.get('Email'),
        };
    }
    if(User)    
    {
        const IsPasswordValid = await bcrypt.compare(Password, User.Password)
        if(!IsPasswordValid)
        {
            return {
                errors: {Email: ['Invalid Credentials']},
                Email: formData.get('Email'),
            }
           
        }
        if(IsPasswordValid)
        {
            await CreateSession(User._id.toString())
            redirect('/dashboard')
        }
        
    }
    else 
    
        return {errors: {Email: 'Server Error!'   }  };
}
}


