import React from "react";
import { useStateValue } from "../state/state";


const Profile: React.FC = () => {
    const [{profile}, dispatch] = useStateValue();
    console.log(profile);
    return (
        <div>
            <h1 className="text-3xl font-bold underline">
                Hello world!
            </h1>
            {Object.values(profile).map(prof => 
                <div key={prof.Id}>{prof.Nickname}</div>
            )}
        </div>
    );
};

export default Profile;