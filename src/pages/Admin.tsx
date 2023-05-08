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
import { putQuiz } from "../service/putQuiz";
import BoardSelection from "../components/BoardSelection";
import QuizAddAndSearch from "../components/QuizzAddAndSearch";
import QuizzAddAndSearch from "../components/QuizzAddAndSearch";
import UsersAddAndSearch from "../components/UsersAddAndSearch";
import AddUserModal from "../components/AddUserModal";
import AreYouSureEditUser from "../components/AreYouSureEditUser";

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
  const [openAddUserModal, setOpenAddUserModal] = useState(false);
  const [addPassword, setAddPassword] = useState("");
  const [addUsername, setAddUsername] = useState("");
  const [searchUserValue, setSearchUserValue] = useState("");
  const [areYouSureModalUserEdit, setAreYouSureModalUserEdit] = useState(false);

  const { cardData, handleSelectQuiz = () => {}, selectedCard } = useContext(appContext);

  //* Is Active quiz button
  const handleIsActiveQuiz = async (quizId: string) => {
    const quiz = quizzes.find((q) => q.id === quizId);
    if (quiz) {
      const updatedQuiz = { ...quiz, active: !quiz.active };
      const response = await putQuiz(quizId, updatedQuiz);
      if (response.success) {
        setQuizzes(quizzes.map((q) => (q.id === quizId ? updatedQuiz : q)));
      } else {
        console.log(response.error);
      }
    }
  };

  console.log(quizzes);

  const handleAreYouSureUser = () => {
    setAreYouSureModalUserEdit(!areYouSureModalUserEdit);
  };

  const handleQuizSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuizValue(event.target.value);
  };

  const handleUserSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchUserValue(event.target.value);
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

  // * Searching user
  const getUser = async () => {
    const users = await initialGetUsers();
    if (users.data) {
      const filteredUsers = users.data.filter((u) => u.username?.toLowerCase().includes(searchUserValue.toLowerCase()));
      setUsers(filteredUsers);
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
    setAreYouSureModalUserEdit(!areYouSureModalUserEdit);
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

  // * Useefect for geting quiz
  useEffect(() => {
    getQuizzes();
  }, [searchQuizValue]);

  // * Useefect for geting users
  useEffect(() => {
    getUser();
  }, [searchQuizValue]);

  useEffect(() => {
    getUser();
  }, [searchUserValue]);

  return (
    <>
      {admin && (
        <>
          <Navbar showMailIcon={false} />
          <div className="w-screen min-h-[70vh] justify-center items-center mt-1">
            <BoardSelection activeBoard={activeBoard} setActiveBoard={setActiveBoard} />
            <div className="flex mt-12 tablet:mt-0 gap-3 items-center desktop:ml-[10em]">
              {activeBoard === "Create" && (
                <QuizzAddAndSearch searchQuizValue={searchQuizValue} handleQuizSearchInputChange={handleQuizSearchInputChange} />
              )}
              {activeBoard === "Edit" && (
                <UsersAddAndSearch
                  handleOpenAddUserModal={handleOpenAddUserModal}
                  handleUserSearchInputChange={handleUserSearchInputChange}
                  searchUserValue={searchUserValue}
                />
              )}
              {openAddUserModal && (
                <AddUserModal
                  addPassword={addPassword}
                  addUsername={addUsername}
                  handleAddPasswordChange={handleAddPasswordChange}
                  handleAddUser={handleAddUser}
                  handleAddUsernameChange={handleAddUsernameChange}
                  handleOpenAddUserModal={handleOpenAddUserModal}
                  selectedUserId={selectedUserId}
                  setOpenAddUserModal={setOpenAddUserModal}
                />
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
                      <Button label={labelText} onClick={() => handleIsActiveQuiz(quiz.id)} primary></Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeBoard === "Edit" && (
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
                        <button onClick={handleAreYouSureUser}>Change password</button>{" "}
                        {areYouSureModalUserEdit && (
                          <AreYouSureEditUser handleAreYouSureUser={handleAreYouSureUser} handleEditPassword={handleEditPassword} />
                        )}
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
