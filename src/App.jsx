import { useState, Suspense, lazy } from "react";
import Header from "./pages/Header/Header";
import Preloader from "./components/Preloader/Preloader";

const AssignmentSection = lazy(() => import("./components/AssignmentSection/AssignmentSection"));
const UserList = lazy(() => import("./components/UserList/UserList"));
const RegistrationForm = lazy(() => import("./components/RegistrationForm/RegistrationForm"));

const App = () => {
  const [refreshFlag, setRefreshFlag] = useState(false);

  const handleRegistrationSuccess = () => {
    setRefreshFlag((prev) => !prev);
  };

  return (
    <div>
      <Header />

      <Suspense fallback={<Preloader />}>
        <AssignmentSection />
      </Suspense>

      <Suspense fallback={<Preloader />}>
        <UserList refresh={refreshFlag} />
      </Suspense>

      <Suspense fallback={<Preloader />}>
        <RegistrationForm onSuccess={handleRegistrationSuccess} />
      </Suspense>
    </div>
  );
};

export default App;
