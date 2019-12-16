/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useCallback, useState} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  Colors,
  DebugInstructions,
  Header,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import BottomSheet, {BottomSheetState} from './ReactNativeBottomSheet';

const App = () => {
  const [bottomSheetState, setBottomSheetState] = useState<BottomSheetState>(
    'collapsed',
  );
  const onSheetChanged = useCallback((newState: BottomSheetState) => {
    setBottomSheetState(newState);
  }, []);

  return (
    <View style={{flex: 1}}>
      <BottomSheet
        style={styles.container}
        sheetState={bottomSheetState}
        onSheetStateChanged={onSheetChanged}>
        <View>
          <StatusBar barStyle="dark-content" />
          <SafeAreaView>
            <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              style={styles.scrollView}>
              <Header />
              <View style={styles.container}>
                <Button
                  title={
                    bottomSheetState === 'collapsed'
                      ? 'Expand bottom sheet'
                      : 'Collapse bottom sheet'
                  }
                  onPress={() =>
                    setBottomSheetState(currentValue =>
                      currentValue === 'collapsed' ? 'expanded' : 'collapsed',
                    )
                  }
                  // @ts-ignore
                  style={styles.button}
                />
              </View>
            </ScrollView>
          </SafeAreaView>
        </View>
        <View style={styles.bottomSheet}>
          <View style={styles.bottomSheetDivider} />
          <Text style={[styles.sectionTitle, styles.title]}>Bottom Sheet</Text>
          <ScrollView>
            <View>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Step One</Text>
                <Text style={styles.sectionDescription}>
                  Edit <Text style={styles.highlight}>App.tsx</Text> to change
                  this screen and then come back to see your edits.
                </Text>
              </View>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>See Your Changes</Text>
                <Text style={styles.sectionDescription}>
                  <ReloadInstructions />
                </Text>
              </View>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Debug</Text>
                <Text style={styles.sectionDescription}>
                  <DebugInstructions />
                </Text>
              </View>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Learn More</Text>
                <Text style={styles.sectionDescription}>
                  Read the docs to discover what to do next:
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
  },
  button: {
    paddingHorizontal: 8 * 10,
  },
  bottomSheetDivider: {
    height: 1,
    width: '100%',
    backgroundColor: '#5b5f61',
  },
  bottomSheet: {
    backgroundColor: '#202122',
    alignItems: 'center',
  },
  title: {
    marginTop: 32,
    color: '#fff',
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#e3e5e7',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: '#989fa4',
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: '#989fa4',
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
