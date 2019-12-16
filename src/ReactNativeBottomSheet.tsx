import React, {useEffect} from 'react';
import {requireNativeComponent, NativeEventEmitter} from 'react-native';

export type BottomSheetState = 'collapsed' | 'expanded';

interface Props {
  sheetState?: BottomSheetState;
  onSheetStateChanged?: (newState: BottomSheetState) => void;

  style?: object;
  children?: object;
}

const BottomSheet = (props: Props) => {
  const {onSheetStateChanged} = props;

  useEffect(() => {
    const eventEmitter = new NativeEventEmitter();
    const subscription = eventEmitter.addListener(
      'BottomSheetStateChange',
      event => {
        onSheetStateChanged?.(event);
      },
    );

    return () => subscription.remove();
  }, [onSheetStateChanged]);

  return <Sheet {...props} style={props.style} />;
};
const Sheet = requireNativeComponent('BottomSheetLayout');

export default BottomSheet;
