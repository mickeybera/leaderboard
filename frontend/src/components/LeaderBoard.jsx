import { useState } from 'react';

const Leaderboard = ({ users }) => {
  const [open, setOpen] = useState(true);

  return (
    <div className="border rounded p-4 bg-white">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left text-lg font-semibold mb-2"
      >
         Leaderboard {open ? '▲' : '▼'}
      </button>

      {open && (
        <ul className="divide-y">
          {users
            .sort((a, b) => b.totalPoints - a.totalPoints)
            .map((user, index) => (
              <li key={user._id} className="flex justify-between py-2">
                <span>#{index + 1} - {user.name}</span>
                <span className="font-bold">{user.totalPoints} pts</span>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default Leaderboard;
