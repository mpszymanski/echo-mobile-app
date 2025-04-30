import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { supabase } from '~/api/supabase';
import { useAuth } from '~/contexts/AuthContext';
import { ProtectedRoute } from '~/components/auth/ProtectedRoute';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { H1 } from '~/components/ui/typography';

export default function ProfileCreation() {
  const { t } = useTranslation();
  const { user, refreshAuth, hasProfile, isLoading: isAuthLoading } = useAuth();
  const router = useRouter();

  const [displayName, setDisplayName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if user already has a profile
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
      setError(t('profile.errors.nameRequired'));
      return;
    }

    if (!user) {
      setError(t('profile.errors.notAuthenticated'));
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const { error } = await supabase
        .from('profiles')
        .insert([
          {
            user_id: user.id,
            display_name: displayName.trim(),
          }
        ])
        .select()
        .single();

      if (error) throw error;

      // Refresh auth to include the new profile data
      await refreshAuth();

      // Redirect to feed
      router.replace('/feed');
    } catch (err) {
      console.error('Error creating profile:', err);
      setError(t('profile.errors.createFailed'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ProtectedRoute>
      <View className="flex-1 p-4 bg-background">
        {isLoading ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#0000ff" />
            <Text className="mt-4 text-foreground">{t('profile.loading')}</Text>
          </View>
        ) : (
          <View className="flex-1 justify-center items-center">
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

              {error && (
                <Text className="mb-4 text-destructive">{error}</Text>
              )}

              <Button 
                onPress={handleCreateProfile} 
                disabled={isSubmitting || !displayName.trim()}
                className="mt-4"
              >
                <Text className="text-white font-semibold">
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
