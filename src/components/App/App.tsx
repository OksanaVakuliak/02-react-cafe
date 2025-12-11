import { useState } from 'react';
import type { Votes, VoteType } from '../../types/votes';
import css from './App.module.css';
import CafeInfo from '../CafeInfo/CafeInfo';
import VoteOptions from '../VoteOptions/VoteOptions';
import VoteStats from '../VoteStats/VoteStats';
import Notification from '../Notification/Notification';

const getTotalVotes = (votes: Votes): number =>
  votes.good + votes.neutral + votes.bad;

const getPositiveRate = (votes: Votes): number => {
  const total = getTotalVotes(votes);
  return total === 0 ? 0 : Math.round((votes.good / total) * 100);
};

const App = () => {
  const [votes, setVotes] = useState<Votes>({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const handleVote = (type: VoteType): void => {
    setVotes(prevVotes => ({
      ...prevVotes,
      [type]: prevVotes[type] + 1,
    }));
  };

  const resetVotes = (): void => {
    setVotes({
      good: 0,
      neutral: 0,
      bad: 0,
    });
  };

  return (
    <div className={css.app}>
      <CafeInfo />
      <VoteOptions
        onVote={handleVote}
        onReset={resetVotes}
        canReset={getTotalVotes(votes) > 0}
      />
      {getTotalVotes(votes) > 0 ? (
        <VoteStats
          votes={votes}
          totalVotes={getTotalVotes(votes)}
          positiveRate={getPositiveRate(votes)}
        />
      ) : (
        <Notification />
      )}
    </div>
  );
};

export default App;
