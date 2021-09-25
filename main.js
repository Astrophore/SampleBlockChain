//TODO@Astrophore
const SHA256 = require('crypto.js/sha256');
class Block {
    constructor(index, timestamp, data, previoushash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previoushash = previoushash;
        this.hash = this.calculateHash();
    }
    calculateHash() {
        return SHA256(this.index + this.previoushash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }
    createGenesisBlock() {
        return new Block(0, "01/01/2021", "Genesis Block", "0");
    }
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }
    addBlock(newBlock) {
        newBlock.previoushash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash != currentBlock.calculateHash()) {
                return false;
            }
            if (currentBlock.previoushash != previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
}
let newcoin = new Blockchain();
newcoin.addBlock(new Block(1, "10/07/2021", { amount: 4 }));
newcoin.addBlock(new Block(2, "12/07/2021", { amount: 10 }));

console.log(JSON.stringify(newcoin, null, 4));


newcoin.chain[1].data = { amount: 100 };
