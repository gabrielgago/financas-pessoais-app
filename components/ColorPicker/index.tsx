import {ScrollView, Text, TouchableWithoutFeedback, View} from 'react-native';
import Styles from './Styles';
import {useState} from "react";

interface Color {
    color: string,
    hintColor?: string,
    isSelected?: boolean,
    selectedColor: string
}

type ColorProps = {
    colors: Color[]
}

function Color({color, hintColor = "#111111", isSelected = false, selectedColor, toggleSelectedColor}: {
    color: string,
    hintColor?: string,
    isSelected?: boolean,
    selectedColor: string,
    toggleSelectedColor: (color: string) => void,
}) {

    const [selected, setSelected] = useState(isSelected);

    return (<TouchableWithoutFeedback onPress={() => {
        setSelected(true)
        toggleSelectedColor(color)
    }}>

        <View style={{
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: color,
        borderColor: selected ? hintColor : selectedColor,
        borderWidth: selected ? 2 : 1
    }}/></TouchableWithoutFeedback>);
}

export default function ColorPicker(props: ColorProps) {

    const [selectedColor, setSelectedColor] = useState<string>('');

    return <View style={Styles.container}>
        <ScrollView style={Styles.display}>
            <View style={Styles.areaColor}>
                {
                    props.colors.map((color, idx) =>
                        <Color isSelected={color.isSelected}
                               hintColor={color.hintColor}
                               color={color.color}
                               selectedColor={color.selectedColor}
                               toggleSelectedColor={(cor) => setSelectedColor(cor)}
                               key={idx}
                            />)
                }
            </View>
            <Text>Cor escolhida: {selectedColor}</Text>
        </ScrollView>
    </View>
};