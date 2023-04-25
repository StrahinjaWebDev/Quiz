import React, { useEffect } from "react";
import axios from "axios";
import { error } from "console";

const useFetch = () => {
  const [users, setUsers] = useState("");

  //   const getUsers = () => {
  //     axios.get('https://quizzywebapi.azurewebsites.net/api/Users')
  //     .then(res => {
  //       console.log(res.data)
  //     })
  //     .catch(err => {
  //       console.error(err)
  //     })
  //   }

  //  useEffect(() => {
  //    getUsers()
  //  }, [])

  return <div>useFetch</div>;
};

export default useFetch;
