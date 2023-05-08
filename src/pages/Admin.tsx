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
import QuizzAddAndSearch from "../components/QuizzAddAndSearch";
import UsersAddAndSearch from "../components/UsersAddAndSearch";
import AddUserModal from "../components/AddUserModal";
import AreYouSureEditUser from "../components/AreYouSureEditUser";
import { Questions } from "../models/Questions";
import { getQuestions } from "../service/getQuestions";

const Admin = ({ admin }: any) => {
  const [activeBoard, setActiveBoard] = useState("Create");
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
  const [openEditQuizModal, setOpenEditQuizModal] = useState(false);
  const [openQuizModalId, setOpenQuizModalId] = useState("");
  const [quizQuestions, setQuizQuestions] = useState<Questions[] | []>([]);
  const [createQuizModal, setCreateQuizModal] = useState(false);
  const [questionTypeDropdown, setQuestionTypeDropdown] = useState(false);
  const [selectedQuestionType, setSelectedQuestionType] = useState("");
  const [answersDropdown, setAnswersDropdown] = useState(false);
  const [selectedNumberOfAnswers, setSelectedNumberOfAnswers] = useState("");

  const { cardData, handleSelectQuiz = () => {}, selectedCard } = useContext(appContext);

  const handleOpenCreateQuizModal = () => {
    setCreateQuizModal(!createQuizModal);
  };

  const handleOpenEditQuizModal = async (quizId: string) => {
    setOpenEditQuizModal(!openEditQuizModal);
    setOpenQuizModalId(quizId);
    const question = await getQuestions(quizId);
    if (Array.isArray(question.data.questions)) {
      setQuizQuestions(question.data.questions);
    }
  };

  //* Is Active quiz button
  const handleIsActiveQuiz = async (quizId: string, isActive: boolean) => {
    const quiz = quizzes.find((q) => q.id === quizId);
    if (quiz) {
      const updatedQuiz = { ...quiz, active: !isActive };
      const response = await putQuiz(quizId, updatedQuiz);
      if (response.success) {
        setQuizzes(quizzes.map((q) => (q.id === quizId ? updatedQuiz : q)));
      } else {
        console.log(response.error);
      }
    }
  };

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

  useEffect(() => {
    getQuestions(openQuizModalId);
  }, [openQuizModalId]);

  return (
    <>
      {admin && (
        <>
          <Navbar showMailIcon={false} />
          <div className="w-screen min-h-[70vh] justify-center items-center mt-1">
            <BoardSelection activeBoard={activeBoard} setActiveBoard={setActiveBoard} />
            <div className="flex mt-12 tablet:mt-0 gap-3 items-center desktop:ml-[10em]">
              {activeBoard === "Create" && (
                <div className="flex flex-row gap-12 items-center ml-12">
                  <Button label="Create quiz" secondary onClick={handleOpenCreateQuizModal} />
                  <Input value={searchQuizValue} onChange={handleQuizSearchInputChange} placeholder="Search quiz.." primary />
                  {createQuizModal && (
                    <div className="w-[90vw] h-[90vh] bg-secondary absolute top-1/2 left-1/2 transform  -translate-x-1/2 -translate-y-1/2 rounded-xl  overflow-y-auto">
                      <div className="flex flex-col ml-12 mt-8 gap-4">
                        <p>General Information</p>
                        <Input primary placeholder="Quiz name..." />
                        <Input primary placeholder="Quiz time..." />
                        <Input primary placeholder="Quiz category..." />
                        <textarea
                          className="block p-2.5 w-2/3 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Quiz description..."
                        ></textarea>
                      </div>
                      <div className="flex justify-center mt-10">
                        <div className="w-[90%] h-full flex flex-col bg-main items-center gap-4">
                          <div className="text-xl flex gap-4  mt-8">
                            <p>Questions & Anwers</p>
                            <button>+</button>
                          </div>
                          <button
                            className=" bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                            onClick={() => setQuestionTypeDropdown(true)}
                          >
                            {selectedQuestionType || "Question type"}
                          </button>
                          {questionTypeDropdown && (
                            <div className="flex flex-col">
                              <div className="flex gap-3 items-center">
                                <label htmlFor="radio-input">Single choise</label>
                                <input type="checkbox" id="radio-input"></input>
                              </div>
                              <div className="flex gap-3 items-center">
                                <label htmlFor="radio-input">Multiple choise</label>
                                <input type="checkbox" id="radio-input"></input>
                              </div>
                              <div className="flex gap-3 items-center">
                                <label htmlFor="radio-input">Text answer</label>
                                <input type="checkbox" id="radio-input"></input>
                              </div>
                            </div>
                          )}
                          <button
                            className=" bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                            onClick={() => setAnswersDropdown(true)}
                          >
                            {selectedNumberOfAnswers || "Number of answers"}
                          </button>
                          {answersDropdown && (
                            <ul className="py-2 text-sm text-gray-300 dark:text-gray-200">
                              <div className="flex flex-col">
                                <div className="flex gap-3 items-center">
                                  <label htmlFor="radio-input">1</label>
                                  <input type="checkbox" id="radio-input"></input>
                                </div>
                                <div className="flex gap-3 items-center">
                                  <label htmlFor="radio-input">2</label>
                                  <input type="checkbox" id="radio-input"></input>
                                </div>
                                <div className="flex gap-3 items-center">
                                  <label htmlFor="radio-input">3</label>
                                  <input type="checkbox" id="radio-input"></input>
                                </div>
                              </div>
                              <div className="flex flex-col">
                                <div className="flex gap-3 items-center">
                                  <label htmlFor="radio-input">4</label>
                                  <input type="checkbox" id="radio-input"></input>
                                </div>
                                <div className="flex gap-3 items-center">
                                  <label htmlFor="radio-input">5</label>
                                  <input type="checkbox" id="radio-input"></input>
                                </div>
                                <div className="flex gap-3 items-center">
                                  <label htmlFor="radio-input">6</label>
                                  <input type="checkbox" id="radio-input"></input>
                                </div>
                              </div>
                            </ul>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
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
                <div className="w-[80vw] h-[100%] flex-col flex bg-secondary rounded-[60px] items-center overflow-y-auto ">
                  {quizzes.map((quiz) => (
                    <div key={quiz.id} className="flex flex-row w-[80%] h-[10%] items-center justify-between mt-5">
                      <p className="text-sm text-main med:text-xl w-[30%]">{quiz.name}</p>
                      <Button onClick={() => handleOpenEditQuizModal(quiz.id)} label="Edit" primary />
                      {openEditQuizModal && quiz.id === openQuizModalId && (
                        <div
                          className="absolute flex justify-center w-[90vw] h-[60vh] bg-third top-1/2 left-1/2 	transform -translate-x-1/2 -translate-y-1/2 rounded-xl"
                          key={quiz.id}
                        >
                          <div className="w-4/5 mt-7 flex flex-col items-center ">
                            <div className="flex gap-4 items-center">
                              <p className="text-xl font-serif">Edit: {quiz.name}</p>
                              <Input placeholder="Input new quiz name..." primary />
                              <Button primary label="Set new name" />
                            </div>
                            <div>
                              {quizQuestions.map((question) => (
                                <div key={question.id}>
                                  <p>{question.text}</p>
                                  <p>Question type: {question.type}</p>
                                  <p>Question hint: {question.hint}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                      <Button onClick={() => handleDeleteQuiz(quiz.id)} label="Delete" primary />
                      {quiz.active ? (
                        <Button label="Activate" onClick={() => handleIsActiveQuiz(quiz.id, true)} primary></Button>
                      ) : (
                        <Button label="Deactivate" onClick={() => handleIsActiveQuiz(quiz.id, false)} primary></Button>
                      )}
                    </div>
                  ))}
                </div>
                <p></p>
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
                        <button onClick={handleAreYouSureUser}>Change password</button>
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
