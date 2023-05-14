import React, { useState, useContext, useEffect } from "react";
import Navbar from "../components/ReusableComponents/Navbar";
import Input from "../components/ReusableComponents/Input";
import Button from "../components/ReusableComponents/Button";
import { appContext } from "../context/AppProvider";
import UserPreQuiz from "./Quiz";
import { getQuizzes as initialGetQuizzes } from "../service/getQuizzes";
import { getUsers as initialGetUsers } from "../service/getUser";
import { getPostUser } from "../service/getPostUser";
import { User } from "../models/User";
import { Quiz } from "../models/Quiz";
import BoardSelection from "../components/AdminPage/BoardSelection";
import UsersAddAndSearch from "../components/AdminPage/UsersAddAndSearch";
import AddUserModal from "../components/AdminPage/Modals/AddUserModal";
import { Question } from "../models/Question";
import { getQuestions } from "../service/getQuestions";
import CreateQuizModal from "../components/AdminPage/Modals/CreateQuizModal";
import QuizLayout from "../components/AdminPage/QuizLayout";
import EditBoard from "../components/AdminPage/EditBoard";

const Admin = ({ admin }: any) => {
  const [activeBoard, setActiveBoard] = useState("Create");
  const [quizzes, setQuizzes] = useState<Quiz[] | []>([]);
  const [users, setUsers] = useState<User[] | []>([]);
  const [selectedUserId] = useState<string | null>(null);
  const [searchQuizValue, setSearchQuizValue] = useState("");
  const [openAddUserModal, setOpenAddUserModal] = useState(false);
  const [addPassword, setAddPassword] = useState("");
  const [addUsername, setAddUsername] = useState("");
  const [searchUserValue, setSearchUserValue] = useState("");
  const [openQuizModalId] = useState("");
  const [quizQuestions, setQuizQuestions] = useState<Question[] | null>();
  const [createQuizModal, setCreateQuizModal] = useState(false);
  const [questionTypeDropdown, setQuestionTypeDropdown] = useState(false);
  const [selectedQuestionType] = useState("");
  const [answersDropdown, setAnswersDropdown] = useState(false);
  const [selectedNumberOfAnswers] = useState("");
  const [areYouSure, setAreYouSure] = useState(false);
  const [isNewUserAdmin, setIsNewUserAdmin] = useState(false);

  const { cardData, handleSelectQuiz = () => {}, selectedCard } = useContext(appContext);

  const handleQuizSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuizValue(event.target.value);
  };

  const handleUserSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchUserValue(event.target.value);
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

  // * Open add user modal
  const handleOpenAddUserModal = () => {
    setOpenAddUserModal(!openAddUserModal);
  };

  // * Adding user

  const handleAddUser = () => {
    const newUser = {
      username: addUsername,
      password: addPassword,
      admin: isNewUserAdmin,
    };
    getPostUser(newUser).then((response) => {
      if (response.success) {
        const updatedUsers = [...users, newUser];
        setUsers(updatedUsers);
        setAreYouSure(!areYouSure);
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

  const handleAddUserModal = (isOpen: boolean) => {
    setOpenAddUserModal(isOpen);
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
                  <Button label="Create quiz" secondary onClick={() => setCreateQuizModal(!createQuizModal)} />
                  <Input value={searchQuizValue} onChange={handleQuizSearchInputChange} placeholder="Search quiz.." primary />
                  {createQuizModal && (
                    <CreateQuizModal
                      answersDropdown={answersDropdown}
                      questionTypeDropdown={questionTypeDropdown}
                      selectedNumberOfAnswers={selectedNumberOfAnswers}
                      selectedQuestionType={selectedQuestionType}
                      setAnswersDropdown={setAnswersDropdown}
                      setQuestionTypeDropdown={setQuestionTypeDropdown}
                      setCreateQuizModal={setCreateQuizModal}
                      createQuizModal={createQuizModal}
                    />
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
                  setOpenAddUserModal={(state: boolean) => handleAddUserModal(state)}
                  areYouSure={areYouSure}
                  setAreYouSure={setAreYouSure}
                  setIsNewUserAdmin={setIsNewUserAdmin}
                />
              )}
            </div>
            {activeBoard === "Create" && (
              <div className="w-screen h-[50vh] flex justify-center items-center mt-3 ">
                <div className="w-[80vw] h-[100%] flex-col flex bg-secondary rounded-[60px] items-center overflow-y-auto ">
                  {quizzes.map((quiz) => (
                    <QuizLayout
                      active={quiz.active}
                      id={quiz.id}
                      name={quiz.name}
                      quizQuestions={quizQuestions}
                      quizzes={quizzes}
                      setQuizQuestions={setQuizQuestions}
                      setQuizzes={setQuizzes}
                      key={quiz.id}
                    />
                  ))}
                </div>
                <p></p>
              </div>
            )}
            {activeBoard === "Edit" && <EditBoard setUsers={setUsers} users={users} />}
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
                      <span className="text-2xl font-bold">{card.name}</span>
                      <p className="text-sm font-thin">{card.description}</p>
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
