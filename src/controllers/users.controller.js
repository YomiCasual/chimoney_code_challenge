const getId = () => new Date().toISOString();

let data = [
  {
    id: getId(),
    name: "Abiodun",
    email: "yomionisade@gmail.com",
    age: 23,
  },
  {
    id: getId(),
    name: "Tayo",
    email: "tayo@gmail.com",
    age: 25,
  },
];

const getAllUsers = (req, res) => {
  try {
    return res.status(200).json({ data, message: "User fetched successfully" });
  } catch (e) {
    return res.status(500).json({
      messag: "Cannot fetch users",
      data: null,
    });
  }
};

const updateOrAddUser = (req, res) => {
  try {
    const { name, email, age } = req.body;

    let user = data.filter((user) => user.email === email)[0];

    if (user) {
      const newUser = {
        email: user.email,
        name: name || user.name,
        age: age || user.age,
      };

      const newData = [...data.filter((user) => user.email !== email), newUser];
      data = newData;

      return res.status(201).json({
        message: "User updated successfully",
        data: newUser,
      });
    }

    const newUser = {
      id: getId(),
      name,
      email,
      age,
    };
    data.push(newUser);
    res.status(201).json({
      message: "User added successfully",
      data: newUser,
    });
  } catch (e) {
    return res.status(500).json({
      message: "Cannot add/update user",
      data: null,
    });
  }
};

module.exports = { getAllUsers, updateOrAddUser };
