import React, { useContext, useEffect, useState } from "react";
import { appContext } from "../context/AppProvider";
import { getScoreboards } from "../service/getScoreboards";
import { Scoreboard } from "../models/Scoreboard";
import Input from "../components/ReusableComponents/Input";
import Button from "../components/ReusableComponents/Button";

interface Props {
  score: number;
}
const End = ({ score }: Props) => {
  const [scoreboard, setScoreboard] = useState<Scoreboard[] | []>([]);

  const { user, selectedCard } = useContext(appContext);

  const getScoreboard = async () => {
    const scoreboards = await getScoreboards(selectedCard.id);
    setScoreboard(scoreboards.data);
  };

  useEffect(() => {
    getScoreboard();
  }, []);

  return (
    <div className="flex flex-row gap-[10em]">
      <div className="w-[25em] h-[27em] bg-secondary rounded-[60px] gap-3 flex justify-center">
        <div className="w-5/6 h-5/6 flex flex-col justify-around items-center">
          <span className="text-4xl text-main font-semibold mt-3">Nice</span>
          <p>
            {user?.username} you’ve scored {score} of right answers on this quiz! Go on, call your friend to play with you and see who’s
            better!
          </p>
          <Input primary placeholder="Enter friends username..." />
          <div className="flex flex-row">
            <Button primary label="Invite" />
            <Button secondary label="Back to quizzes" />
          </div>
        </div>
      </div>
      <div className="w-[20em] h-[40em] bg-secondary rounded-[20px] flex flex-col items-center">
        <h1 className="text-main text-3xl mt-12 border-b-main  border-b-2 border-secondary">Scoreboard</h1>
        <div className="flex flex-col mt-7 w-[80%] gap-2">
          {scoreboard.map((score) => (
            <div key={score.userId} className="flex flex-row w-[80%] justify-between text-main text-base font-semibold ">
              <span> {score.username}</span>
              <p> {score.score}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default End;
