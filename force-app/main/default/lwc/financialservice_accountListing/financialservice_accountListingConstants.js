//Columns to display in the Accounts List table
export const COLUMNS = [
  { label: 'Account Name', fieldName: 'AccountId', sortable: "true", editable: true, type: 'url',
      typeAttributes: { label:{fieldName:'Name'}, target: '_self' } },  
  { label: 'Account Owner', fieldName: 'Owner.Name', sortable: "true", editable: true },
  { label: 'Phone', fieldName: 'Phone', sortable: "false", editable: true },
  { label: 'Website', fieldName: 'Website', sortable: "false", editable: true },
  { label: 'Annual Revenue', fieldName: 'AnnualRevenue', sortable: "false", editable: true },
];

export const TITLE = 'Financial Services Account Listing';