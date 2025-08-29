import { useEffect, useState } from "react";
import UserCard from "../UserCard/UserCard";
import "./UserList.scss";
import { getUsers } from '../../api/api';
import Preloader from "../Preloader/Preloader";

const UserList = ({ refresh }) => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // GET USERS FROM API
  const fetchUsersData = async (pageNumber) => {
    try {
      setLoading(true);
      const count = 6;
      const data = await getUsers(pageNumber, count);

      // SORT USER BY by REGISTRATION DATE (THE NEWEST FIRST).
      const sortedUsers = data.users.sort(
        (a, b) =>
          new Date(b.registration_timestamp * 1000) -
          new Date(a.registration_timestamp * 1000)
      );

      // SET FIRST 6 USERS
      if (pageNumber === 1) {
        setUsers(sortedUsers);
      } else {
        // ADD NEXT 6 OR REST USERS WHEN SHOW MORE BUTTON CLICKED
        setUsers((prev) => [...prev, ...sortedUsers]);
      }
      // SET TOTAL PAGES FROM API DATA TOTAL_PAGES
      setTotalPages(data.total_pages);
    } catch (err) {
      console.error("Error loading users:", err);
    } finally {
      setLoading(false);
    }
  };

  // GET FIRST 6 USERS AND GET NEXT IF PAGE WAS CHANGED
  useEffect(() => {
    fetchUsersData(page);
  }, [page]);

  // RECEIVE FLAG FROM APP IF IN REGISTER USER COMPONENT POST QUERY SUCCESSFULLY DONE
  // REFRESH PAGE IF FLAG WAS CHANGED
  useEffect(() => {
    if (refresh) {
      setUsers([]);
      setPage(1);
      fetchUsersData(1);
    }
  }, [refresh]);

  // GET NEXT 6 OR REST USERS ON SHOW MORE CLICK
  const handleShowMore = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  return (
    <section className="users">
      <h1>Working with GET request</h1>
      <div className="users-grid">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>

      {/* IF TOTAL PAGES === PAGE HIDE SHOW MORE BUTTON */}
      {page < totalPages && (
        <button onClick={handleShowMore} disabled={loading}>
          {loading ? <Preloader /> : "Show more"}
        </button>
      )}
    </section>
  );
};

export default UserList;
