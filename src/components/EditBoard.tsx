import React, { useState } from "react";
import { User } from "../models/User";
import Button from "./Button";
import Input from "./Input";
import { deleteUser } from "../service/deleteUser";
import AreYouSureEditUser from "./AreYouSureEditUser";
import { putUser } from "../service/putUser";

interface Props {
  users: User[];
  setUsers: (users: User[]) => void;
}

const EditBoard = ({ users, setUsers }: Props) => {
  const [selectedUserId, setSelectedUserId] = useState("");
  const [openUserEditModal, setOpenUserEditModal] = useState(false);
  const [password, setPassword] = useState("");
  const [areYouSureModalUserEdit, setAreYouSureModalUserEdit] = useState(false);

  const handleOpenEditUserEditModal = (userId: string) => {
    setSelectedUserId(userId);
    setOpenUserEditModal(true);
  };

  const handleDeleteUser = async (userId: string) => {
    await deleteUser(userId);
    const updatedUserList = users.filter((user) => user.id !== userId);
    setUsers(updatedUserList);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleEditPassword = async () => {
    const userToUpdatePassword = { ...users.find((user) => user.id === selectedUserId), password: password };
    if (selectedUserId !== null && userToUpdatePassword) {
      putUser(selectedUserId, userToUpdatePassword).then((response) => {
        if (response.success) {
          const updatedUser = users.map((user) => (user.id === selectedUserId ? { ...user, password } : user));
          setUsers(updatedUser);
        } else {
          alert(response.error);
        }
      });
    }
    setAreYouSureModalUserEdit(!areYouSureModalUserEdit);
  };
  console.log(users);

  return (
    <div className="w-screen h-[50vh] flex justify-center items-center mt-3 ">
      <div className="w-[80vw] h-[100%] flex-col flex bg-secondary rounded-[60px] items-center overflow-y-auto scroll-smooth">
        {users.map((user) => (
          <div key={user.id} className="flex flex-row w-[80%] h-[10%] items-center justify-between mt-5">
            <p className="text-sm text-main med:text-xl w-[30%] font-serif">{user.username}</p>
            <Button label="Edit" primary onClick={() => handleOpenEditUserEditModal(user.id)} />
            <Button label="Delete" primary onClick={() => handleDeleteUser(user.id)} />
          </div>
        ))}
        {openUserEditModal && (
          <div className="absolute bg-main h-[20vh] w-[55vw] flex flex-col rounded-xl items-center gap-5 text-secondary">
            <p className="font-semibold">Name: {users.find((user) => user.id === selectedUserId)?.username}</p>
            <div className="flex justify-around  items-center w-[100%] gap-2">
              <Input onChange={handlePasswordChange} value={password} primary placeholder="Input password here..."></Input>
              <button onClick={() => setAreYouSureModalUserEdit(!areYouSureModalUserEdit)}>Change password</button>
              {areYouSureModalUserEdit && (
                <AreYouSureEditUser
                  handleAreYouSureUser={() => setAreYouSureModalUserEdit(!areYouSureModalUserEdit)}
                  handleEditPassword={handleEditPassword}
                />
              )}
            </div>
            <button className="absolute right-4 text-xl" onClick={() => setOpenUserEditModal(!openUserEditModal)}>
              X
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditBoard;
