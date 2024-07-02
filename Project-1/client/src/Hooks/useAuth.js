import axios from 'axios';
import { useRecoilState } from "recoil";
import { accessTokenAtom, refreshTokenAtom, userAtom } from "../../context/atoms/userAtom";


const useAuth = async ()=>{
    const [user, setUser] = useRecoilState(userAtom);
    const [accessToken, setAccessToken] = useRecoilState(accessTokenAtom);
    const [refreshToken, setRefreshToken] = useRecoilState(refreshTokenAtom);

    const login = async ({username,password})=>{
        const response = await axios.post("http://localhost:3000/auth")
    }
}