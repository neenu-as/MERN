const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");

const Product = require("./models/Product");

const User = require("./models/User");


const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // serve images

// Multer setup for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/productsdb")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));


  
const JWT_SECRET = "your_secret_key"; 

// Create admin if not exists
async function createAdmin() {
  const adminEmail = "admin@gmail.com";
  const adminPassword = "admin@123";

  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  // Upsert: create if not exists, otherwise update password
  await User.findOneAndUpdate(
    { email: adminEmail },
    { name: "Admin", email: adminEmail, password: hashedPassword, role: "admin" },
    { upsert: true }
  );

  console.log("Admin account ensured in DB");
}
createAdmin();









// Create Product
app.post("/api/products", upload.single("image"), async (req, res) => {
  try {
    const newProduct = new Product({
      productName: req.body.productName,
      image: req.file ? `/uploads/${req.file.filename}` : "",
      quantity: req.body.quantity,
      rate: req.body.rate,
      status:req.body.status
    });
    await newProduct.save();
    res.json(newProduct);
  } catch (err) {
  console.error("Error creating product:", err); // ✅ show in backend terminal
  res.status(500).json({ error: err.message });
}
});

// Get All Products
app.get("/api/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Get Product by ID
app.get("/api/products/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
});

// Update Product
app.put("/api/products/:id", upload.single("image"), async (req, res) => {
  try {
    const updatedData = {
      productName: req.body.productName,
      quantity: req.body.quantity,
      rate: req.body.rate,
       date: req.body.date ? new Date(req.body.date) : undefined,
      status:req.body.status
    };
    if (req.file) updatedData.image = `/uploads/${req.file.filename}`;

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete Product
app.delete("/api/products/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted" });
});


// Signup route - only for normal users
app.post("/api/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashedPassword, role: "user" });
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login route
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "1d" });
    res.json({ token, role: user.role, name: user.name });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Protected route example
app.get("/api/protected", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ message: `Hello ${decoded.role}`, user: decoded });
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
});



app.listen(5000, () => console.log("Server running on port 5000"));
