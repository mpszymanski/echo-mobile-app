import { useState } from 'react';
import { Platform, View, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '~/components/ui/text';
import { Button } from '~/components/ui/button';
import { H2, P } from '~/components/ui/typography';
import { useTranslation } from 'react-i18next';
import { CodeField } from '~/components/ui/code-field';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { verifyOTP } from '~/features/auth/verifyOTP';
import { AuthGuard } from '~/components/auth/AuthGuard';
import { useToast } from '~/utils/useToast';

const inputLength = 6;

export default function Token() {
  const { t } = useTranslation();
  const { push } = useRouter();
  const { phoneNumber } = useLocalSearchParams();
  const { showError } = useToast();
  const [code, setCode] = useState('');

  const handleSubmit = async () => {
    try {
      await verifyOTP(phoneNumber as string, code);

      push('/feed');
    } catch (err) {
      showError(t('authToken.errors.verifyOTP'));
    }
  };

  return (
    <AuthGuard>
      <SafeAreaView className="flex-1">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1"
        >
          <View className="flex-1 justify-center gap-4 px-4">
            <H2>{t('authToken.header', 'Enter verification code')}</H2>
            <P>
              {t(
                'authToken.description',
                'We sent a verification code to your phone. Please enter it below.'
              )}
            </P>

            <View className="items-center">
              <CodeField
                value={code}
                onChangeText={setCode}
                cellCount={inputLength}
                keyboardType="number-pad"
                textContentType="oneTimeCode" // Enable SMS auto-fill on iOS
                autoComplete="sms-otp" // Enable SMS auto-fill on Android
              />
            </View>

            <Button onPress={handleSubmit} disabled={code.length !== inputLength}>
              <Text className="font-semibold text-white">{t('authToken.button', 'Verify')}</Text>
            </Button>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </AuthGuard>
  );
}
