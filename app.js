const express = require("express");

const app = express();

app.use(express.json());

let customers = [
    {
        id: 1,
        name: "Tejaswi",
        email: "tejaswi@example.com"
    },
    {
        id: 2,
        name: "Rahul",
        email: "rahul@example.com"
    }
];

// Health endpoint
app.get("/health", (req, res) => {
    res.status(200).json({
        status: "UP"
    });
});

// Get all customers
app.get("/customers", (req, res) => {
    res.status(200).json(customers);
});

// Get customer by ID
app.get("/customers/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const customer = customers.find(c => c.id === id);

    if (!customer) {
        return res.status(404).json({
            message: "Customer not found"
        });
    }

    res.status(200).json(customer);
});

// Register customer
app.post("/customers", (req, res) => {

    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({
            message: "Name and email are required"
        });
    }

    const newCustomer = {
        id: customers.length + 1,
        name: name,
        email: email
    };

    customers.push(newCustomer);

    res.status(201).json(newCustomer);
});

module.exports = app;