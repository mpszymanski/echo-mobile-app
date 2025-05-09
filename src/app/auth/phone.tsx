import { useState } from 'react';
import { Platform, View, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '~/components/ui/text';
import { PhoneInput } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { H2, P } from '~/components/ui/typography';
import { useTranslation, Trans } from 'react-i18next';
import { useRouter } from 'expo-router';
import { sendOTP } from '~/features/auth/sendOTP';
import { AuthGuard } from '~/components/auth/AuthGuard';
import { useToast } from '~/hooks/useToast';
import { Checkbox } from '~/components/ui/checkbox';
import { Label } from '~/components/ui/label';

const inputLength = 15;

export default function Phone() {
  const { t } = useTranslation();
  const { push } = useRouter();
  const { showError } = useToast();
  const [phoneNumber, setPhoneNumber] = useState('+48 ');
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleSubmit = async () => {
    try {
      await sendOTP(phoneNumber);

      push({
        pathname: '/auth/token',
        params: { phoneNumber },
      });
    } catch (err) {
      console.error('Error sending OTP:', err);
      showError(t('authPhone.errors.sendOTP.title'), t('authPhone.errors.sendOTP.description'));
    }
  };

  const termsAndConditionButton = (
    <Text
      className="font-semibold text-foreground underline"
      onPress={() => push('/terms-and-conditions')}
    />
  );

  const dataPolicyButton = (
    <Text
      className="font-semibold text-foreground underline"
      onPress={() => push('/data-policy')}
    />
  );

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

            <View className="mb-2 flex-row items-center gap-2">
              <Checkbox
                checked={termsAccepted}
                onCheckedChange={setTermsAccepted}
                aria-labelledby="terms"
              />
              <View className="ml-2">
                <Label nativeID="terms">
                  <Trans
                    i18nKey="authPhone.termsCheckbox"
                    components={[termsAndConditionButton, dataPolicyButton]}
                  ></Trans>
                </Label>
              </View>
            </View>

            <Button
              onPress={handleSubmit}
              disabled={phoneNumber.length !== inputLength || !termsAccepted}
            >
              <View className="flex-row items-center justify-center">
                <Text className="font-semibold text-white">{t('authPhone.button')}</Text>
              </View>
            </Button>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </AuthGuard>
  );
}
