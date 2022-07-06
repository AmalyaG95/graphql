import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { FaEdit, FaTimes } from "react-icons/fa";

import styles from "./index.module.css";
import { DELETE_USER_MUTATION, GET_USERS_QUERY } from "../../queries/queries";
import UserDetails from "../UserDetails";
import EditUserModal from "../EditUserModal";

const UserList = () => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [editableUser, setEditableUser] = useState(null);
    const {
        data: usersData,
        error,
        loading,
        refetch: refetchGetUsers,
    } = useQuery(GET_USERS_QUERY);
    const [deleteUser] = useMutation(DELETE_USER_MUTATION);

    const handleDeleteUser = (e: any, id: any) => {
        e.stopPropagation();
        deleteUser({ variables: { id } });
        refetchGetUsers();
    };

    const handleOpenEditModal = (e: any, id: any) => {
        e.stopPropagation();
        setEditableUser(usersData.users.find((user: any) => user.id === id));
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <h1 className={styles.title}>Users List</h1>
                    {loading && <div>Spinner....</div>}
                    {error && <div>Something went wrong</div>}
                    <ul className={styles.userList}>
                        {usersData?.users.map((user: any) => (
                            <li
                                key={user.id}
                                onClick={(e) => {
                                    setSelectedUser(user.id);
                                }}
                            >
                                {user.name}
                                <button
                                    className={styles.deleteButton}
                                    onClick={(e) =>
                                        handleDeleteUser(e, user.id)
                                    }
                                >
                                    <FaTimes />
                                </button>
                                <button
                                    className={styles.editButton}
                                    onClick={(e) =>
                                        handleOpenEditModal(e, user.id)
                                    }
                                >
                                    <FaEdit />
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <UserDetails selectedUser={selectedUser} />
            </div>
            {editableUser && (
                <EditUserModal
                    editableUser={editableUser}
                    setEditableUser={setEditableUser}
                    refetchGetUsers={refetchGetUsers}
                />
            )}
        </>
    );
};

export default UserList;
