import { useRecoilState } from "recoil";
import { handleLogin, handleLogout, getNewAccessToken, isTokenValid, registerNewUser } from "../utils/auth";
import { userAtom } from "../state/userAtom";

export const useAuth = () => {
    const [user, setUser] = useRecoilState(userAtom)

    const Login = async (username, password) => {
        try {
            const response = await handleLogin(username, password);

            const userInfo = {
                id: response.id,
                username: response.username,
                role: response.role,
                accessToken: response.accessToken,
                isAuthenticated: true
            }

            setUser(userInfo);

            return { status: true };
        }
        catch (err) {
            console.log("@Login : \n" + err);
            const errMsg = err.response.data?.msg ;

            return { status: false, msg: errMsg ? errMsg : "Internal Server Error"}
        }
    }

    const Logout = async () => {
        try {
            
            const response = await checkAuth();

            if(response.status){
                const accessToken = user.accessToken;
            
                await handleLogout(accessToken);
            }

            setUser({isAuthenticated:false})
            
            localStorage.clear();

            return { status: true }
        }
        catch (err) {
            console.log("@Logout : \n" + err);
            return { status: false, msg: "Failed to logout" }
        }
    }

    const Register = async (username, password) => {
        try {
            const response = await registerNewUser(username, password);
            return await Login(username, password);
        }
        catch (err) {
            console.log("@Register : \n" + err);
            return { status: false }
        }
    }

    const checkAuth = async () => {
        const accessToken = user.accessToken;

        if (accessToken && isTokenValid(accessToken)) {
            // No need to perform anything
            return {status: true};
        }
        else if (!isTokenValid(accessToken)) {
            try {
                const { newAccessToken } = await getNewAccessToken();

                setUser({...user,accessToken: newAccessToken})
                console.log("Token Rotated");
                return {status: true}
            }
            catch (err) {
                console.log("@checkAuth : \n" + err);
                return {status: false}
            }
        }
        else {
            return {status: false}
        }
    }

    return { Login, Logout, Register, checkAuth }
}