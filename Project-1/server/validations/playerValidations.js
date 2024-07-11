import zod from 'zod';

let letterRegex = /^[a-zA-Z\s]+$/;
let numberRegex = /^-?\d+(\.\d+)?$/;

const letterSchema = zod.string().regex(letterRegex,{message: "must contain only letters"});
const numberSchema = zod.string().regex(numberRegex,{message:"must contain only numbers"});

export const validateNewPlayer = (name,age,team,position,ppg,rpg,apg) => {
    // undefined or "message"
    const nameResponse = letterSchema.safeParse(name).error?.errors[0].message;
    const teamResponse = letterSchema.safeParse(team).error?.errors[0].message;
    const positionResponse = letterSchema.safeParse(position).error?.errors[0].message;
    const ageResponse = numberSchema.safeParse(age).error?.errors[0].message;
    const ppgResponse = numberSchema.safeParse(ppg).error?.errors[0].message;
    const rpgResponse = numberSchema.safeParse(rpg).error?.errors[0].message;
    const apgResponse = numberSchema.safeParse(apg).error?.errors[0].message;

    if(nameResponse){
        return {status:false, msg:"Name "+nameResponse}
    }
    else if(teamResponse){
        return {status:false, msg:"Team "+teamResponse}
    }
    else if(positionResponse){
        return {status:false, msg:"Position "+positionResponse}
    }
    else if(ageResponse){
        return {status:false, msg:"Age "+ageResponse}
    }
    else if(ppgResponse){
        return {status:false, msg:"PPG "+ppgResponse}
    }
    else if(rpgResponse){
        return {status:false, msg:"RPG "+rpgResponse}
    }
    else if(apgResponse){
        return {status:false, msg:"APG "+apgResponse}
    }
    else{
        return {status:true}
    }
}

// console.log(validateNewPlayer("Vivek1"));
// { status: false, msg: 'Name must contain only letters' }