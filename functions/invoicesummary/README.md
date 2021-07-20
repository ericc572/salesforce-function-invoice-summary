# Case Invoice Sum function

## Description

This function will take in a given Case ID, and generate a PDF with the sum of the total amount of the invoices. 
It is deployed via Salesforce Functions in a scratch org, and uses its own Compute environment


## Running the function and Invoking
To run the function locally:
`sfdx run:function:start`

To deploy this to a compute env in the context of a Dev org:
`sfdx project:deploy:functions -o MyScratchOrgAlias`

## Invoking the function
To invoke the function, we use an Apex class and run the following: