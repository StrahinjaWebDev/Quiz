import React, { useState, useContext, useEffect } from "react";
import Navbar from "../components/Navbar";
import Input from "../components/Input";
import Button from "../components/Button";
import { appContext } from "../context/AppProvider";
import UserPreQuiz from "./Quiz";
import { getQuizzes as initialGetQuizzes } from "../service/getQuizzes";
import { getUsers as initialGetUsers } from "../service/getUser";
import { deleteUser } from "../service/deleteUser";
import { putUser } from "../service/putUser";
import { v4 as uuidv4 } from "uuid";
import { deleteQuiz } from "../service/deleteQuiz";
import { getPostUser } from "../service/getPostUser";
import { User } from "../models/User";
import { Quiz } from "../models/Quiz";

const Admin = ({ admin }: any) => {
  const [activeBoard, setActiveBoard] = useState("Create");
  const [labelText, setLabelText] = useState("Active");
  const [active, setActive] = useState(false);
  const [quizzes, setQuizzes] = useState<Quiz[] | []>([]);
  const [users, setUsers] = useState<User[] | []>([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [openUserEditModal, setOpenUserEditModal] = useState(false);
  const [password, setPassword] = useState("");
  const [searchQuizValue, setSearchQuizValue] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<User[] | []>([]);
  const [openAddUserModal, setOpenAddUserModal] = useState(false);
  const [addPassword, setAddPassword] = useState("");
  const [addUsername, setAddUsername] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const { cardData, handleSelectQuiz = () => {}, selectedCard } = useContext(appContext);

  const handleQuizSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuizValue(event.target.value);
  };

  // * CREATE QUIZ FUNCTIONALITY //*

  // * Delete Quiz
  const handleDeleteQuiz = async (quizId: string) => {
    await deleteQuiz(quizId);
    const updatedQuizzes = quizzes.filter((quiz) => quiz.id !== quizId);
    setQuizzes(updatedQuizzes);
  };

  // * Filtering quizzes for search
  const getQuizzes = async () => {
    const quizzes = await initialGetQuizzes();
    if (quizzes.data) {
      const filteredQuizzes = quizzes.data.filter((q) => q.name.toLowerCase().includes(searchQuizValue.toLowerCase()));
      setQuizzes(filteredQuizzes);
    }
  };

  // * EDIT USER FUNCIONALITY //*

  // * Onchange for adding username
  const handleAddUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddUsername(event.target.value);
  };

  // * Onchange for password
  const handleAddPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddPassword(event.target.value);
  };

  // * Onchange for password
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  // * Open add user modal
  const handleOpenAddUserModal = () => {
    setOpenAddUserModal(!openAddUserModal);
  };

  // * Adding user

  //! 405 when adding !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  const handleAddUser = () => {
    const newUser = {
      id: uuidv4(),
      username: addUsername,
      password: addPassword,
      admin: false,
    };
    getPostUser(newUser).then((response) => {
      if (response.success) {
        const updatedUsers = [...users, newUser];
        setUsers(updatedUsers);
      } else {
        alert(response.error);
      }
    });
  };

  useEffect(() => {
    setFilteredUsers(users);
  }, [searchQuery]);

  // * Searching user
  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value.toLowerCase());
    if (searchQuery === "") {
      setFilteredUsers(users);
    } else {
      const filteredUsers = users.filter((user) => user.username && user.username.toLowerCase().includes(searchQuery));
      setFilteredUsers(filteredUsers);
    }
  };

  // * Editing user password
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
  };

  // * Modal for editing user
  const handleOpenEditUserEditModal = (userId: string) => {
    setSelectedUserId(userId);
    setOpenUserEditModal(true);
  };

  // * Function for deleting user
  const handleDeleteUser = async (userId: string) => {
    await deleteUser(userId);
    const updatedUserList = users.filter((user) => user.id !== userId);
    setUsers(updatedUserList);
  };

  // * Onclick label change function
  const handleActivateClick = () => {
    setActive(!active);
    if (active === false) {
      setLabelText("Deactive");
    } else {
      setLabelText("Active");
    }
  };

  // * Setting users in the state
  const getUsers = async () => {
    const user = await initialGetUsers();
    if (user.data) setUsers(user.data);
  };

  // * Useefect for geting quiz
  useEffect(() => {
    getQuizzes();
  }, [searchQuizValue]);

  // * Useefect for geting users
  useEffect(() => {
    getUsers();
  }, [searchQuery]);

  return (
    <>
      {admin && (
        <>
          <Navbar showMailIcon={false} />
          <div className="w-screen min-h-[70vh] justify-center items-center mt-1">
            <div className="flex justify-evenly items-center desktop:mb-12">
              <button
                className={`text-white  bg-secondary  hover:opacity-90 text-sm tablet:text-xl py-2 px-2 desktop:w-[7em] rounded-[60px] ${
                  activeBoard === "Create" ? "text-main" : "text-white" //? Sto ne radi?
                }`}
                onClick={() => setActiveBoard("Create")}
              >
                Create quiz
              </button>
              <button
                style={{ color: activeBoard === "Edit" ? "#155263" : "white" }} //TODO: conditional classNames
                className="text-white  bg-secondary  hover:opacity-90 text-sm tablet:text-xl py-2 px-2 desktop:w-[7em]  rounded-[60px]"
                onClick={() => setActiveBoard("Edit")}
              >
                Edit Users
              </button>
            </div>
            <div className="flex mt-12 tablet:mt-0 gap-3 items-center desktop:ml-[10em]">
              {activeBoard === "Create" && (
                <div>
                  <Button label="Create quiz" secondary />
                  <Input value={searchQuizValue} onChange={handleQuizSearchInputChange} placeholder="Search quiz.." primary />
                </div>
              )}
              {activeBoard === "Edit" && (
                <div>
                  <Button onClick={handleOpenAddUserModal} label="Add users" secondary />
                  <Input placeholder="Search users.." value={searchQuery} onChange={handleSearchInputChange} primary />
                </div>
              )}
              {openAddUserModal && (
                <div className="ml-[5em] absolute bg-main h-[30vh] w-[55vw] flex flex-col rounded-xl items-center gap-5 text-secondary border-white border-2">
                  <p className="font-semibold">Add User {users.find((user) => user.id === selectedUserId)?.username}</p>
                  <div className="flex justify-around  items-center w-[100%] gap-2 flex-col">
                    <Input onChange={handleAddUsernameChange} value={addUsername} primary placeholder="Input username here..."></Input>
                    <Input onChange={handleAddPasswordChange} value={addPassword} primary placeholder="Input password here..."></Input>
                    <button onClick={handleAddUser}>Add user</button>
                  </div>
                  <button className="absolute right-4 text-xl" onClick={() => setOpenAddUserModal(!handleOpenAddUserModal)}>
                    X
                  </button>
                </div>
              )}
            </div>
            {activeBoard === "Create" && (
              <div className="w-screen h-[50vh] flex justify-center items-center mt-3 ">
                <div className="w-[80vw] h-[100%] flex-col flex bg-secondary rounded-[60px] items-center overflow-y-auto overflow-hidden">
                  {quizzes.map((quiz) => (
                    <div key={quiz.id} className="flex flex-row w-[80%] h-[10%] items-center justify-between mt-5">
                      <p className="text-sm text-main med:text-xl w-[30%]">{quiz.name}</p>
                      <Button label="Edit" primary />
                      <Button onClick={() => handleDeleteQuiz(quiz.id)} label="Delete" primary />
                      <Button label={labelText} onClick={handleActivateClick} primary></Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeBoard === "Edit" && (
              <div className="w-screen h-[50vh] flex justify-center items-center mt-3 ">
                <div className="w-[80vw] h-[100%] flex-col flex bg-secondary rounded-[60px] items-center overflow-y-auto scroll-smooth">
                  {filteredUsers.map((user) => (
                    <div key={user.id} className="flex flex-row w-[80%] h-[10%] items-center justify-between mt-5">
                      <p className="text-sm text-main med:text-xl w-[30%]">{user.username}</p>
                      <Button label="Edit" primary onClick={() => handleOpenEditUserEditModal(user.id)} />
                      <Button label="Delete" primary onClick={() => handleDeleteUser(user.id)} />
                    </div>
                  ))}
                  {openUserEditModal && (
                    <div className="absolute bg-main h-[20vh] w-[55vw] flex flex-col rounded-xl items-center gap-5 text-secondary">
                      <p className="font-semibold">Name: {users.find((user) => user.id === selectedUserId)?.username}</p>
                      <div className="flex justify-around  items-center w-[100%] gap-2">
                        <Input onChange={handlePasswordChange} value={password} primary placeholder="Input password here..."></Input>
                        <button onClick={handleEditPassword}>Change password</button>
                      </div>
                      <button className="absolute right-4 text-xl" onClick={() => setOpenUserEditModal(!openUserEditModal)}>
                        X
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </>
      )}
      {!admin && (
        <>
          <Navbar showMailIcon={true} />
          <div className="w-screen flex justify-center items-center">
            {!selectedCard ? (
              <div className="w-[80%] h-[100%] grid justify-between mt-[4em] gap-3 grid-cols-3 ">
                {cardData?.map((card) => (
                  <button key={card.id} onClick={() => handleSelectQuiz(card)}>
                    <div className="h-[12em] w-[100%] justify-around items-center bg-secondary rounded-[15px] flex flex-col">
                      <span className="text-2xl">{card.name}</span>
                      <p className="text-sm">{card.description}</p>
                      <span>Time to finish the quiz: {card.time}</span>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <UserPreQuiz selectedCard={selectedCard} />
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Admin;
