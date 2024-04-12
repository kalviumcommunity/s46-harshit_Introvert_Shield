const express = require("express");
const router = express.Router();
const { Introvert, User } = require("./schema");
const bcrypt = require("bcrypt");
const { userJoiSchema, introvertJoiSchema } = require("./joiSchema");
const jwt = require("jsonwebtoken");

router.use(express.json());

const createToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: 1 * 24 * 60 * 60,
  });
};

const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).send({ message: "Unauthorized: No token provided" });
  }
  const authToken = token.split("Bearer ")[1];
  try {
    const decoded = jwt.verify(authToken, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).send({ message: "Forbidden: Invalid token" });
  }
};
// Read all users
router.get("/users", authenticate, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Read all Introverts
router.get("/introverts", authenticate, async (req, res) => {
  try {
    const introverts = await Introvert.find();
    res.json(introverts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new user
router.post("/users", async (req, res) => {
  try {
    const { error } = userJoiSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    } else {
      const usernameExists = await User.findOne({
        username: req.body.username,
      });
      if (usernameExists) {
        return res.status(409).json({ message: "Username already exists" });
      }
      const emailExists = await User.findOne({ email: req.body.email });
      if (emailExists) {
        return res.status(409).json({ message: "Email already exists" });
      }

      const hashedPassword = await bcrypt.hash(req.body.password, 12);

      const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      });
      const newUser = await user.save();
      const token = createToken({
        userId: newUser._id,
        username: newUser.username,
      });

      res.status(201).json(token);
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Create a new Introvert
router.post("/introverts", authenticate, async (req, res) => {
  const { error } = introvertJoiSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const introvert = new Introvert({
    Place_Type: req.body.Place_Type,
    Crowd_Density: req.body.Crowd_Density,
    Seating_Comfort: req.body.Seating_Comfort,
    WiFi_Availability: req.body.WiFi_Availability,
    Image_Link: req.body.Image_Link,
    Posted_By: req.body.Posted_By
  });

  try {
    const newIntrovert = await introvert.save();
    res.status(201).json(newIntrovert);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = createToken({
      userId: user._id,
      username: user.username,
    });

    res.status(200).json(token);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update a user
router.patch("/users/:id", authenticate, async (req, res) => {
  try {
    const { error } = userJoiSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a Introvert
router.patch("/introverts/:id", authenticate, async (req, res) => {
  try {
    const { error } = introvertJoiSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const introvert = await Introvert.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!introvert) {
      return res.status(404).json({ message: "Introvert not found" });
    }
    res.json(introvert);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get Users by ID
router.get("/users/:id", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get introvert by ID
router.get("/introverts/:id", authenticate, async (req, res) => {
  try {
    const introvert = await Introvert.findById(req.params.id);
    if (!introvert) {
      return res.status(404).json({ message: "Introvert not found" });
    }
    res.json(introvert);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a user
router.delete("/users/:id", authenticate, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a Introvert
router.delete("/introverts/:id", authenticate, async (req, res) => {
  try {
    const deletedIntrovert = await Introvert.findByIdAndDelete(req.params.id);
    if (!deletedIntrovert) {
      return res.status(404).json({ message: "Introvert not found" });
    }
    res.json({ message: "Introvert deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
