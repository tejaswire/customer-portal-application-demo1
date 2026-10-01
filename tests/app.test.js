const request = require("supertest");
const app = require("../app");

describe("Customer Portal API", () => {

    test("Health endpoint should return UP", async () => {

        const response = await request(app)
            .get("/health");

        expect(response.statusCode).toBe(200);
        expect(response.body.status).toBe("UP");
    });

    test("Get customers should return customer list", async () => {

        const response = await request(app)
            .get("/customers");

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test("Register customer should return 201", async () => {

        const response = await request(app)
            .post("/customers")
            .send({
                name: "Test Customer",
                email: "test@example.com"
            });

        expect(response.statusCode).toBe(201);
        expect(response.body.name).toBe("Test Customer");
    });

});