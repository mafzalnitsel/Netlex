// seed user
    // async function saveUser(userData) {
    //   const {
    //     email,
    //     firstName,
    //     lastName,
    //     lawyerid,
    //     roles,
    //     roleID,
    //     itsAdminUser,
    //     itsLawyerUser,
    //   } = userData;

    //   if (!email || !firstName || !lastName || !roleID) {
    //     throw new Error("MissingParameter");
    //   }

    //   const fixedPassword = "123456";

    //   const user = new User({
    //     email,
    //     firstName,
    //     lastName,
    //     userName: email, // userName = email
    //     password: fixedPassword, // plain password — gets encrypted by schema
    //     roles, // must be string, e.g., "Admin"
    //     roleID,
    //     lawyerid,
    //     itsAdminUser,
    //     itsLawyerUser,
    //   });

    //   try {
    //     const savedUser = await user.save();
    //     return savedUser;
    //   } catch (err) {
    //     if (err.code === 11000) {
    //       throw new Error("UserAlreadyExist");
    //     }
    //     throw err;
    //   }
    // }
    // (async () => {
    //   console.log("seeding user ...");
    //   try {
    //     const savedUser = await saveUser({
    //       email: "m.afzal@nitsel.com",
    //       firstName: "Muhammad",
    //       lastName: "Afzal",
    //       lawyerid: "lawyer123",
    //       roles: "Admin",
    //       roleID: "admin-role",
    //       itsAdminUser: true,
    //       itsLawyerUser: false,
    //     });

    //     console.log("User saved:", savedUser);
    //   } catch (err) {
    //     console.error("Error:", err.message);
    //   }
    // })();
    