import zod, { isValid } from 'zod';

const nameSchema = zod.string()
    .regex(/^[a-zA-Z\s]+$/,{message: "Only letters and spaces are allowed in player name"})

export const validateName = (name) => {
    const response = nameSchema.safeParse(name).error?.errors[0].message;

    return !response ? {isValid: true} : {isValid: false,msg: response}
}

export const validateTeam = (team) => {
    const response = nameSchema.safeParse(team).error?.errors[0].message;

    if(response){
        return {isValid: false,msg: response}
    }

    const validTeamNames = ["GOLDEN STATE WARRIORS","LOS ANGELES LAKERS","CLEVELAND CAVALIERS","BOSTON CELTICS","CHICAGO BULLS","PHONEIX SUNS","MILWAUKEE BUCKS","DENVER NUGGETS","LA CLIPPERS","ORLANDO MAGIC", "OKLAHOMA CITY THUNDERS", "NEW YORK KNICKS","DALLAS MAVERICKS"]

    if(!validTeamNames.includes(team.toUpperCase())){
        return {isValid: false,msg: "Invalid team name"}
    }

    return {isValid: true};
}

export const validatePosition = (position) => {
    const validPositions = ["GUARD","FORWARD","CENTER"]

    if(!validPositions.includes(position.toUpperCase())){
        return {isValid: false,msg:"Allowed positions are Guard, Forward and Center"}
    }

    return {isValid: true};
}

export const validateFigures = (age,ppg,apg,rpg) => {
    const isAgeValid = age ? parseInt(age) ?? false : true;
    const isPPGValid = ppg ? parseFloat(ppg) ?? false : true;
    const isAPGValid = apg ? parseFloat(apg) ?? false : true;
    const isRPGValid = rpg ? parseFloat(rpg) ?? false : true;
    
    if(!isAgeValid ){
        return {isValid : false,msg:"Invalid age"}
    }
    else if(!isPPGValid){
        return {isValid : false,msg:"Invalid PPG"}
    }
    else if(!isAPGValid){
        return {isValid : false,msg:"Invalid APG"}
    }
    else if(!isRPGValid){
        return {isValid : false,msg:"Invalid RPG"}
    }
    else{
        return {isValid: true}
    }
}

// console.log(validateFigures(undefined,null,null,null)); {isValid : true}
// console.log(validateFigures(undefined,25.2,2.1,null)); {isValid : true}