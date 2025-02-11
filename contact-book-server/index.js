require('dotenv').config(); // Load environment variables

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');


const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error(" MongoDB URI is not defined. Check your .env file.");
    process.exit(1);
}

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("MongoDB Connection Error:", err));

// Contact Schema
const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: { type: String },
    createdAt: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', contactSchema);

// Routes
app.get('/contacts', async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

app.get('/contacts/:id', async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) return res.status(404).json({ error: "Contact not found" });
        res.json(contact);
    } catch (err) {
        res.status(400).json({ error: "Invalid contact ID" });
    }
});

app.post('/contacts', async (req, res) => {
    try {
        const { name, email, phone, address } = req.body;
        if (!name || !email || !phone) {
            return res.status(400).json({ error: "Name, Email, and Phone are required" });
        }
        const newContact = new Contact({ name, email, phone, address });
        await newContact.save();
        res.status(201).json(newContact);
    } catch (err) {
        res.status(400).json({ error: "Failed to create contact" });
    }
});

app.put('/contacts/:id', async (req, res) => {
    try {
        const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedContact) return res.status(404).json({ error: "Contact not found" });
        res.json(updatedContact);
    } catch (err) {
        res.status(400).json({ error: "Failed to update contact" });
    }
});

app.delete('/contacts/:id', async (req, res) => {
    try {
        const deletedContact = await Contact.findByIdAndDelete(req.params.id);
        if (!deletedContact) return res.status(404).json({ error: "Contact not found" });
        res.json({ message: "Contact deleted successfully" });
    } catch (err) {
        res.status(400).json({ error: "Failed to delete contact" });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
