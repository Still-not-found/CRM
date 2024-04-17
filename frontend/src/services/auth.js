import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

const AuthService = {
    register: ()=>{

    },
    login: async (email,password,isRemember)=>{
        console.log(API_URL);
        return await axios.post(`${API_URL}/auth/login`,{email,password}).then((response)=>{
            if(response.data.status){
                const sessionData ={
                    id:response.data.session_id,
                    token:response.data.token,
                    userData:response.data.user_data,
                }
                if(isRemember){
                    localStorage.setItem("sessionData",JSON.stringify(sessionData));
                }else{
                    sessionStorage.setItem("sessionData",JSON.stringify(sessionData));
                }
            }
            return response.data;
        });
    },
    logout: ()=>{

    },
    getCurrentUser:()=>{
        let sessionData = JSON.parse(localStorage.getItem("sessionData"));
        if(sessionData===null){
          sessionData = JSON.parse(sessionStorage.getItem("sessionData"));
        }
        return sessionData.userData;
    },
    getCurrentSessionData:()=>{
        let sessionData = JSON.parse(localStorage.getItem("sessionData"));
        if(sessionData===null){
          sessionData = JSON.parse(sessionStorage.getItem("sessionData"));
        }
        return sessionData;
    }
};

export default AuthService;
