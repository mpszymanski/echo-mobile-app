import { View } from "react-native";
import { useTranslation } from "react-i18next";
import { H1, P } from "~/components/ui/typography"

export default function Index() {
  const { t } = useTranslation();

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
      <P>{t('welcome.text')}</P>

    </View>
  );
}
