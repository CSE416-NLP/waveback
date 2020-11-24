export class jsTPS_Transaction {
    doTransaction() { }
    undoTransaction() { }
}

export class PlaylistTransaction extends jsTPS_Transaction {
    constructor(old_playlist, new_playlist, callback) {
        super();
        this.old_playlist = old_playlist;
        this.new_playlist = new_playlist;
        this.callback = callback;
    }

    doTransaction() {
        this.callback(this.new_playlist);
    }

    undoTransaction() {
        this.callback(this.old_playlist);
    }
}

export class jsTPS {
    constructor() {
        this.transactions = [];
        this.mostRecentTransaction = -1;
        this.performingDo = false;
        this.performingUndo = false;
    }
    isPerformingDo() {
        return this.performingDo;
    }
    isPerformingUndo() {
        return this.performingUndo;
    }
    addTransaction(transaction) {
        // ARE THERE OLD UNDONE TRANSACTIONS ON THE STACK THAT FIRST
        // NEED TO BE CLEARED OUT, i.e. ARE WE BRANCHING?
        if ((this.mostRecentTransaction < 0) || (this.mostRecentTransaction < (this.transactions.length - 1))) {
            for (let i = this.transactions.length - 1; i > this.mostRecentTransaction; i--) {
                this.transactions.splice(i, 1);
            }
        }
        // AND NOW ADD THE TRANSACTION
        this.transactions.push(transaction);
        // AND EXECUTE IT
        this.doTransaction();
    }
    /**
     * This function executes the transaction at the location of the counter,
     * then moving the TPS counter. Note that this may be the transaction
     * at the top of the TPS stack or somewhere in the middle (i.e. a redo).
     */
    async doTransaction() {
        let retVal;
        if (this.hasTransactionToRedo()) {
            this.performingDo = true;
            let transaction = this.transactions[this.mostRecentTransaction + 1];
            retVal = await transaction.doTransaction();
            this.mostRecentTransaction++;
            this.performingDo = false;

        }
        console.log('transactions: ' + this.getSize());
        console.log('redo transactions:' + this.getRedoSize());
        console.log('undo transactions:' + this.getUndoSize());
        console.log(' ')
        return retVal;
    }

    peekUndo() {
        if (this.hasTransactionToUndo()) {
            return this.transactions[this.mostRecentTransaction];
        }
        else
            return null;
    }

    peekDo() {
        if (this.hasTransactionToRedo()) {
            return this.transactions[this.mostRecentTransaction + 1];
        }
        else
            return null;
    }

    async undoTransaction() {
        let retVal;
        if (this.hasTransactionToUndo()) {
            this.performingUndo = true;
            let transaction = this.transactions[this.mostRecentTransaction];
            retVal = await transaction.undoTransaction();
            this.mostRecentTransaction--;
            this.performingUndo = false;
        }
        console.log('transactions: ' + this.getSize());
        console.log('redo transactions:' + this.getRedoSize());
        console.log('undo transactions:' + this.getUndoSize());
        console.log(' ')
        return (retVal);
    }

    clearAllTransactions() {
        // REMOVE ALL THE TRANSACTIONS
        this.transactions = [];

        // MAKE SURE TO RESET THE LOCATION OF THE
        // TOP OF THE TPS STACK TOO
        this.mostRecentTransaction = -1;
    }

    getSize() {
        return this.transactions.length;
    }

    getRedoSize() {
        return this.getSize() - this.mostRecentTransaction - 1;
    }

    getUndoSize() {
        return this.mostRecentTransaction + 1;
    }

    hasTransactionToUndo() {
        return this.mostRecentTransaction >= 0;
    }

    hasTransactionToRedo() {
        return this.mostRecentTransaction < (this.transactions.length - 1);
    }
}