import { useQuery } from "@apollo/client";

import styles from "./index.module.css";
import { GET_USER_QUERY } from "../../queries/queries";

const UserDetails = ({ selectedUser }: any) => {
    const {
        data: userData
    } = useQuery(GET_USER_QUERY, {
        variables: {
            id: selectedUser,
        },
    });

    return (
        <div className={styles.container}>
            <h1>Single User Info</h1>
            {userData?.user?.name && (
                <div className={styles.wrapper}>
                    <span>Username: </span>
                    {userData?.user?.name}
                </div>
            )}
            {userData?.user?.bestFriend?.name && (
                <div className={styles.wrapper}>
                    <span>User's best friend: </span>
                    {userData?.user?.bestFriend?.name}
                </div>
            )}
        </div>
    );
};

export default UserDetails;
