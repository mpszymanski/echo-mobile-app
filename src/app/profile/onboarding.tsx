import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useAuth } from '~/contexts/auth';
import { createProfile } from '~/features/profile';
import { ProtectedRoute } from '~/components/auth/ProtectedRoute';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { H1 } from '~/components/ui/typography';
import { useToast } from '~/hooks/useToast';

export default function ProfileCreation() {
  const { t } = useTranslation();
  const { user, refreshAuth, hasProfile, isLoading: isAuthLoading } = useAuth();
  const router = useRouter();
  const { showError } = useToast();

  const [displayName, setDisplayName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check if the user already has a profile
  useEffect(() => {
    // If we already know the profile status from the auth context, use that
    if (!isAuthLoading) {
      if (hasProfile) {
        // Profile exists, redirect to feed
        router.replace('/feed');
      } else {
        // No profile, stay on this page
        setIsLoading(false);
      }
    }
  }, [hasProfile, isAuthLoading, router]);

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

      // Redirect to feed
      router.replace('/feed');
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
    <ProtectedRoute>
      <View className="flex-1 bg-background p-4">
        {isLoading ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="#0000ff" />
            <Text className="mt-4 text-foreground">{t('profile.loading')}</Text>
          </View>
        ) : (
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
        )}
      </View>
    </ProtectedRoute>
  );
}
