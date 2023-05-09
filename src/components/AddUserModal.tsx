import React, { useState } from "react";
import Input from "./Input";
import { User } from "../models/User";

interface Props {
  // eslint-disable-next-line no-unused-vars
  handleAddUsernameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedUserId: string | null;
  handleAddUser: () => void;
  addPassword: string;
  addUsername: string;
  // eslint-disable-next-line no-unused-vars
  handleAddPasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  // eslint-disable-next-line no-unused-vars
  setOpenAddUserModal: (isOpen: boolean) => void;
  // eslint-disable-next-line no-unused-vars
  handleOpenAddUserModal: (isOpen: boolean) => void;
}

const AddUserModal = ({
  handleAddUsernameChange,
  addUsername,
  selectedUserId,
  handleAddUser,
  addPassword,
  handleAddPasswordChange,
  setOpenAddUserModal,
  handleOpenAddUserModal,
}: Props) => {
  const [users] = useState<User[] | []>([]);

  return (
    <div className="ml-[17em] mt-[5em] absolute bg-main min-h-[44vh] w-[50vw] flex flex-col rounded-xl items-center gap-5 text-secondary border-white border-2 ">
      <p className="font-semibold mt-[1em] text-2xl">Add User {users.find((user) => user.id === selectedUserId)?.username}</p>
      <div className="flex justify-around  items-center w-[100%] gap-5 flex-col">
        <Input onChange={handleAddUsernameChange} value={addUsername} primary placeholder="Input username here..."></Input>
        <Input onChange={handleAddPasswordChange} value={addPassword} primary placeholder="Input password here..."></Input>
        <button className="border-2 border-white rounded-3xl w-[5em] h-[4em]" onClick={handleAddUser}>
          Add user
        </button>
      </div>
      <button className="absolute right-4 text-xl " onClick={() => setOpenAddUserModal(!handleOpenAddUserModal)}>
        X
      </button>
    </div>
  );
};

export default AddUserModal;
