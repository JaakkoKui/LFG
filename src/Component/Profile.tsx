import React from "react";
import { useStateValue } from "../state/state";
import { getProfiles} from "../services/profileService";
import { ProfileModel } from "../types";

const Profile: React.FC = () => {
    const [{ profile }, dispatch] = useStateValue();
    const [{ login }] = useStateValue();
    const [{ email }] = useStateValue();

    React.useEffect(() => {
        getProfiles().then(data =>{ 
            console.log(data);
            const profiles: ProfileModel[] = data as ProfileModel[];
            dispatch({type: "GET_PROFILES", payload: profiles});
        });
        
        
    }, [dispatch]);

    if (email !== "") {
        const loggedUser = Object.values(login).filter(log => log.email === email);

        const user = Object.values(profile).filter(prof => prof.email === loggedUser[0].email);


        if (user.length !== 0) {
            return (<div key={user[0].Id}>
                <h1 className="text-3xl font-bold underline">
                    Hello world!
                </h1>
                <div>Nickname: {user[0].Nickname}</div>
                <div>Firstname: {user[0].FirstName}</div>
            </div>)
        } else {
            return (<></>)
        }
    } else {
        return (
            <></>
        );

    }
};

export default Profile;