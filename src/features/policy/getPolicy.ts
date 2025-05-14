import { Policy } from '~/data/interfaces/policies';
import { policies } from '~/data';
import { i18n, type Language } from '~/lib/i18n';

export async function getPolicy(policyType: Policy['policyType']): Promise<Policy> {
  const languageCode = i18n.language as Language;

  try {
    return policies.getPolicy(policyType, languageCode);
  } catch (error) {
    console.error('Error getting data policy:', error);
    throw error;
  }
}
