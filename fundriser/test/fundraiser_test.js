const FundraiserContract = artifacts.require("Fundraiser")

contract("Fundraiser", account => {
  let fundraiser
  const name = "Beneficiary Name"

  describe("initialization", () => {
    beforeEach (async () => {
      fundraiser = await FundraiserContract.new(name)
    })

    it("gets the beneficiary name", async () => {
      const actual = await fundraiser.name()
      assert.equal(actual, name, "names should match")
    })
  })
})
