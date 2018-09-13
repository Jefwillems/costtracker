import Sheet from './sheet';
import _ from 'lodash';
import XLSX from 'xlsx';

class Generator {
  constructor() {
    this.path = process.cwd();
    this.workbook = XLSX.utils.book_new();
  }

  addNames(input) {
    this.sheets = _.map(input, sh => {
      return new Sheet(sh.name, sh.others);
    });
  }

  generate() {
    _.forEach(this.sheets, sheet => {
      const sheetName = sheet.name;
      const headers = [this.getHeaderFor(sheetName),];

      const newRow = Array(sheet.others.length * 2 + 5);
      _.fill(newRow, '');

      headers.push(newRow);
      const ws = XLSX.utils.aoa_to_sheet(headers);

      const totalindex = String.fromCharCode(
        'A'.charCodeAt(0) + sheet.others.length + 2
      );
      const totalPos = `${totalindex}2`;

      ws[totalPos].f = 'SUM(A:A)';
      ws[totalPos].t = 'n';
      ws[totalPos].z = '0.00';
      ws[totalPos].v = 0;
      _.forEach(sheet.others, (other, i) => {
        const cellIndex = String.fromCharCode(totalindex.charCodeAt(0) + i + 1);
        const cellPos = `${cellIndex}2`;
        const extraColumn = String.fromCharCode('A'.charCodeAt(0) + 2 + i);
        const formula = `${totalPos}/${this.getAmountOfPeople()}+SUM(${extraColumn}:${extraColumn})`;
        ws[cellPos].f = formula;
        ws[cellPos].t = 'n';
        ws[cellPos].z = '0.00';
        ws[cellPos].v = 0;
      });

      XLSX.utils.book_append_sheet(this.workbook, ws, sheetName);
    });
    XLSX.writeFile(this.workbook, `${this.path}/costtracker.xlsx`);
  }

  getHeaderFor(name) {
    const sheet = _.find(this.sheets, obj => obj.name === name);
    const header = ['Amount', 'Comment',];
    _.forEach(sheet.others, o => header.push(`${o} extra`));
    header.push('Total');
    _.forEach(sheet.others, o => header.push(`Total ${o}`));
    return header;
  }

  getAmountOfPeople() {
    return this.sheets[0].others.length + 1;
  }
}

export default new Generator();
