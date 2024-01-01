import Animated from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';


export default function EmojiSticker({ imageSize, stickerSource }) {
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const scaleImage = useSharedValue(imageSize);
    const imageStyle = useAnimatedStyle(() => {
        return {
            width: withSpring(scaleImage.value),
            height: withSpring(scaleImage.value),
        };
    });


    const drag = Gesture.Pan()
        .onChange((event) => {
            translateX.value += event.changeX;
            translateY.value += event.changeY;
        });

        const containerStyle = useAnimatedStyle(() => {
            return {
              transform: [
                {
                  translateX: translateX.value,
                },
                {
                  translateY: translateY.value,
                },
              ],
            };
          });
          

    const doubleTap = Gesture.Tap()
        .numberOfTaps(2)
        .onStart(() => {
            if (scaleImage.value !== imageSize * 2) {
                scaleImage.value = scaleImage.value * 2;
            }
        });

    return (
        <GestureDetector gesture={drag}>
        <Animated.View style={{ top: -350 }}>
            <GestureDetector gesture={doubleTap}>/* @end */
                <Animated.Image
                    source={stickerSource}
                    resizeMode="contain"
                    /* @info Modify the style prop on the AnimatedImage to pass the imageStyle. */ style={[imageStyle, { width: imageSize, height: imageSize }]} /* @end */
                    />
      /* @info */</GestureDetector>

        </Animated.View>
        </GestureDetector>
    );
}
