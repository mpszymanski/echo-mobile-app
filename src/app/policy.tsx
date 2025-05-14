import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useLocalSearchParams } from 'expo-router';
import { getPolicy } from '~/features/policy/getPolicy';
import { useEffect, useState } from 'react';
import { Policy } from '~/data/interfaces/policies';
import { ActivityIndicator } from '~/components/ui/activity-indicator';
import { Text } from '~/components/ui/text';
import { WebView } from '~/components/ui/web-view';
import { useTranslation } from 'react-i18next';

export default function PolicyView() {
  const { t } = useTranslation();
  const { type = 'terms' } = useLocalSearchParams<{ type: Policy['policyType'] }>();

  const [policy, setPolicy] = useState<Policy | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchPolicy = async () => {
      try {
        const policyData = await getPolicy(type);
        setPolicy(policyData);
      } catch (err) {
        setHasError(true);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPolicy();
  }, [type, t]);

  const title = t(`policy.${type}`);

  return (
    <SafeAreaView className="flex-1">
      <Stack.Screen options={{ title }} />
      <View className="flex-1">
        {loading ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator />
            <Text className="mt-4">{t('policy.loading')}</Text>
          </View>
        ) : hasError ? (
          <View className="flex-1 items-center justify-center p-4">
            <Text className="text-red-500">{t('policy.error')}</Text>
          </View>
        ) : policy ? (
          <WebView contentHtml={policy.contentHtml} className="flex-1" />
        ) : (
          <View className="flex-1 items-center justify-center p-4">
            <Text>{t('policy.notAvailable')}</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
