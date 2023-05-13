import React, { useState } from "react";
import Input from "../Input/Input";
import { User } from "../../models/User";
import AreYouSureModal from "./AreYouSureModal";

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
  areYouSure: boolean;
  // eslint-disable-next-line no-unused-vars
  setAreYouSure: (isOpen: boolean) => void;
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
  areYouSure,
  setAreYouSure,
}: Props) => {
  const [users] = useState<User[] | []>([]);

  return (
    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-main min-h-[15em] w-[30em] flex flex-col rounded-xl items-center gap-5 text-secondary border-white border-2 ">
      <p className="font-semibold mt-[1em] text-2xl">Add User {users.find((user) => user.id === selectedUserId)?.username}</p>
      <div className="flex justify-around  items-center w-[100%] gap-5 flex-col">
        <Input onChange={handleAddUsernameChange} value={addUsername} primary placeholder="Input username here..."></Input>
        <Input onChange={handleAddPasswordChange} value={addPassword} primary placeholder="Input password here..."></Input>
        <button
          className="border-2 rounded-3xl w-[5em] h-[2em] flex justify-center  items-center bg-white text-main  font-semibold border-secondary"
          onClick={() => setAreYouSure(!areYouSure)}
        >
          Submit
        </button>
        {areYouSure && (
          <AreYouSureModal
            message="Are you sure you want to add user?"
            onConfirm={handleAddUser}
            onCancel={() => setAreYouSure(!areYouSure)}
          />
        )}
      </div>
      <button className="absolute right-4 text-xl text-red-500 font-ultrabold" onClick={() => setOpenAddUserModal(!handleOpenAddUserModal)}>
        X
      </button>
    </div>
  );
};

export default AddUserModal;
