import React, { Children } from "react"
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import Menu from "../Shared/Menu";
import Header from "../Shared/Header";
function SignUpScreen({ navigation }) {
    return (
        <SafeAreaView>

            <Menu />
            <View style={style.view}>
                <Header title="Create An" titleBold="Account" />

                {/* Input */}
                <View style={style.form}>
                    <Text style={style.label}>Full Name</Text>
                    <TextInput style={style.input} />


                    <Text style={style.label}>Email</Text>
                    <TextInput style={style.input} />

                    <Text style={style.label}>Password</Text>
                    <TextInput style={style.input} />


                    {/* Check Box  --(Here We Go )-- */}


                    {/* <TouchableOpacity><Text style={style.forgotPass}>Forgot Password</Text></TouchableOpacity> */}

                    <TouchableOpacity style={style.button}><Text style={style.btnText}>Register</Text></TouchableOpacity>

                    
                    
                    {/* Connect with google */}

                    {/* Sign  Register */}

                    <TouchableOpacity onPress={()=> navigation.navigate('Home')}><Text style={{ ...style.forgotPass, textAlign: 'center', marginTop: 20, }}>Already Have An Account!</Text></TouchableOpacity>
                </View>


            </View>
        </SafeAreaView>
    )

}

const style = StyleSheet.create({
    form: {
        margin: 10,
    },
    view: {
        padding: 10,
    },
    form: {
        margin: 20,
    },
    label: {
        color: '#222',
        fontSize: 16,
        fontWeight: '400',
        marginTop: 10,

    },
    btnText: {
        color: '#fff',
        fontSize: 15,
        textAlign: 'center',
        fontWeight: '600',

    },
    forgotPass: {
        color: '#222',
        textAlign: 'right',
        fontSize: 15,
        fontWeight: '600',
        marginTop: 10,
        textDecorationLine: 'underline',
    },
    text: {
        color: '#222',
        fontSize: 20,
        marginTop: 20,
        fontWeight: '500',
    },
    input: {
        marginTop: 10,
        backgroundColor: 'rgba(100 , 0, 34 , 0.1)',
        borderRadius: 10,
        padding: 10,
        color: "#222",
    },
    button: {
        marginTop: 10,
        backgroundColor: '#222',
        borderRadius: 10,
        paddingVertical: 15,
        marginTop: 20,
    }
});

export default SignUpScreen