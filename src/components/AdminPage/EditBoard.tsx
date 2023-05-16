import React, { useState, useEffect } from "react";
import { User } from "../../models/User";
import Button from "../ReusableComponents/Button";
import Input from "../ReusableComponents/Input";
import { deleteUser } from "../../service/deleteUser";
import { putUser } from "../../service/putUser";
import AreYouSureModal from "../ReusableComponents/AreYouSureModal";
import { createPortal } from "react-dom";

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
  const [isClosing] = useState(false);

  const handleOpenEditUserEditModal = (userId: string) => {
    setSelectedUserId(userId);
    setOpenUserEditModal(true);
  };

  const closeModal = () => {
    setOpenUserEditModal(false);
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

  useEffect(() => {
    if (isClosing) {
      setTimeout(() => {
        setAreYouSureModalUserEdit(true);
        setAreYouSureModalUserEdit(false);
      }, 200); 
    }
  }, [isClosing]);

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
          <div
            className={`absolute transform animation-forwards ${
              !isClosing ? "animate-[appearScale_0.2s_ease]" : "animate-[dissAppearScale_0.2s_ease]"
            } bg-main min-h-[13em] w-[25em] flex flex-col rounded-xl items-center gap-5 text-secondary border-2 border-white`}
          >
            <div className=" justify-around  items-center w-[100%]  mt-3 flex flex-col gap-4">
              <p className="font-semibold text-3xl">Name: {users.find((user) => user.id === selectedUserId)?.username}</p>
              <p className="text-secondary font-semibold text-sm">New password: </p>
              <Input onChange={handlePasswordChange} value={password} primary placeholder="Input new password here..."></Input>
              <Button secondary onClick={() => setAreYouSureModalUserEdit(!areYouSureModalUserEdit)} label="Submit" />

              {areYouSureModalUserEdit &&
                createPortal(
                  <AreYouSureModal
                    message="Are you sure you want to edit user password?"
                    onCancel={() => setAreYouSureModalUserEdit(!areYouSureModalUserEdit)}
                    onConfirm={handleEditPassword}
                  />,
                  document.body
                )}
            </div>
            <button className="absolute right-4 text-xl text-red-500" onClick={closeModal}>
              X
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditBoard;
