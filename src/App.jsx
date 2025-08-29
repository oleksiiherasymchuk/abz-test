import { useState } from "react";
import AssignmentSection from "./components/AssignmentSection/AssignmentSection";
import RegistrationForm from "./components/RegistrationForm/RegistrationForm";
import UserList from "./components/UserList/UserList";
import Header from "./pages/Header/Header";

const App = () => {
  const [refreshFlag, setRefreshFlag] = useState(false);

  const handleRegistrationSuccess = () => {
    setRefreshFlag((prev) => !prev);
  };

  return (
    <div>
      <Header />
      <AssignmentSection />
      <UserList refresh={refreshFlag} />
      <RegistrationForm onSuccess={handleRegistrationSuccess} />
    </div>
  );
};

export default App;
