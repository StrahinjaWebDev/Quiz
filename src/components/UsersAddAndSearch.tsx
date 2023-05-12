import React from "react";
import Button from "./Button/Button";
import Input from "./Input/Input";

interface Props {
  handleOpenAddUserModal: () => void;
  searchUserValue: string;
  // eslint-disable-next-line no-unused-vars
  handleUserSearchInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const UsersAddAndSearch = ({ handleOpenAddUserModal, searchUserValue, handleUserSearchInputChange }: Props) => {
  return (
    <div className="flex flex-row gap-12 items-center ml-12">
      <Button onClick={handleOpenAddUserModal} label="Add users" secondary />
      <Input placeholder="Search users.." value={searchUserValue} onChange={handleUserSearchInputChange} primary />
    </div>
  );
};

export default UsersAddAndSearch;
