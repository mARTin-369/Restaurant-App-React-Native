import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import { useState } from "react";
import Carousel, { Pagination } from "react-native-snap-carousel";

export default function ImageCarousel({ images }) {
  const [activeSlide, setactiveSlide] = useState(0);

  const ScreenDims = Dimensions.get("window");
  const imgWidth = ScreenDims.width;
  const imgHeight = ScreenDims.height;

  return (
    <View style={styles.slide}>
      <Carousel
        style={styles.carousel}
        layout={"default"}
        data={images}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item }}
            style={{ height: 200, width: imgWidth }}
          />
        )}
        sliderWidth={imgWidth}
        itemWidth={imgWidth}
        onSnapToItem={(index) => setactiveSlide(index)}
      ></Carousel>
      <View style={styles.pagination}>
        <Pagination
          dotsLength={images.length}
          activeDotIndex={activeSlide}
          containerStyle={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 4,
            backgroundColor: "rgba(255, 255, 255, 0.92)",
          }}
          inactiveDotStyle={{
            backgroundColor: "rgba(0, 0, 0, 1)",
          }}
          inactiveDotOpacity={0.8}
          inactiveDotScale={0.6}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {},
  pagination: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: -15,
    // height: 60,
    // width: "100%",
  },
  lightHeader: {
    fontSize: 28,
    marginTop: 20,
  },
  LargeHeader: {
    fontSize: 36,
    fontWeight: "bold",
  },
  headerWrapper: {
    marginHorizontal: 25,
  },
});
