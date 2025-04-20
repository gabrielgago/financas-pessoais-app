import React, {useCallback} from "react";
import {KeyboardTypeOptions, Text, TextInput, TextInputIOSProps, View} from "react-native";
import Styles from "@components/CaptionTextInput/Styles";

const CaptionTextInput = React.memo(
    ({
         label,
         placeholder,
         onChange,
         value,
         type = "default",
         textContentType = "none",
         children,
         maxLength,
         labelColor = "#696969",
         labelSize = 18
     }: {
        label: string,
        placeholder: string,
        onChange: (v: string) => void,
        value: string,
        type?: KeyboardTypeOptions,
        textContentType?: TextInputIOSProps['textContentType'],
        children?: React.ReactNode,
        maxLength?: number,
        labelColor?: string,
        labelSize?: number,
    }) => {

        // Use useCallback para memoizar a função onChange
        const handleChange = useCallback(
            (v: string) => {
                onChange(v);
            },
            [onChange]
        );

        return (
            <View style={{gap: 5, marginVertical: 5}}>
                <Text style={{...Styles.modalText, color: labelColor, fontSize: labelSize}}>{label}</Text>
                <View>
                    {children && (<View style={Styles.leftIcon}>
                        {children}
                    </View>)}
                    <TextInput
                        placeholder={placeholder}
                        onChangeText={onChange}
                        value={value}
                        style={Styles.inputTxt}
                        cursorColor="#FFFFFF"
                        keyboardType={type}
                        textContentType={textContentType}
                        placeholderTextColor="#7B6F72"
                        maxLength={maxLength}
                    />
                </View>
            </View>
        );
    },
    // Comparador personalizado para evitar re-renderizações desnecessárias
    (prevProps: any, nextProps: any) => {
        return prevProps.value === nextProps.value;
    }
);

export default CaptionTextInput;