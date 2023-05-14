import React, { useState } from "react";
import Input from "../../ReusableComponents/Input";
import { User } from "../../../models/User";
import AreYouSureModal from "../../ReusableComponents/AreYouSureModal";
import Button from "../../ReusableComponents/Button";

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
  // eslint-disable-next-line no-unused-vars
  setIsNewUserAdmin: (isAdmin: boolean) => void;
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
  setIsNewUserAdmin,
}: Props) => {
  const [users] = useState<User[] | []>([]);

  return (
    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-main min-h-[16em] w-[30em] flex flex-col rounded-xl items-center gap-5 text-secondary border-white border-2 ">
      <p className="font-semibold mt-[1em] text-2xl">Add User {users.find((user) => user.id === selectedUserId)?.username}</p>
      <div className="flex justify-around  items-center w-[100%] gap-5 flex-col">
        <Input onChange={handleAddUsernameChange} value={addUsername} primary placeholder="Input username here..."></Input>
        <Input onChange={handleAddPasswordChange} value={addPassword} primary placeholder="Input password here..."></Input>
        <div className="flex gap-4 items-center justify-center w-5/6">
          <p className="flex text-sm font-extrabold text-center">Is the new user admin?</p>
          <Button label="Yes" secondary onClick={() => setIsNewUserAdmin(true)} />
          <Button label="No" secondary onClick={() => setIsNewUserAdmin(false)} />
        </div>
        <button
          className="border-2 rounded-3xl w-[5em] h-[2em] flex justify-center  items-center bg-white text-main  font-semibold border-secondary mb-3"
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
      <button
        className="absolute right-4 text-xl text-red-500 font-ultrabold mt-3"
        onClick={() => setOpenAddUserModal(!handleOpenAddUserModal)}
      >
        X
      </button>
    </div>
  );
};

export default AddUserModal;
