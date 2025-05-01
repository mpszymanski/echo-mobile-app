import { useState } from 'react';
import { Platform, View, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '~/components/ui/text';
import { PhoneInput } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { H2, P } from '~/components/ui/typography';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';
import { sendOTP } from '~/features/auth/sendOTP';
import { AuthGuard } from '~/components/auth/AuthGuard';
import { useToast } from '~/utils/useToast';

const inputLength = 15;

export default function Phone() {
  const { t } = useTranslation();
  const { push } = useRouter();
  const { showError } = useToast();
  const [phoneNumber, setPhoneNumber] = useState('+48 ');

  const handleSubmit = async () => {
    try {
      await sendOTP(phoneNumber);

      push({
        pathname: '/auth/token',
        params: { phoneNumber },
      });
    } catch (err) {
      showError(t('authPhone.errors.sendOTP'));
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
            <H2>{t('authPhone.header')}</H2>
            <P>{t('authPhone.description')}</P>

            <PhoneInput
              placeholder={t('authPhone.placeholder')}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              autoComplete="tel"
            />

            <Button onPress={handleSubmit} disabled={phoneNumber.length !== inputLength}>
              <Text className="font-semibold text-white">{t('authPhone.button')}</Text>
            </Button>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </AuthGuard>
  );
}
