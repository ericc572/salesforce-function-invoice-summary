public with sharing class FunctionApex {
    public static void test() {
        System.debug('Invoking invoiceSummary');

        functions.Function invoiceSummary = functions.Function.get('invoiceSummaryProject.invoiceSummary');
        functions.FunctionInvocation invocation = invoiceSummary.invoke('{"name":"MyAccount"}');
        String jsonResponse = invocation.getResponse();

        System.debug('Response from invoiceSummary ' + jsonResponse);
    }
}