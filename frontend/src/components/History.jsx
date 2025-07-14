import { useState } from 'react';

const History = ({ history }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border rounded p-4 bg-white">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left text-lg font-semibold mb-2"
      >
         Claim History {open ? '▲' : '▼'}
      </button>

      {open && (
        <ul className="text-sm max-h-60 overflow-y-auto divide-y">
          {history.map((entry) => (
            <li key={entry._id} className="py-2">
              <span className="font-medium">{entry.userName}</span> claimed{" "}
              <span className="font-bold">{entry.pointsClaimed} pts</span> at{" "}
              {new Date(entry.claimedAt).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default History;
