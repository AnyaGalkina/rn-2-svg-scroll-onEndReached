import {StatusBar} from 'expo-status-bar';
import {ActivityIndicator, Alert, Button, TouchableOpacity, FlatList, StyleSheet, Text, View} from 'react-native';
import {SvgComponent} from './Svg';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {useEffect, useRef, useState} from 'react';

const arr = [...Array(20)].map((_, index) => index + 1);

export default function App() {
    const [data, setData] = useState(() => arr)
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [maxItem, setMaxItem] = useState(40);

    useEffect(() => {
        setTimeout(() => {
            setData([...data, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
                setIsLoading(false);
        }, 2000)
    }, [page]);

    const fetchData = () => {
        if (data.length >= maxItem) {
            return
        }
        setPage(page + 1);
        setIsLoading(true);
    }

    const footer = () => {
        return (
            <View>
                {isLoading && <ActivityIndicator/>}
                {data.length >= maxItem &&
                    <View>
                        <Text>END LIST</Text>
                        <Button title={'Added items?'}
                                onPress={() => {
                                    Alert.alert('Real??', '', [{
                                        text: 'Yes',
                                        onPress: () => setMaxItem(maxItem + 40),
                                    }
                                    ])
                                }}
                        />
                    </View>
                }
            </View>
        )
    }

    const ref = useRef<FlatList>();
    const scrollToTop = () => {
        ref.current?.scrollToIndex({index:0, animated: true})
    }

    return (
        <SafeAreaProvider>
            <View style={styles.container}>
                <FlatList
                    data={data}
                    ref={ref}
                    renderItem={({item}) => <View
                        style={{backgroundColor: '#efaea5', width: 300, height: 30}}><Text>{item}</Text></View>}
                    onEndReached={fetchData}
                    onEndReachedThreshold={0.2}
                    ListFooterComponent={footer}
                />
                <TouchableOpacity
                    style={{
                        position: 'absolute',
                        bottom: 250,
                        right: 50,
                        width: 25,
                        height: 25,
                        backgroundColor: '#fff',
                        borderRadius: 25 / 2,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    onPress={scrollToTop}
                >
                    <Text>UP</Text>
                </TouchableOpacity>
                <SafeAreaView
                    edges={['top', 'left', 'right', 'bottom']}
                >
                    <SvgComponent style={{width: 80, height: 80}}/>
                    <Text>Open up App.tsx to start working on your app!</Text>
                </SafeAreaView>
                <StatusBar style="auto"/>
            </View>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
