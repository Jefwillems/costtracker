import inquirer from 'inquirer';
//import XLSX from 'xlsx';
import _ from 'lodash';

const askAmount = () => {
  const q = [
    {
      type: 'input',
      name: 'amount',
      message: 'How many people are travelling?',
      validate: amount => {
        var reg = /^\d+$/;
        return reg.test(amount) || 'Amount should be a number!';
      },
    },
  ];
  return inquirer.prompt(q);
};
askAmount()
  .then(answer => {
    const { amount, } = answer;
    const q = [];
    for (let i = 0; i < amount; i += 1) {
      q.push({
        type: 'input',
        name: `name${i}`,
        message: `What's the name of traveller ${i + 1}?`,
      });
    }
    return inquirer.prompt(q);
  })
  .then(answers => {
    const names = Object.keys(answers).map(key => answers[key]);
    const sheets = _.map(names, (name, i, arr) => {
      return { name, others: _.filter(arr, (el, j) => j !== i), };
    });
    console.log(sheets);
  })
  .catch(err => console.log(err));
