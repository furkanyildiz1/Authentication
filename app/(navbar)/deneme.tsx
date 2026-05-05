import { StyleSheet, Text } from "react-native";

export default function Deneme(){
    return(
        <Text style={style.container}>
            Deneme
        </Text>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,    
    }
})
    