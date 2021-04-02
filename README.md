# Pool Contracts

Pool Contracts is a project backed by Ohreee. The core idea of a pool is being able to deposit fund in a smartcontract in a collaborative fashion.

The interaction possible within a pool are the following :
* Deposit fund
* Withdraw fund
* Allocate fund to a Defi project in order to yield interest : Aave, MakerDAO, Compound.

 There's two features available :
* Private Pool : only users allowed can interact with your pool. The owner of the pool can add or remove users.
* Public Pool : everybody can interact with your pool. This is suitable for public project, cooperative, association.

There are 2 main smartcontracts :
* PoolFactory.sol : this contract will create instance of pool (public or private).
* PoolRecorder.sol : this contract will help creating and recording instance of pool created through the Dapp.

## Prerequisite
We recommend you to install the following tools before starting the project :
* node, npm, yarn
* truffle
* ganache-cli
* web3
* git

## Installation
1. Use the package manager [yarn](https://pip.pypa.io/en/stable/) to install foobar.

```bash
yarn install
```

2. Create a `secrets.json` file at root folder and fill it's content with :
```json
{
    "providerUrl": "",
    "privateKey": ""
}
```

3. [Optional] Initialize the project and it's submodule :
```bash
git submodule init && git submodule update
```


4. Install dependencies on submodule :
```bash
cd vapp
yarn install
```

## Usage
### Launching everything
* Launch a local blockchain with ganache-cli : `ganache-cli`.
*NB : it's better to specify the same mnemonic in order to control private keys associated to a the mnemonic.*
* Compile the project : `truffle compile`
* Migrate the project : `truffle migrate --network development`
* Launch the frontend server :
```bash
cd vapp
yarn serve
```

### On browser side
1. Configure Metamask to connect to `localhost:8545`, where the ganache blockchain is running.

2. Configure add an account using it's private key from ganache.
* Open a console : `truffle console --network development`

You can go to `localhost:8080` and interact with the Dapp.


## Test
Run the following steps in order to tests your product :
* `truffle compile`
* `yarn test`

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)