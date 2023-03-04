const request = require("supertest")
const mongoose = require("mongoose")

const { app } = require("../../src/server")
const { registerUser } = require("../controllers/users/userControllers")


const PORT = 9004;

let api = request(`http://localhost:${PORT}`)
let server;


beforeAll(() => {
    return new Promise(async (resolve) => {
        // Create a new database for every test run, so it is always a fresh instance.
        // This is to prevent tests from interfering with each other.
        // NOTE: This is not a good solution for a production environment, as it will fill up
        // the database with old test data.
        await mongoose.connect(`mongodb://localhost:27017/test-${Date.now()}`)
        server = app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
            mongoose.set("strictQuery", true);
            resolve();
        });
    })
})

afterAll( async () => {
    await mongoose.connection.close()
    server.close()
})

describe("Test the backend api", () => {
    let userToken = '';

    describe('User signup and login', () => {
        const name = 'test user';
        const password = 'password';
        const email = 'test@gmail.com';

        it('Should register a user', async () => {
            const response = await api.post("/login/register").send({
                name: name,
                email: email,
                dob: "2020-09-09",
                password: password,
            })

            expect(response.statusCode).toBe(200)
        })

        it('Should login a user', async () => {
            const response = await api.post("/login").send({
                email: email,
                password: password,
            })

            expect(response.statusCode).toBe(200)

            userToken = response.body.token
        })
    })
    describe('Support bookings', () => {
        it('Should list bookings', async () => {
            const response = await api.get("/bookings").set("Authorization", `Bearer ${userToken}`)

            expect(response.statusCode).toBe(200)

            expect(response.body.bookings.length === 0).toBe(true)
        })

        it('Should support the booking lifecycle', async () => {
            const response = await api.post("/bookings").set("Authorization", `Bearer ${userToken}`).send({
                first_name: "Testing",
                last_name: "tester",
                email: "test@testing.com",
                dob: "2000-09-09",
                phone_number: "0411123123",
                description: "does this test work or does this test not work",
                deposit: "150",
                artist_name: "testing artist",

            })
            expect(response.statusCode).toBe(200)
            expect(response.body.message).toBe("Booking has been successfully created, thanks!")
            const booking = response.body.booking
            const deleteResponse = await api.delete(`/bookings/${booking._id}`).set("Authorization", `Bearer ${userToken}`)
            expect(deleteResponse.statusCode).toBe(200)
            expect(deleteResponse.body.message).toBe("Booking successfully deleted")

        })
        it("should deny bookings of users under 18", async () => {
            const response = await api.post("/bookings").set("Authorization", `Bearer ${userToken}`).send({
                first_name: "Testing",
                last_name: "tester",
                email: "test@testing.com",
                dob: "2020-09-09",
                phone_number: "0411123123",
                description: "does this test work or does this test not work",
                deposit: "150",
                artist_name: "testing artist",
            })
            expect(response.statusCode).toBe(400)
            expect(response.body.error).toBe("You must be 18 years or older to book an appointment")
        })
        it("should deny bookings of users that dont have an @ in their email", async () => {
            const response = await api.post("/bookings").set("Authorization", `Bearer ${userToken}`).send({
                first_name: "Testing",
                last_name: "tester",
                email: "testtesting.com",
                dob: "2000-09-09",
                phone_number: "0411123123",
                description: "does this test work or does this test not work",
                deposit: "150",
                artist_name: "testing artist",
            })
            expect(response.statusCode).toBe(400)
            expect(response.body.error).toBe("Booking validation failed: email: Email must include @ symbol")
        })
        it("should deny bookings of users that dont have a deposit of over 100", async () => {
            const response = await api.post("/bookings").set("Authorization", `Bearer ${userToken}`).send({
                first_name: "Testing",
                last_name: "tester",
                email: "test@testing.com",
                dob: "2000-09-09",
                phone_number: "0411",
                description: "does this test work or does this test not work",
                deposit: "150",
                artist_name: "testing artist",
        })
            expect(response.statusCode).toBe(400)
            expect(response.body.error).toBe("Booking validation failed: phone_number: Phone number must be at least 10 digits")
        })
    })
    describe("support reviews", () => {
        it("should list reviews", async () => {
            const response = await api.get("/community/reviews").set("Authorization", `Bearer ${userToken}`)
            expect(response.statusCode).toBe(200)
            expect(response.body.length === 0).toBe(true)
        })
        it("should support the review lifecycle", async () => {
            const response = await api.post("/community/reviews").set("Authorization", `Bearer ${userToken}`).send({
                artistname: "Testing Artist",
                description: "description",
                tips: "testing tips",
                rating: "5",
            })
            expect(response.statusCode).toBe(200)
            expect(response.body.message).toBe("Review has been successfully created, thanks!")
            const review = response.body.review

            const listResponse = await api.get("/community/reviews").set("Authorization", `Bearer ${userToken}`)
            expect(listResponse.statusCode).toBe(200)
            const foundReview = listResponse.body.find((r) => r._id === review._id)
            expect(foundReview).not.toBe(undefined)
            
            const deleteResponse = await api.delete(`/community/reviews/${review._id}`).set("Authorization", `Bearer ${userToken}`)
            expect(deleteResponse.statusCode).toBe(200)
            expect(deleteResponse.body.message).toBe("Review has been successfully deleted!")
        })
        it("should give a rating between 1 and 10", async () => {
            const response = await api.post("/community/reviews").set("Authorization", `Bearer ${userToken}`).send({
                artistname: "Testing Artist",
                description: "description",
                tips: "testing tips",
                rating: "50",
            })
            expect(response.statusCode).toBe(400)
            expect(response.body.error).toBe("Review validation failed: rating: Rating must be between 1 and 10")
        })
    })
})