import { ErrorToast, type BaseToastProps} from "react-native-toast-message";

export const TOAST_CONFIG = {
    error: (props: BaseToastProps) => (
        <ErrorToast
            {...props}
            text1NumberOfLines={2}
            text2NumberOfLines={3}
        />
    ),
};