const GreeterContract = artifacts.require("Greeter")

contract("Greeter", (accounts) => {
    it("has been deployed successfully", async () => {
        const greeter = await GreeterContract.deployed();
        assert(greeter, "contract was not deployed");
    })

    describe("greet()", () => {
        it("returns 'Hello, World!'", async () => {
            const greeter = await GreeterContract.deployed();
            const expected = "Hello, World!";
            const actual = await greeter.greet();

            assert.equal(actual, expected, "greeted with 'Hello, World!'");
        })
    })

    describe("owner()", () => {
        it("returns the address of the owner", async () => {
            const greeter = await GreeterContract.deployed();
            const owner = await greeter.owner();

            assert(owner, "the current owner");
        })

        it("matches the address that originally deployed the contract", async () => {
            const greeter = await GreeterContract.deployed();
            const owner = await greeter.owner();
            const expected = accounts[0];

            assert.equal(owner, expected, "matches address used to deploy contract");
        })
    })
})

contract("Greeter: update greeting", () => {
    describe("setGreeting(string)", () => {
        it("sets greeting to passed in string", async () => {
            const greeter = await GreeterContract.deployed();
            const expected = "Hi, there!";

            await greeter.setGreeting(expected);
            const actual = await greeter.greet();

            assert.equal(actual, expected, "greeting was not updated");
        })
    })
})
