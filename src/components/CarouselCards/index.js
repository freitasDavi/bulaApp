import React from "react";
import { View } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import CarouselCardItem from "../CarouselCardItem";

const merda = [
  {
    title: "Para que serve?",
    body: "Indicações de uso do medicamento.",
  },
  {
    title: "Como funciona?",
    body: "Ações do medicamento e tempo médio para ter efeito.",
  },
  {
    title: "Quando não usar?",
    body: "Informações sobre as contraindicações do medicamento.",
  },
  {
    title: "O que saber antes de tomar?",
    body: "Advertências e precauções que se deve saber antes de tomar o medicamento.",
  },
  {
    title: "Como deve ser armazenado?",
    body: "Onde, como e por quanto tempo o medicamento pode ser guardado.",
  },
  {
    title: "Como devo usar?",
    body: "Indicações como usar, manusear e aplicar o medicamento.",
  },
  {
    title: "O que fazer quando esquecer?",
    body: "Indicações do que fazer quando esquecer de tomar o medicamento.",
  },
  {
    title: "Quais os malefícios?",
    body: "Apresentação dos males com reações adversas e sintomas.",
  },
  {
    title: "O que fazer ao ter superdose?",
    body: "Indicações do que fazer ao ter ingerido uma dose maior do que a indicada.",
  },
];

const CarouselCards = () => {
  return (
    <View>
      <Carousel
        layout="tinder"
        layoutCardOffset={9}
        ref={isCarousel}
        data={this.state.merda}
        renderItem={CarouselCardItem}
        sliderWidth={302}
        itemWidth={146}
        inactiveSlideShift={0}
        useScrollView={true}
      />
      <Pagination
        dotsLength={merda.length}
        activeDotIndex={index}
        carouselRef={isCarousel}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 0,
          backgroundColor: "#707070",
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        tappableDots={true}
      />
    </View>
  );
};

export default CarouselCards;
