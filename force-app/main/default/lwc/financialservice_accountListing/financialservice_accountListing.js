import { LightningElement, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

import * as fs_consts from './financialservice_accountListingConstants';

import getFinancialServiceAccounts from '@salesforce/apex/AccountController.getFinancialServiceAccounts';

export default class Financialservice_accountListing extends NavigationMixin(LightningElement) {
  
  @track accountData;
  @track error;
  @track fs_consts = fs_consts;
  @track rowOffset = 0;
  @track defaultSortDirection = 'asc';
  @track sortDirection = 'asc';
  @track sortedBy;  
  @track initalData;
  
  connectedCallback() {
    console.debug('entered connectedCallback');
    this.loadAccountDetails();
  }

  //retrive data from the Apex class
  async loadAccountDetails() {
    console.debug('entered loadAccountDetails');
    await getFinancialServiceAccounts().then(data => {
      const rows = [];

      data.forEach(function(record) {
        const acctObj = Object.assign({}, record, {
          AccountId: '/' + record.Id,
        });
        rows.push(acctObj);
      })

      this.accountData = rows;
      this.initalData = rows;
      this.error = undefined;
    }).
    catch(error => {
      this.error = error;
      this.accountData = undefined;
      console.error(error);
    })
  }

  //invoke when user clicks on the data table column to sort
  handleSort(event) {
    console.debug('entered handleSort');

    const { fieldName: sortedBy, sortDirection } = event.detail;
    const cloneData = [...this.accountData];

    cloneData.sort(this.sortBy(sortedBy, sortDirection === 'asc' ? 1 : -1));
    this.accountData = cloneData;
    this.sortDirection = sortDirection;
    this.sortedBy = sortedBy;
  }

  //invoke when user starts search
  handleSearch(event) {
    console.debug('entered handleSearch');

    let queryString = event.target.value.toLowerCase();

    if(queryString) {
      this.accountData = this.initalData.filter(
        row => row.Name.toLowerCase().includes(queryString)
      );
    }
  }  

  //Copied from Salesforce componenet Library example
  sortBy(field, reverse, primer) {
    const key = primer
        ? function(x) {
              return primer(x[field]);
          }
        : function(x) {
              return x[field];
          };

    return function(a, b) {
        a = key(a);
        b = key(b);
        return reverse * ((a > b) - (b > a));
    };
  }

}