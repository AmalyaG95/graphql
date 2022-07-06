import React, { useState } from "react";

import { useQuery, useMutation } from "@apollo/client";

import styles from "./index.module.css";
import {
    ADD_USER_MUTATION,
    GET_FRIENDS_QUERY,
    GET_USERS_QUERY,
} from "../../queries/queries";

const AddUserForm = () => {
    const [name, setName] = useState("");
    const [bestFriendId, setBestFriendId] = useState("");
    const { data: friendsData } = useQuery(GET_FRIENDS_QUERY);
    const [addUser] = useMutation(ADD_USER_MUTATION, {
        variables: {
            name,
            bestFriendId,
        },
    });

    const handleChange = (e: any) => {
        setBestFriendId(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !bestFriendId) return;
        addUser({
            variables: { name, bestFriendId },
            refetchQueries: [{ query: GET_USERS_QUERY }],
        });
        setName("");
        setBestFriendId("");
    };

    return (
        <div className={styles.container}>
            <h1>Add User Form</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                </div>
                <div>
                    <label htmlFor="friend">Best Friend</label>
                    <select
                        name="bestFriend"
                        id="friend"
                        onChange={handleChange}
                        value={bestFriendId}
                    >
                        <option value="Select Best Friend">Select</option>
                        {friendsData?.friends.map((friend: any) => (
                            <option key={friend.id} value={friend.id}>
                                {friend.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button>Add</button>
            </form>
        </div>
    );
};

export default AddUserForm;
