import { Policy, PolicyRepository } from '~/data/interfaces/policies';
import { supabase } from '../client';

export class SupabasePolicyRepository implements PolicyRepository {
  async getPolicy(
    policyType: Policy['policyType'],
    languageCode: Policy['languageCode']
  ): Promise<Policy> {
    const { data: profile, error } = await supabase
      .from('policies')
      .select('*')
      .eq('policy_type', policyType)
      .eq('language_code', languageCode)
      .order('policy_id', { ascending: true })
      .single();

    if (error) throw error;

    return this.mapToPolicy(profile);
  }

  private mapToPolicy(data: any): Policy {
    return {
      policyId: data.policy_id,
      policyType: data.policy_type,
      languageCode: data.language_code,
      contentHtml: data.content_html,
    };
  }
}
