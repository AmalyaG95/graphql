import { useMutation, useQuery } from "@apollo/client";
import { EDIT_USER_MUTATION, GET_FRIENDS_QUERY } from "../../queries/queries";
import styles from "./index.module.css";

const EditUserModal = ({
    editableUser,
    setEditableUser,
    refetchGetUsers,
}: any) => {
    const { data: friendsData } = useQuery(GET_FRIENDS_QUERY);
    const [editUser] = useMutation(EDIT_USER_MUTATION);

    const handleCloseEditUserModal = () => {
        setEditableUser(null);
    };

    const handleChange = (e: any, inputName: any) => {
        const editedUser = {
            ...editableUser,
            [inputName]:
                inputName === "name"
                    ? e.target.value
                    : {
                          ...editableUser.bestFriend,
                          id: e.target.value,
                          name: friendsData.friends.find(
                              (friend: any) => friend.id === e.target.value
                          )?.name,
                      },
        };

        setEditableUser(editedUser);
    };

    const handleEditUser = () => {
        editUser({
            variables: {
                id: editableUser.id,
                name: editableUser.name,
                bestFriendId: editableUser.bestFriend.id,
            },
        });
        refetchGetUsers();
        setEditableUser(null);
    };

    const stopProp = (e: any) => {
        e.stopPropagation();
    };

    return (
        <div className={styles.container} onClick={handleCloseEditUserModal}>
            <div className={styles.modalContent} onClick={stopProp}>
                <span
                    className={styles.close}
                    id="close"
                    onClick={handleCloseEditUserModal}
                >
                    &times;
                </span>
                <div className={styles.form}>
                    <h1>Edit User</h1>
                    <div>
                        <label htmlFor="username">Username</label>
                        <input
                            id="username"
                            type="text"
                            onChange={(e) => handleChange(e, "name")}
                            value={editableUser.name}
                        />
                    </div>
                    <div>
                        <label htmlFor="friend">Best Friend</label>
                        <select
                            name="bestFriend"
                            id="friend"
                            onChange={(e) => handleChange(e, "bestFriend")}
                            value={editableUser.bestFriend.id}
                        >
                            <option value="Select Best Friend">Select</option>
                            {friendsData?.friends.map((friend: any) => (
                                <option key={friend.id} value={friend.id}>
                                    {friend.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.actionButtons}>
                        <button
                            className={styles.editBtn}
                            onClick={handleEditUser}
                        >
                            Save
                        </button>
                        <button
                            id="cancelBtn"
                            onClick={handleCloseEditUserModal}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditUserModal;
