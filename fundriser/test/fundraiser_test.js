const FundraiserContract = artifacts.require("Fundraiser")

contract("Fundraiser", account => {
  let fundraiser
  const name = "Beneficiary Name"
  const url = "example.com"
  const imageURL = "https://placekitten.com/600/350"
  const description = "Beneficiary description"

  describe("initialization", () => {
    beforeEach (async () => {
      fundraiser = await FundraiserContract.new(
        name,
        url,
        imageURL,
        description
      )
    })

    it("gets the beneficiary name", async () => {
      const actual = await fundraiser.name()
      assert.equal(actual, name, "name should match")
    })

    it("gets the beneficiary url", async () => {
      const actual = await fundraiser.url()
      assert.equal(actual, url, "url should match")
    })

    it("gets the beneficiary image url", async () => {
      const actual = await fundraiser.imageURL()
      assert.equal(actual, imageURL, "imageURL should match")
    })

    it("gets the beneficiary description", async () => {
      const actual = await fundraiser.description()
      assert.equal(actual, description, "description should match")
    })
  })
})
