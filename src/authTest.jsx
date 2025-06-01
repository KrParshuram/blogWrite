import React, { useEffect } from "react";
import authService from "./appwrite/auth.js";  // adjust the path accordingly

function AuthTest() {
  
  useEffect(() => {
    const testAuth = async () => {
      try {
        // Test create account and auto-login
        // Uncomment this if you want to create a new user
       
        // const newUser = await authService.createAccount({
        //   email: "test@example.com",
        //   password: "password123",
        //   name: "Test User"
        // });
        // console.log("New user created & logged in:", newUser);
        

        // Test login
        // try {
        // const session = await authService.login({
        //     email: "test@example.com",
        //     password: "password123"
        // });
        // console.log("User logged in:", session);
        // } catch (err) {
        // console.error("Login failed:", err);
        // }

        // Test get current user
        const user = await authService.getCurrentUser();
        console.log("Current user:", user);

        // Optionally test logout
        await authService.logout();
        console.log("Logged out");

      } catch (err) {
        console.error("Auth test error:", err);
      }
    };

    testAuth();
  }, []);

  return <div>Check console for auth test results</div>;
}

export default AuthTest;
export { AuthTest };  // Named export for use in other components
