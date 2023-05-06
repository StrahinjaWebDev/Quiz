import React from "react";
import Button from "./Button";
import Input from "./Input";

const UsersAddAndSearch = ({ handleOpenAddUserModal, searchUserValue, handleUserSearchInputChange }) => {
  
  return (
    <div className="flex flex-row gap-12 items-center ml-12">
      <Button onClick={handleOpenAddUserModal} label="Add users" secondary />
      <Input placeholder="Search users.." value={searchUserValue} onChange={handleUserSearchInputChange} primary />
    </div>
  );
};

export default UsersAddAndSearch;
