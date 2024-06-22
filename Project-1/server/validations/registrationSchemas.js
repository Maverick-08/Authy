import zod from 'zod';

const usernameSchema = zod.string()
  .min(3, { message: "Username must be at least 3 characters long" })
  .max(10, { message: "Username must be at most 10 characters long" })
  .regex(/^[a-zA-Z0-9]+$/, { message: "Username must contain only letters and numbers" });

const passwordSchema = zod.string()
    .min(4,{message: "Password length too small"})
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/\d/, { message: "Password must contain at least one number" })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, { message: "Password must contain at least one special character" });


export const validateUsername = (username)=>{
    const response = usernameSchema.safeParse(username).error.errors[0].message;

    return response;
}

export const validatePassword = (password)=>{
    const response = passwordSchema.safeParse(password).error.errors[0].message;

    return response;
}

// Testing

console.log(validatePassword("Vivek2"));
// Password must contain at least one special character

console.log(validateUsername("i"));
// Username must be at least 3 characters long