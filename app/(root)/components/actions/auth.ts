'use server'

import { GetCollection } from "@/lib/db";
import {  LoginValidation, RulesValidation } from "@/lib/rules";

import { CreateSession } from "@/lib/session";
import bcrypt from 'bcryptjs';
import { redirect } from "next/navigation";

// Create a new user
export async function CreateUser(state, formData: FormData) {
  // Validate input data using Zod schema
  const validation = RulesValidation.safeParse({
    Email: formData.get('Email'),
    Password: formData.get('Password'),
    ConfrimPassword: formData.get('ConfrimPassword'),
  });

  // Check if validation failed
  if (!validation.success) {
    return {
      errors: validation.error.flatten().fieldErrors,
      Email: formData.get('Email'),
    };
  }

  const { Email, Password, ConfrimPassword } = validation.data;

  // Check if passwords match
  if (Password !== ConfrimPassword) {
    return {
      errors: { Password: ['Passwords do not match'] },
      Email: formData.get('Email'),
    };
  }

  // Hash the user's password before storing it
  const hashedPassword = await bcrypt.hash(Password, 10);

  // Check if the email already exists in the database
  const userCollection = await GetCollection('Users');
  if (userCollection) {
    const existingUser = await userCollection.findOne({ Email });
    if (existingUser) {
      return {
        errors: { Email: ['Email already exists'] },
        Email: formData.get('Email'),
      };
    }

    // Insert the new user into the database
    const result = await userCollection.insertOne({ Email, Password: hashedPassword });
    if (result.acknowledged) {
      // Create a session for the newly created user
      await CreateSession(result.insertedId.toString());

      return {
        success: true,
        message: "User created successfully!",
      };
    }
  }

  return {
    errors: { server: ['Failed to create user. Please try again later.'] },
  };
}

// User login action
export async function LoginC(state:FormState, formData: FormData) {

  // Validate input data using Zod schema
  const loginValidation = LoginValidation.safeParse({
    Email: formData.get('Email'),
    Password: formData.get('Password'),
  });

  // Check if validation failed
  if (!loginValidation.success) {
    return {
      errors: loginValidation.error.flatten().fieldErrors,
      Email: formData.get('Email'),
    };
  }

  const { Email, Password } = loginValidation.data;

  // Fetch the user collection and check if the email exists
  const userCollection = await GetCollection('Users');
  if (userCollection) {
    const user = await userCollection.findOne({ Email });

    if (!user) {
      return {
        errors: { Email: ['Invalid credentials'] },
        Email: formData.get('Email'),
      };
    }

    // Check if the provided password matches the stored hashed password
    const isPasswordValid = await bcrypt.compare(Password, user.Password);
    if (!isPasswordValid) {
      return {
        errors: { Email: ['Invalid credentials'] },
        Email: formData.get('Email'),
      };
    }

    // Create a session for the user if credentials are valid
    await CreateSession(user._id.toString());

    // Redirect to the dashboard on successful login
    redirect('/dashboard');
  }

  return {
    errors: { server: ['Server error, please try again later.'] },
    Email: formData.get('Email'),
  };
}


