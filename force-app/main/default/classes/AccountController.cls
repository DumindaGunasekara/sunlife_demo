/**
 * @author Duminda Gunasekara
 * @description Interface class to Accounts LWC componenets for SunLife code challange
 */
public with sharing class AccountController {

    public class AccountsException extends Exception{}

    /**
     * @description retrieve all accounts belongs to "Finanacial Services" industry
     * @return List of Accounts with requetsed information
     */
    @AuraEnabled
    public static List<Account> getFinancialServiceAccounts() {
        return getAccountsByIndustry('Financial Services');
    }

    /**
     * @description run the SOQL and return the Accounts informaton
     * @param industryName name of the Account.Industry picklist value
     * @return List of Accounts with requetsed information
     */
    private static List<Account> getAccountsByIndustry(String industryName) {
        List<Account> accounts = new List<Account>();

        try {
            accounts = [SELECT Id, Name, Owner.Name, Phone, Website, AnnualRevenue
                        FROM Account 
                        WHERE Industry = :industryName
                        WITH SECURITY_ENFORCED
                        ORDER BY Name];

        } catch (Exception exp) {
            throw new AccountsException('Exception while querying data' + exp);
        }

        return accounts;
    } 
}