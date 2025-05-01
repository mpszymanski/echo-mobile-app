import React, { useState } from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useAuth } from '~/contexts/auth';
import { createProfile } from '~/features/profile';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { H1 } from '~/components/ui/typography';
import { useToast } from '~/hooks/useToast';
import { useOnboarding } from '~/contexts/onboarding';

export default function ProfileCreation() {
  const { t } = useTranslation();
  const { user, refreshAuth } = useAuth();
  const { goToNextStep } = useOnboarding();
  const { showError } = useToast();

  const [displayName, setDisplayName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateProfile = async () => {
    if (!displayName.trim()) {
      showError(
        t('profile.errors.nameRequired.title'),
        t('profile.errors.nameRequired.description')
      );
      return;
    }

    setIsSubmitting(true);

    try {
      await createProfile(user!.id, displayName.trim());

      // Refresh auth to include the new profile data
      await refreshAuth();

      // Instead of directly navigating to feed, go to next onboarding step
      goToNextStep();
    } catch (err) {
      console.error('Error creating profile:', err);
      showError(
        t('profile.errors.createFailed.title'),
        t('profile.errors.createFailed.description')
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="flex-1 p-4">
      <View className="flex-1 items-center justify-center">
        <H1 className="mb-8 text-center">{t('profile.createTitle')}</H1>

        <View className="w-full max-w-sm">
          <Text className="mb-2 text-foreground">{t('profile.displayNameLabel')}</Text>
          <Input
            value={displayName}
            onChangeText={setDisplayName}
            placeholder={t('profile.displayNamePlaceholder')}
            className="mb-4"
            autoCapitalize="words"
          />

          <Button
            onPress={handleCreateProfile}
            disabled={isSubmitting || !displayName.trim()}
            className="mt-4"
          >
            <Text className="font-semibold text-white">
              {isSubmitting ? t('profile.creating') : t('profile.create')}
            </Text>
          </Button>
        </View>
      </View>
    </View>
  );
}
