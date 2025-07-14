import React, { useEffect, useState } from 'react';
import UserSelector from './components/UserSelector';
import ClaimButton from './components/ClaimButton';
import Leaderboard from './components/LeaderBoard';
import History from './components/History';

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [history, setHistory] = useState([]);

  const fetchUsers = async () => {
    const res = await fetch("http://localhost:3000/api/users");
    const data = await res.json();
    setUsers(data);
  };

  const fetchHistory = async () => {
    const res = await fetch("http://localhost:3000/api/claim/history");
    const data = await res.json();
    setHistory(data);
  };

  useEffect(() => {
    fetchUsers();
    fetchHistory();
  }, []);

  const handleClaim = async () => {
    const res = await fetch("http://localhost:3000/api/claim", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: selectedUser }),
    });
    const data = await res.json();
    await fetchUsers();
    await fetchHistory();
    alert(`${data.user.name} received ${data.points} points!`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">🏆 Leaderboard System</h1>
      <div className="max-w-3xl mx-auto bg-white p-4 rounded-xl shadow-md space-y-6">
        <UserSelector
          users={users}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          onUserAdded={fetchUsers}
        />
        <ClaimButton disabled={!selectedUser} onClick={handleClaim} />
        <Leaderboard users={users} />
        <History history={history} />
      </div>
    </div>
  );
}

export default App;
