import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { selectUserError, selectUserProfile, selectUserStatus } from "@redux/slices/userSlice";
import { getUserProfile } from "@redux/thunks/userThunks";
import React from "react";

const UserProfile: React.FC = () => {
    const dispatch = useAppDispatch();
    const userProfile = useAppSelector(selectUserProfile);
    const userStatus = useAppSelector(selectUserStatus);
    const userError = useAppSelector(selectUserError);

    const clickToFetchUserProfile = () => {
        dispatch(getUserProfile());
    };

    if (userStatus === "loading") {
        return <div>Loading...</div>;
    }

    if (userStatus === "failed") {
        return <div>Error: {userError}</div>;
    }

    return (
        <div>
            <button onClick={clickToFetchUserProfile}></button>
            <h2>User Profile</h2>
            {userProfile ? (
                <div>
                    <p>Name: {userProfile.name}</p>
                    <p>Email: {userProfile.email}</p>
                    {/* Render other profile information */}
                </div>
            ) : (
                <div>No user profile available</div>
            )}
        </div>
    );
};

export default UserProfile;
