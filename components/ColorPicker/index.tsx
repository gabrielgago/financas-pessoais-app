import {ScrollView, Text, TouchableWithoutFeedback, View} from 'react-native';
import Styles from './Styles';
import {useState} from "react";

interface Color {
    color: string,
    highlightColor?: string,
    label: string,
    isSelecionado?: boolean,
}

interface ColorProps {
    color: string,
    highlightColor?: string,
    isSelected?: boolean,
    callbackSetSelectedColor: (color: string, label: string) => void,
    label: string,
}

type ColorPickerProps = {
    colors: Color[],
    callbackSetSelectedColor: (color: string) => void,
    highlightColor?: string,
}

function Color({color, highlightColor = '#f6efef', isSelected = false, callbackSetSelectedColor, label}: ColorProps) {

    return (<TouchableWithoutFeedback onPress={() => callbackSetSelectedColor(color, label)}>

        <View style={{
            width: 30,
            height: 30,
            borderRadius: 5,
            backgroundColor: color,
            borderColor: highlightColor,
            borderWidth: isSelected ? 3 : 0,
            elevation: 2,
        }}/></TouchableWithoutFeedback>);
}

export default function ColorPicker(props: ColorPickerProps) {

    const [selectedColor, setSelectedColor] = useState<string>('');

    return <View style={Styles.container}>
        <ScrollView style={Styles.display}>
            <View style={Styles.areaColor}>
                {
                    props.colors.map((color, idx) => {
                        return <Color
                            isSelected={(color.isSelecionado && !selectedColor) || selectedColor === color.label}
                            highlightColor={props.highlightColor}
                            color={color.color}
                            label={color.label}
                            callbackSetSelectedColor={(cor, label) => {
                                setSelectedColor(label);
                                props.callbackSetSelectedColor(cor);
                            }}
                            key={idx}
                        />
                    })
                }
            </View>
            <Text>Cor escolhida: {selectedColor}</Text>
        </ScrollView>
    </View>
};