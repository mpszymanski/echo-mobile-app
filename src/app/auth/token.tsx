import {useState} from 'react';
import {Platform, View, KeyboardAvoidingView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Text} from '~/components/ui/text';
import {Button} from '~/components/ui/button';
import {H2, P} from "~/components/ui/typography";
import {useTranslation} from "react-i18next";
import {CodeField} from '~/components/ui/code-field';
import {useLocalSearchParams} from "expo-router";

const inputLength = 4;

export default function Token() {
    const {t} = useTranslation();
    const { phoneNumber } = useLocalSearchParams();
    const [code, setCode] = useState('');

    const handleSubmit = () => {
        // Handle verification code submission
        console.log('Verification code submitted:', code);
        console.log('Phone number:', phoneNumber);
    };

    return (
        <SafeAreaView className="flex-1">
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >
                <View className="flex-1 px-4 justify-center gap-4">
                    <H2>
                        {t('authToken.header', 'Enter verification code')}
                    </H2>
                    <P>
                        {t('authToken.description', 'We sent a verification code to your phone. Please enter it below.')}
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
                        <Text className="text-white font-semibold">
                            {t('authToken.button', 'Verify')}
                        </Text>
                    </Button>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
