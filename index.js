const express = require("express");
const app = express();
const path = require("path");

const users = [
  { username: "user1", password: "password1" },
  { username: "user2", password: "password2" },
];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/static", express.static(path.join(__dirname, "public")));

app.post("/login", (request, response) => {
  const { username, password } = request.body;
  
  const user = users.find(
    (singleUser) =>
      singleUser.username === username && singleUser.password === password
  );

  if (user) {
    // Authentication successful
    response.status(200).json({ message: "Authentication successful" });
  } else {
    // Authentication failed
    response.status(401).json({ message: "Authentication failed" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
