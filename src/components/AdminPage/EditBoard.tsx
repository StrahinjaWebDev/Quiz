import React, { useState } from "react";
import { User } from "../../models/User";
import Button from "../ReusableComponents/Button";
import Input from "../ReusableComponents/Input";
import { deleteUser } from "../../service/deleteUser";
import { putUser } from "../../service/putUser";
import AreYouSureModal from "../ReusableComponents/AreYouSureModal";

interface Props {
  users: User[];
  // eslint-disable-next-line no-unused-vars
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

  return (
    <div className="w-screen h-[50vh] flex justify-center items-center mt-3 ">
      <div className="w-[80vw] h-[100%] flex-col flex bg-secondary rounded-[60px] items-center overflow-y-auto scroll-smooth">
        {users.map((user) => (
          <div key={user.id} className="flex flex-row w-[80%] h-[10%] items-center justify-between mt-5">
            <p className="text-sm text-main med:text-xl w-[30%] font-semibold">{user.username}</p>
            <Button label="Edit" primary onClick={() => handleOpenEditUserEditModal(user.id)} />
            <Button label="Delete" primary onClick={() => handleDeleteUser(user.id)} />
          </div>
        ))}
        {openUserEditModal && (
          <div className="absolute bg-main h-[13vh] w-[50vw] flex flex-col rounded-xl items-center gap-5 text-secondary border-2 border-white ">
            <p className="font-semibold text-3xl">Name: {users.find((user) => user.id === selectedUserId)?.username}</p>
            <div className="flex justify-around  items-center w-[100%] gap-2 mt-3">
              <p className="text-secondary font-semibold text-sm">New password: </p>
              <Input onChange={handlePasswordChange} value={password} primary placeholder="Input new password here..."></Input>
              <Button secondary onClick={() => setAreYouSureModalUserEdit(!areYouSureModalUserEdit)} label="Submit" />

              {areYouSureModalUserEdit && (
                <AreYouSureModal
                  message="Are you sure you want to edit user password?"
                  onCancel={() => setAreYouSureModalUserEdit(!areYouSureModalUserEdit)}
                  onConfirm={handleEditPassword}
                />
              )}
            </div>
            <button className="absolute right-4 text-xl text-red-500" onClick={() => setOpenUserEditModal(!openUserEditModal)}>
              X
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditBoard;
