import axios from 'axios';
import { useRecoilState } from "recoil";
import { accessTokenAtom, refreshTokenAtom, userAtom } from "../../context/atoms/userAtom";

const useAuth = () => {
    const [user, setUser] = useRecoilState(userAtom);
    const [accessToken, setAccessToken] = useRecoilState(accessTokenAtom);
    const [refreshToken, setRefreshToken] = useRecoilState(refreshTokenAtom);

    const login = async (username, password) => {
        try {
            const response = await axios.post("http://localhost:3000/auth", { username, password });
            const data = response.data;

            console.log(data);

            setUser({ username, role: data.role });

            setTokens(data.accessToken, data.refreshToken);

            return { status: true, msg: "Login Successful" };

        } catch (err) {
            console.log(err);
            const errorMsg = err.response?.data?.msg || "Couldn't reach servers";
            return { status: false, msg: errorMsg };
        }
    };

    const setTokens = (AcessToken, RefreshToken) => {
        if (AcessToken) {
            localStorage.setItem("accessToken", AcessToken);
            setAccessToken(AcessToken);
        }

        if (RefreshToken) {
            localStorage.setItem("refreshToken", RefreshToken);
            setRefreshToken(RefreshToken);
        }
    }

    const getTokens = () => {
        const AccessToken = localStorage.getItem("accessToken");
        const RefreshToken = localStorage.getItem("refreshToken");

        return { AccessToken, RefreshToken }
    }

    const isTokenValid = async () => {
        const Token = getTokens().AccessToken;
        try {
            const response = await axios.get("http://localhost:3000/check", {
                headers: {
                    'Authorization': `Bearer ${Token}`,
                    'Content-Type': 'application/json'
                }
            })

            return true;
        }
        catch (err) {
            const errorMsg = err.response?.data?.msg || ""
            console.log("isToken Valid : " + errorMsg);

            return false;
        }
    }

    const getNewTokens = async () => {
        const Token = getTokens().RefreshToken;
        try {
            const response = await axios.post("http://localhost:3000/refresh", { refreshToken: Token })

            const data = response.data;

            setTokens(data.newAccessToken, data.newRefreshToken)

            return true;
        }
        catch (err) {
            const errorMsg = err.response?.data?.msg || "No msg"
            console.log("getNewTokens : " + errorMsg);

            return false;
        }
    }

    const isUserValid = async () => {
        // If yes : He should remain on that page
        // If No : He should be redirected to signin page

        const isAccessTokenValid = await isTokenValid();

        if (isAccessTokenValid) return true;
        else {
            try{
                const response = await getNewTokens();
                return response;
            }catch(err){
                console.log("isUserValid : "+err);
                return false;
            }
        }

    }

    const logout = () => {
        localStorage.setItem("accessToken","");
        localStorage.setItem("refreshToken","");
    }

    return { login, isUserValid, logout};
};

export default useAuth;
