import "./App.scss";
import { useState } from "react";
import LoginRegisterForm from "./components/LoginRegisterContainer/LoginRegisterContainer";
import AdminCustomerContainer from "./components/AdminCustomerContainer/AdminCustomerContainer";
import Profile from "./pages/Profile";
import AdminPanel from "./pages/AdminPanel";
import OutstandingRequestsPage from "./pages/OutstandingRequestsPage";
import LandingPage from "./pages/LandingPage";

function App() {
  let [isUserAuthenticated, setUserAuthorization] = useState(
    sessionStorage.getItem("isUserAuthenticated") === "true" || false
  );
  let [isAdmin, setAdmin] = useState(
    sessionStorage.getItem("isAdmin") === "true" || false
  );
  let [customerId, setCustomerId] = useState(
    sessionStorage.getItem("customerId") || undefined
  );

  const setUserAuthenticatedStatus = (isAdmin, customerId) => {
    setUserAuthorization(true);
    setAdmin(isAdmin);
    setCustomerId(customerId);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("isUserAuthenticated");
    sessionStorage.removeItem("isAdmin");
    sessionStorage.removeItem("customerId");
    sessionStorage.removeItem("jwt_token");
    sessionStorage.removeItem("jwt_refresh_token");
    setUserAuthorization(false);
    setAdmin(false);
    setCustomerId(undefined);
    window.location.href = "/"; // Redirect to Home page
  };

  const renderPage = () => {
    const path = window.location.pathname;

    // If user is not authenticated, show login/register form
     if (!isUserAuthenticated) {
      return (
         <LoginRegisterForm
           setUserAuthenticatedStatus={setUserAuthenticatedStatus}
         />
      );
     }

    // Render pages based on pathname
    switch (path) {
      case "/profile":
        return <Profile customerId={customerId} />;

      case "/outstanding":
        return <OutstandingRequestsPage />

      case "/Landing":
        return <LandingPage />;

      case "/admin":
        return isAdmin ? (
          <AdminPanel />
        ) : (
          <h2>Access Denied: Admins Only</h2>
        );

      case "/":
      default:
        return (
          <AdminCustomerContainer
            isAdmin={isAdmin}
            customerId={customerId}
          />
        );
    }
  };

  return (
    <div>
      {/* Navigation Bar */}
      <nav className="navbar">
        <h1>Carbon Credit App</h1>
        {isUserAuthenticated && (
          <ul className="nav-links">
            <li>
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = "/";
                }}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/profile"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = "/profile";
                }}
              >
                Profile
              </a>
            </li>
            {isAdmin && (
              <li>
                <a
                  href="/admin"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = "/admin";
                  }}
                >
                  Admin Panel
                </a>
              </li>
            )}
            <li>
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            </li>
          </ul>
        )}
      </nav>

      {/* Main Content */}
      <div>{renderPage()}</div>
    </div>
  );
}

export default App;
