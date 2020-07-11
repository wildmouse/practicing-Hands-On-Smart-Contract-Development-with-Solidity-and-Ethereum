pragma solidity >=0.6.0 <0.7.0;

import "./Fundraiser.sol";

contract FundraiserFactory {
    Fundraiser[]  private _fundraisers;

    uint256 constant maxLimit = 20;

    event FundraiserCreated(Fundraiser indexed fundraiser, address indexed owner);

    function fundraisers(uint256 limit, uint256 offset)
    public
    view
    returns (Fundraiser[] memory fundraisers)
    {
        uint256 size = fundraisersCount() < limit ? fundraisersCount() : limit;
        size = size < maxLimit ? size : maxLimit;
        fundraisers = new Fundraiser[](size);

        return fundraisers;
    }

    function fundraisersCount() public view returns (uint256) {
        return _fundraisers.length;
    }

    function createFundraiser(
        string memory name,
        string memory url,
        string memory imageURL,
        string memory description,
        address payable beneficiary
    ) public {
        Fundraiser fundraiser = new Fundraiser(
            name,
            url,
            imageURL,
            description,
            beneficiary,
            msg.sender
        );
        _fundraisers.push(fundraiser);
        emit FundraiserCreated(fundraiser, msg.sender);
    }
}
