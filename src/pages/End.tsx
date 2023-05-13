import React, { useContext, useEffect, useState } from "react";
import { appContext } from "../context/AppProvider";
import { getScoreboards } from "../service/getScoreboards";
import { Scoreboard } from "../models/Scoreboard";

const End = () => {
  const [scoreboard, setScoreboard] = useState<Scoreboard[] | []>([]);

  const { user } = useContext(appContext);

  const getScoreboard = async () => {
    const scoreboards = await getScoreboards(user.id);
    setScoreboard(scoreboards);
  };

  console.log(user?.id);

  useEffect(() => {
    getScoreboard();
  }, []);

  console.log(scoreboard);

  return (
    <div className="flex flex-row gap-[10em]">
      <div className="w-[20em] h-[25em] bg-secondary rounded-[60px]"></div>
      <div className="w-[20em] h-[40em] bg-secondary rounded-[20px] flex flex-col items-center">
        <h1 className="text-main text-3xl mt-12 border-b-main  border-b-2 border-secondary">Scoreboard</h1>
        <div className="flex flex-col"></div>
      </div>
    </div>
  );
};

export default End;
