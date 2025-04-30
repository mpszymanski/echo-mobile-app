import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  CodeField as RNCodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
  type CodeFieldProps as RNCodeFieldProps,
} from 'react-native-confirmation-code-field';
import { Text } from '~/components/ui/text';
import { useColorScheme } from '~/lib/rnr/useColorScheme';

export interface CodeFieldProps extends Omit<RNCodeFieldProps, 'renderCell'> {
  cellCount: number;
  value: string;
  onChangeText: (text: string) => void;
  className?: string;
}

const CodeField = React.forwardRef<React.ElementRef<typeof RNCodeField>, CodeFieldProps>(
  ({ className, cellCount, value, onChangeText, ...props }, ref) => {
    const { isDarkColorScheme } = useColorScheme();
    const codeFieldRef = useBlurOnFulfill({ value, cellCount });
    const [codeFieldProps, getCellOnLayoutHandler] = useClearByFocusCell({
      value,
      setValue: onChangeText,
    });

    // Combine refs
    const combinedRef = React.useCallback(
      (node: React.ElementRef<typeof RNCodeField> | null) => {
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref, codeFieldRef]
    );

    return (
      <RNCodeField
        ref={combinedRef}
        {...codeFieldProps}
        {...props}
        value={value}
        onChangeText={onChangeText}
        cellCount={cellCount}
        rootStyle={styles.codeFieldRoot}
        className={className}
        renderCell={({ index, symbol, isFocused }) => (
          <View
            key={index}
            style={[
              styles.cell,
              isDarkColorScheme ? styles.cellDark : styles.cellLight,
              isFocused && (isDarkColorScheme ? styles.focusCellDark : styles.focusCellLight),
            ]}
            onLayout={getCellOnLayoutHandler(index)}
          >
            <Text
              className="text-center text-2xl"
              style={isDarkColorScheme ? styles.cellTextDark : styles.cellTextLight}
            >
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          </View>
        )}
      />
    );
  }
);

CodeField.displayName = 'CodeField';

const styles = StyleSheet.create({
  codeFieldRoot: {
    marginTop: 20,
    marginBottom: 20,
    width: 280,
  },
  cell: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cellLight: {
    borderColor: 'hsl(240 5.9% 90%)', // border light
    backgroundColor: 'hsl(0 0% 100%)', // background light
  },
  cellDark: {
    borderColor: 'hsl(240 3.7% 15.9%)', // border dark
    backgroundColor: 'hsl(240 10% 3.9%)', // background dark
  },
  focusCellLight: {
    borderColor: 'hsl(240 5.9% 10%)', // primary light
  },
  focusCellDark: {
    borderColor: 'hsl(0 0% 98%)', // primary dark
  },
  cellTextLight: {
    color: 'hsl(240 10% 3.9%)', // foreground light
  },
  cellTextDark: {
    color: 'hsl(0 0% 98%)', // foreground dark
  },
});

export { CodeField };
