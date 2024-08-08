import userModel from "../models/userModel";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


interface RegisterParams {
    firstName : string;
    lastName : string;
    email : string;
    password: string;
}

export const register =async ({firstName,lastName,email,password} : RegisterParams) => {

    const findUser =  await userModel.findOne({email });
    if (findUser) {
        return { data : 'User already exists!' , statusCode : 400};
    }

    const hashedPassword =await bcrypt.hash(password, 10);

    const newUser = new userModel({firstName,lastName,email, password : hashedPassword });
    await newUser.save();

    return {data : generateJWT({firstName: newUser.firstName, lastName: newUser.lastName, email : newUser.email}) , statusCode : 200};
}


interface LoginParams {
    email : string;
    password : string;
}

export const login = async ({email , password} : LoginParams) => {
    const findUser = await userModel.findOne({email});

    if (!findUser) {
        return { data : "Incorrect email or password!" , statusCode : 400}
    }

    const passwordMatch = await bcrypt.compare(password , findUser.password);
    if (passwordMatch) {
        return {data : generateJWT({firstName : findUser.firstName, lastName : findUser.lastName, email : findUser.email}) , statusCode : 200};
    }

    return { data : "Incorrect email or password!" , statusCode : 400}
}

const generateJWT = (data : any) => {
   return  jwt.sign(data , '8FA13B97DA746BAA558DB22752D1E');
}