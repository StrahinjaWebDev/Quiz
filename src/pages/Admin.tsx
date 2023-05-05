import React, { useState, useContext, useEffect } from "react";
import Navbar from "../components/Navbar";
import Input from "../components/Input";
import Button from "../components/Button";
import { appContext } from "../context/AppProvider";
import UserPreQuiz from "./Quiz";
import { getQuizzes } from "../service/getQuizzes";
import { getUsers } from "../service/getUser";
import { deleteUser } from "../service/deleteUser";
import { putUser } from "../service/putUser";
import { v4 as uuidv4 } from "uuid";

const Admin = ({ admin }: any) => {
  const [activeBoard, setActiveBoard] = useState("Create");
  const [labelText, setLabelText] = useState("Active");
  const [active, setActive] = useState(false);
  const [quizz, setQuizz] = useState([]);
  const [user, setUser] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [openUserEditModal, setOpenUserEditModal] = useState(false);
  const [password, setPassword] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [openAddUserModal, setOpenAddUserModal] = useState(false);
  const [addPassword, setAddPassword] = useState("");
  const [addUsername, setAddUsername] = useState("");

  const { cardData, quizes, handleSelectQuiz = () => {}, selectedCard } = useContext(appContext);

  

  //! 404 when adding !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  const handleAddUser = () => {
    const newUser = {
      id: uuidv4(),
      username: addUsername,
      password: addPassword,
      admin: false,
    };
    console.log(newUser);

    putUser(newUser.id, newUser).then((response) => {
      if (response.success) {
        const updatedUsers = [...user, newUser];
        setUser(updatedUsers);
        console.log(updatedUsers);
      } else {
        alert(response.error);
      }
    });
  };

  const handleAddUsernameChange = (event) => {
    setAddUsername(event.target.value);
  };

  const handleAddPasswordChange = (event) => {
    setAddPassword(event.target.value);
  };

  const handleOpenAddUserModal = () => {
    setOpenAddUserModal(!openAddUserModal);
  };

  const handleSearchInputChange = (event) => {
    const searchQuery = event.target.value.toLowerCase();
    if (searchQuery === "") {
      setFilteredUsers(user);
    } else {
      const filteredUsers = user.filter((user) => user.username.toLowerCase().includes(searchQuery));
      setFilteredUsers(filteredUsers);
      setSearchValue(searchQuery);
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  console.log(user);

  const handleEditPassword = () => {
    const userToUpdatePassword = { ...user.find((u) => u.id === selectedUserId), password: password };
    console.log(userToUpdatePassword);
    putUser(selectedUserId, userToUpdatePassword).then((response) => {
      if (response.success) {
        const updatedUser = user.map((user) => (user.id === selectedUserId ? { ...user, password } : user));
        setUser(updatedUser);
        console.log(updatedUser);
      } else {
        alert(response.error);
      }
    });
  };

  const handleOpenEditUserEditModal = (userId) => {
    setSelectedUserId(userId);
    setOpenUserEditModal(true);
  };

  const handleDeleteUser = async (userId) => {
    await deleteUser(userId);
    const updatedUserList = user.filter((u) => u.id !== userId);
    setUser(updatedUserList);
  };

  const handleActivateClick = () => {
    setActive(!active);
    if (active === false) {
      setLabelText("Deactive");
    } else {
      setLabelText("Active");
    }
  };

  const users = async () => {
    const user = await getUsers();
    setUser(user.data);
  };

  const quiz = async () => {
    const quiz = await getQuizzes();
    setQuizz(quiz.data);
  };

  useEffect(() => {
    quiz?.();
  }, []);

  useEffect(() => {
    users?.();
  }, []);

  // console.log(quizz);
  // console.log(user);

  return (
    <>
      {admin === true && <Navbar showMailIcon={false} />}
      {admin === true && (
        <div className="w-screen min-h-[70vh] justify-center items-center mt-1">
          <div className="flex justify-evenly items-center desktop:mb-12">
            <button
              className="text-white  bg-secondary  hover:opacity-90 text-sm tablet:text-xl py-2 px-2 desktop:w-[7em]  rounded-[60px]"
              style={{ color: activeBoard === "Create" ? "#155263" : "white" }}
              onClick={() => setActiveBoard("Create")}
            >
              Create quiz
            </button>
            <button
              style={{ color: activeBoard === "Edit" ? "#155263" : "white" }}
              className="text-white  bg-secondary  hover:opacity-90 text-sm tablet:text-xl py-2 px-2 desktop:w-[7em]  rounded-[60px]"
              onClick={() => setActiveBoard("Edit")}
            >
              Edit Users
            </button>
          </div>
          <div className="flex mt-12 tablet:mt-0 gap-3 items-center desktop:ml-[10em]">
            {activeBoard === "Create" && (
              <div>
                <Button label="Create quiz" secondary /> <Input placeholder="Search quiz.." primary />
              </div>
            )}
            {activeBoard === "Edit" && (
              <div>
                <Button onClick={handleOpenAddUserModal} label="Add users" secondary />
                <Input placeholder="Search users.." value={searchValue} onChange={handleSearchInputChange} primary />
              </div>
            )}
            {openAddUserModal && (
              <div className="ml-[5em] absolute bg-main h-[30vh] w-[55vw] flex flex-col rounded-xl items-center gap-5 text-secondary border-white border-2">
                <p className="font-semibold">Add User {user.find((u) => u.id === selectedUserId)?.username}</p>
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
                {quizz.map((quiz) => (
                  <div key={quiz.id} className="flex flex-row w-[80%] h-[10%] items-center justify-between mt-5">
                    <p className="text-sm text-main med:text-xl w-[30%]">{quiz.name}</p>
                    <Button label="Edit" primary />
                    <Button label="Delete" primary />
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
                    <p className="font-semibold">Name: {user.find((u) => u.id === selectedUserId)?.username}</p>
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
      )}
      {admin === false && <Navbar showMailIcon={true} />}
      {admin === false && (
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
            <UserPreQuiz
              label={selectedCard.label}
              images={selectedCard.images}
              imgAlt={selectedCard.imgAlt}
              quizMainText={selectedCard.quizMainText}
              quizDescription={selectedCard.quizDescription}
              selectedCard={selectedCard}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Admin;
