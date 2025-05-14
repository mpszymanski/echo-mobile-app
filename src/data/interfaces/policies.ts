export interface Policy {
  policyId: string;
  policyType: 'privacy' | 'terms';
  languageCode: 'pl' | 'en';
  contentHtml: string;
}

export interface PolicyRepository {
  getPolicy: (
    policyType: Policy['policyType'],
    languageCode: Policy['languageCode']
  ) => Promise<Policy>;
}
