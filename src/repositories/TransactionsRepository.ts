import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    // get sum of outcome transactions
    const outcome = this.transactions.reduce((tot, item) => {
      if (item.type === 'outcome') {
        return tot + item.value;
      }
      return tot;
    }, 0);

    // get sum of income transactions
    const income = this.transactions.reduce((tot, item) => {
      if (item.type === 'income') {
        return tot + item.value;
      }
      return tot;
    }, 0);

    // set total value equal sub income with outcome
    const total = income - outcome;

    // return balance object
    return {
      income,
      outcome,
      total,
    };
  }

  public create({ title, value, type }: Omit<Transaction, 'id'>): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
