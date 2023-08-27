import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import fs from 'fs';
import multer from "multer";


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose
  .connect("mongodb+srv://mollahmdsaif:mollahmdsaif@cluster0.mwhzrc9.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.error("Database Connection Error:", err);
  });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // Store uploaded files in the "uploads" folder
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });


// Mongoose Models

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = new mongoose.model("User", userSchema);



// New Mongoose Models for product
const productSchema = new mongoose.Schema({
  productName: String,
  expiryDate: Date,
  quantity: Number,
  category: String,
  cost: Number,
});

const Product = new mongoose.model("product", productSchema);

// const dataSchema = new mongoose.Schema({
//   productName: String,
//   expiryDate: Date,
//   quantity: Number,
//   category: String,
// });
//
// const DataModel = mongoose.model('product', dataSchema);

// Defining routes
//Login API
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email: email })
      .then(user => {
        if (user) {
          if (password === user.password) {
            res.send({ message: "Login Successful", user: user });
          } else {
            res.send({ message: "Password didn't match" });
          }
        } else {
          res.send({ message: "User not registered" });
        }
      })
      .catch(err => {
        console.error(err);
        res.status(500).send({ message: "An error occurred" });
      });
  });
  
  // Register API
  app.post("/register", (req, res) => {
    const { name, email, password } = req.body;
    User.findOne({ email: email })
      .then(user => {
        if (user) {
          res.send({ message: "User already registered" });
        } else {
          const user = new User({
            name,
            email,
            password,
          });
          user.save()
            .then(() => {
              res.send({ message: "Successfully Registered" });
            })
            .catch(err => {
              console.error(err);
              res.status(500).send({ message: "An error occurred while registering" });
            });
        }
      })
      .catch(err => {
        console.error(err);
        res.status(500).send({ message: "An error occurred" });
      });
  });
  // New Routes for product Management
// Update the addProduct route
  app.post('/addProduct', async (req, res) => {
    const { productName, expiryDate, quantity, category, cost } = req.body;

    const product = new Product({
      productName,
      expiryDate,
      quantity,
      category,
      cost,
    });

    try {
      await product.save();
      res.json({ message: 'product added', product: product }); // Respond with JSON
    } catch (error) {
      console.error('Error adding product:', error);
      res.status(500).json({ message: 'An error occurred while adding the product' }); // Respond with JSON
    }
  });


// Get all Products API
app.get('/getProducts', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});
  
// Add this new route for fetching product categories
app.get('/getCategories', async (req, res) => {
  try {
    const categories = await Product.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);
    res.json(categories);
  } catch (err) {
    res.status(500).send(err);
  }
});


// Assuming you have this Mongoose schema for groceries
const grocerySchema = new mongoose.Schema({
  item: String,
});
const Grocery = mongoose.model('Grocery', grocerySchema);

// Add grocery route
app.post('/addGrocery', async (req, res) => {
  const { grocery } = req.body;
  const newGrocery = new Grocery({
    item: grocery
  });

  try {
    await newGrocery.save();
    res.json({ message: 'Grocery added', grocery: grocery });
  } catch (error) {
    console.error('Error adding grocery:', error);
    res.status(500).json({ message: 'An error occurred while adding the grocery' });
  }
});
app.get('/getGroceries', async (req, res) => {
  try {
    const groceries = await Grocery.find({});
    res.json(groceries);
  } catch (err) {
    console.error('Error fetching groceries:', err);
    res.status(500).json({ message: 'An error occurred while fetching groceries' });
  }
});

// New Mongoose Model for Notes
const noteSchema = new mongoose.Schema({
  content: String,
  userId: mongoose.Schema.Types.ObjectId, // assuming each note is associated with a user
});

const Note = mongoose.model('Note', noteSchema);

app.post('/saveNote', async (req, res) => {
  const { content, userId } = req.body;

  const note = new Note({
    content,
    userId,
  });

  try {
    await note.save();
    res.json({ message: 'Note added', note: note });
  } catch (error) {
    console.error('Error adding note:', error);
    res.status(500).json({ message: 'An error occurred while adding the note' });
  }
});

app.get('/getNotes', async (req, res) => {
  try {
    const notes = await Note.find({});
    res.json(notes);
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).json({ message: 'An error occurred while fetching notes' });
  }
});


// Delete grocery
app.delete('/deleteGrocery/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await Grocery.findByIdAndDelete(id);
    res.json({ message: 'Grocery deleted' });
  } catch (error) {
    console.error('Error deleting grocery:', error);
    res.status(500).json({ message: 'An error occurred while deleting the grocery' });
  }
});

// Delete product
app.delete('/deleteProduct/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await Product.findByIdAndDelete(id);
    res.json({ message: 'product deleted' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'An error occurred while deleting the product' });
  }
});




// download json from mongodb
app.get('/download-data', async (req, res) => {
  try {
    const items = await Product.find();

    const filePath = 'downloaded-data.json';
    fs.writeFileSync(filePath, JSON.stringify(items, null, 2));

    res.download(filePath, 'downloaded-data.json', (err) => {
      if (err) {
        res.status(500).json({ error: 'An error occurred while downloading data' });
      }
      fs.unlinkSync(filePath);
    });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.post('/api/upload', upload.single('jsonFile'), async (req, res) => {
  try {
    const filePath = req.file.path;
    const fileData = fs.readFileSync(filePath, 'utf-8');
    const jsonData = JSON.parse(fileData);

    const result = await Product.create(jsonData);
    res.json({ message: 'JSON file uploaded and data saved', data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error uploading JSON file', error: error.message });
  }
});


app.get('/api/items', async (req, res) => {
  try {
    const items = await Product.find();
    res.json(items);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ error: 'An error occurred while fetching items.' });
  }
});


app.listen(9002, () => {
  console.log("BE started at port 9002");
});
