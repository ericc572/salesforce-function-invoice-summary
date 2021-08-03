/**
 * This function takes a payload containing a case ID, and queries all the invoices on it. Then, it will generate a PDF with the sum of the total invoices and return to the user.
 *
 * The exported method is the entry point for your code when the function is invoked.
 *
 * Following parameters are pre-configured and provided to your function on execution:
 * @param event: represents the data associated with the occurrence of an event, and
 *                 supporting metadata about the source of that occurrence.
 * @param context: represents the connection to Functions and your Salesforce org.
 * @param logger: logging handler used to capture application logs and trace specifically
 *                 to a given execution of a function.
 */

"use strict";

module.exports = async function (event, context, logger) {
  logger.info(
    `Invoking invoice summary Function with payload ${JSON.stringify(
      event.data || {}
    )}`
  );

  // Extract Properties from Payload
  const { caseSFID } = event.data;

  // Validate the payload params
  if (!caseSFID) {
    throw new Error(`Please provide case Salesforce ID`);
  }

  // Define a record using the RecordForCreate type and providing the Developer Name
  //  const account = {
  //    type: "Account",
  //    fields: {
  //      Name: `${name}-${Date.now()}`,
  //      AccountNumber: accountNumber,
  //      Industry: industry,
  //      Type: type,
  //      Website: website
  //    }
  //  };

  try {
    // Query sum of all invoices on the specified case ID using SOQL/SOAP.
    const sum_soql = `SELECT SUM(Amount__c) FROM Invoice__c WHERE Case__c = '${caseSFID}'`;
    const queryResults = await context.org.dataApi.query(sum_soql);
    return queryResults;
  } catch (err) {
    // Catch any DML errors and pass the throw an error with the message
    const errorMessage = `Failed to retrieve case. Root Cause: ${err.message}`;
    logger.error(errorMessage);
    throw new Error(errorMessage);
  }
};
