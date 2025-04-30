import { View } from "react-native";
import { useTranslation } from "react-i18next";
import { H1 } from "~/components/ui/typography"
import {Button} from "~/components/ui/button";
import {Text} from "~/components/ui/text";
import {useRouter} from "expo-router";

export default function Index() {
  const { t } = useTranslation();
  const { push } = useRouter();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
      }}
    >
      <H1>{t('welcome.header')}</H1>
        <Button onPress={() => push('/auth/phone')}>
            <Text className="text-white font-semibold">{t('welcome.text')}</Text>
        </Button>

    </View>
  );
}
