import React, { useState } from "react";
import { View, Text, SafeAreaView, FlatList, StyleSheet } from "react-native";
import AppHeader from "../components/AppHeader";
import CatalogCard from "../components/CatalogCard";
import colors from "../components/colors";
import HorizontalItemListCard from "../components/HorizontalItemListCard";

const VideoList = ({ navigation, route }) => {
  const { id } = route.params;

  const [interviewVids, setInterviewVids] = useState([
    {
      id: 0,
      name: "Mr. Habib Ur Rehman | CEO of HI TECH Plastics Engineering",
      client: "Mr. Habib Ur Rehman",
      imagePath: require("../assets/interviewImgs/one.png"),
      url: "https://www.youtube.com/watch?v=gI3kvPrXLgE&list=PLP-29_9O-M0wCq73kBgskugftx5xNNy33&index=1",
    },
    {
      id: 1,
      name: "Piano by Sayyed Engineer | Interview of Mr Akber( Factory Manager )",
      client: "Piano by Sayyed Engineer",
      imagePath: require("../assets/interviewImgs/two.png"),
      url: "https://www.youtube.com/watch?v=flIvZrnGQig&list=PLP-29_9O-M0wCq73kBgskugftx5xNNy33&index=2",
    },
    {
      id: 2,
      name: "Royal Fan | Interview of Mr Khawar( CEO of Royal Fan )",
      client: "Royal Fan",
      imagePath: require("../assets/interviewImgs/three.png"),
      url: "https://www.youtube.com/watch?v=3aPwKmorHP0&list=PLP-29_9O-M0wCq73kBgskugftx5xNNy33&index=3",
    },
    {
      id: 3,
      name: "Klass Electric | Interview of Mr Khalil ( CEO of Klass Electric )",
      client: "Klass Electric",
      imagePath: require("../assets/interviewImgs/four.png"),
      url: "https://www.youtube.com/watch?v=NVp7bI91lYg&list=PLP-29_9O-M0wCq73kBgskugftx5xNNy33&index=4",
    },
    {
      id: 4,
      name: "SV Ruba | Interview of Mr Tahir ( General Manager of SV Ruba )",
      client: "SV Ruba",
      imagePath: require("../assets/interviewImgs/five.png"),
      url: "https://www.youtube.com/watch?v=6zUOaUHc10s&list=PLP-29_9O-M0wCq73kBgskugftx5xNNy33&index=5",
    },
    {
      id: 5,
      name: "HI TECH Plastics Engineering | Interview of Mr.Triq Mehmood ( Technical Country Head of HI TECH Plastics Engineering )",
      client: "HI TECH Plastics Engineering",
      imagePath: require("../assets/interviewImgs/six.png"),
      url: "https://www.youtube.com/watch?v=OmX1BhqngfU&list=PLP-29_9O-M0wCq73kBgskugftx5xNNy33&index=6",
    },
    {
      id: 6,
      name: "HI TECH Plastics Engineering | Interview of Mr.Asif Ali ( Director Sales of HI TECH Plastics Engineering )",
      client: "HI TECH Plastics Engineering",
      imagePath: require("../assets/interviewImgs/seven.png"),
      url: "https://www.youtube.com/watch?v=CMpmteUhWLM&list=PLP-29_9O-M0wCq73kBgskugftx5xNNy33&index=7",
    },
    {
      id: 7,
      name: "Premier Packaging Industry | Interview of Mr Saleem (CEO of PPI ) ",
      client: "Premier Packaging Industry",
      imagePath: require("../assets/interviewImgs/eight.png"),
      url: "https://www.youtube.com/watch?v=SUfrJFf3MaQ&list=PLP-29_9O-M0wCq73kBgskugftx5xNNy33&index=8",
    },
    {
      id: 8,
      name: "Awn Group | Interview of Miss Maira Ahmad ( COO of Awn Group ) ",
      client: "Awn Group",
      imagePath: require("../assets/interviewImgs/nine.png"),
      url: "https://www.youtube.com/watch?v=85mCr0SiuHE&list=PLP-29_9O-M0wCq73kBgskugftx5xNNy33&index=9",
    },

    {
      id: 9,
      name: "Awn Group | Interview of Mr Ramzan ( GM of Awn Group ) ",
      client: "Awn Group",
      imagePath: require("../assets/interviewImgs/ten.png"),
      url: "https://www.youtube.com/watch?v=S5XvGgN-EvA&list=PLP-29_9O-M0wCq73kBgskugftx5xNNy33&index=10",
    },

    {
      id: 10,
      name: "SPL | Interview of Mr Tanveer ( CEO of SPL )",
      client: "SPL",
      imagePath: require("../assets/interviewImgs/eleven.png"),
      url: "https://www.youtube.com/watch?v=GQnCoxeGyWo&list=PLP-29_9O-M0wCq73kBgskugftx5xNNy33&index=11",
    },
    {
      id: 11,
      name: "Atif Plastic | Interview of Mr Imran( Marketing Manager of Atif Plastic )",
      client: "Atif Plastic",
      imagePath: require("../assets/interviewImgs/twelve.png"),
      url: "https://www.youtube.com/watch?v=3s3M_bvTOaw&list=PLP-29_9O-M0wCq73kBgskugftx5xNNy33&index=12",
    },
    {
      id: 12,
      name: "Atif Plastic | Interview of Mr Tariq ( CEO of Atif Plastic ) ",
      client: "Atif Plastic",
      imagePath: require("../assets/interviewImgs/thirteen.png"),
      url: "https://www.youtube.com/watch?v=nobu6fwZqPU&list=PLP-29_9O-M0wCq73kBgskugftx5xNNy33&index=13",
    },

    {
      id: 13,
      name: "Advance Plastic | Interview of Mr Usman ( CEO of Advance Plastic )",
      client: "Advance Plastic",
      imagePath: require("../assets/interviewImgs/fourteen.png"),
      url: "https://www.youtube.com/watch?v=g8jSMH2un0A&list=PLP-29_9O-M0wCq73kBgskugftx5xNNy33&index=14",
    },
    {
      id: 14,
      name: "Karim Container | Interview of Mr Asad ( BDM of Karim Container )",
      client: "Karim Container",
      imagePath: require("../assets/interviewImgs/fifteen.png"),
      url: "https://www.youtube.com/watch?v=oHFYPvd7Z2I&list=PLP-29_9O-M0wCq73kBgskugftx5xNNy33&index=15",
    },
    {
      id: 15,
      name: "Bombal Plastic | Interview of Mr Ali ( CEO of Bombal Plastic )",
      client: "Bombal Plastic",
      imagePath: require("../assets/interviewImgs/sixteen.png"),
      url: "https://www.youtube.com/watch?v=GsrlB3PtFeI&list=PLP-29_9O-M0wCq73kBgskugftx5xNNy33&index=16",
    },
    {
      id: 16,
      name: "Fast Enterprise | Interview of Mr Shehzad Pasta ( CEO of Fast Enterprise )",
      client: "Fast Enterprise",
      imagePath: require("../assets/interviewImgs/seventeen.png"),
      url: "https://www.youtube.com/watch?v=9SrbNG_UIZs&list=PLP-29_9O-M0wCq73kBgskugftx5xNNy33&index=17",
    },
    {
      id: 17,
      name: "Happy House Hold | Interview of Mr Amin ( CEO of Happy House Hold )",
      client: "Happy House Hold",
      imagePath: require("../assets/interviewImgs/eighteen.png"),
      url: "https://www.youtube.com/watch?v=0VDJ1D5fkZM&list=PLP-29_9O-M0wCq73kBgskugftx5xNNy33&index=18",
    },
    {
      id: 18,
      name: "National Pipe | Interview of Abdul Haleem Bhutto( CEO of National Pipe )",
      client: "National Pipe",
      imagePath: require("../assets/interviewImgs/nineteen.png"),
      url: "https://www.youtube.com/watch?v=l9Ly3zqduoA&list=PLP-29_9O-M0wCq73kBgskugftx5xNNy33&index=19",
    },
    {
      id: 19,
      name: "Steelex | Interview of Mr Kashif Sabir ( CEO of Steelex ) ",
      client: "Steelex",
      imagePath: require("../assets/interviewImgs/twenty.png"),
      url: "https://www.youtube.com/watch?v=EPMh6pR5VDg&list=PLP-29_9O-M0wCq73kBgskugftx5xNNy33&index=20",
    },

    {
      id: 20,
      name: "Sheikh Plastic | Interview of Mr Amir Sheikh ( CEO of Sheikh Plastic )",
      client: "Sheikh Plastic",
      imagePath: require("../assets/interviewImgs/twentyOne.png"),
      url: "https://www.youtube.com/watch?v=3pBbbvehN7k&list=PLP-29_9O-M0wCq73kBgskugftx5xNNy33&index=21",
    },
    {
      id: 21,
      name: "National Pipe | Interview of Abdul Haleem Bhutto( CEO of National Pipe )",
      client: "National Pipe",
      imagePath: require("../assets/interviewImgs/twentyTwo.png"),
      url: "https://www.youtube.com/watch?v=l9Ly3zqduoA&list=PLP-29_9O-M0wCq73kBgskugftx5xNNy33&index=22",
    },
    {
      id: 22,
      name: "Sheikh Plastic | Interview of Mr Amir Sheikh ( CEO of Sheikh Plastic )",
      client: "Sheikh Plastic",
      imagePath: require("../assets/interviewImgs/twentyThree.png"),
      url: "https://www.youtube.com/watch?v=3pBbbvehN7k&list=PLP-29_9O-M0wCq73kBgskugftx5xNNy33&index=23",
    },
    {
      id: 24,
      name: "Ali Enterprise | Interview of Mr Khalil ur Rehman ( CEO of Ali Enterprise )",
      client: "Ali Enterprise",
      imagePath: require("../assets/interviewImgs/twentyFour.png"),
      url: "https://www.youtube.com/watch?v=o6HdbuwofAY&list=PLP-29_9O-M0wCq73kBgskugftx5xNNy33&index=24",
    },
    {
      id: 25,
      name: "Volta Plastic | Interview of Mr Bashir ( General Manager of Volta Plastic )",
      client: "Volta Plastic",
      imagePath: require("../assets/interviewImgs/twentyFive.png"),
      url: "https://www.youtube.com/watch?v=KQEw7yxLYIc&list=PLP-29_9O-M0wCq73kBgskugftx5xNNy33&index=25",
    },
  ]);
  const [businessVids, setBusinessVids] = useState([
    {
    //   id: 0,
    //   name: "PVC Fitting Business Idea | PVC Fitting Manufacturing Process | National Pipe Factory Visit",
    //   client: "Mr. Habib Ur Rehman",
    //   imagePath: require("../assets/businessImgs/one.png"),
    //   url: "https://www.youtube.com/watch?v=gI3kvPrXLgE&list=PLP-29_9O-M0wCq73kBgskugftx5xNNy33&index=1",

    id: 0,
      name: "Mr. Habib Ur Rehman | CEO of HI TECH Plastics Engineering",
      client: "Mr. Habib Ur Rehman",
      imagePath: require("../assets/interviewImgs/one.png"),
      url: "https://www.youtube.com/watch?v=gI3kvPrXLgE&list=PLP-29_9O-M0wCq73kBgskugftx5xNNy33&index=1",
    },
    {
      id: 1,
      name: "How to Start Pet Bottle Manufacturing Business | Complete Turn Key Solution",
      client: "Piano by Sayyed Engineer",
      imagePath: require("../assets/businessImgs/two.png"),
      url: "https://www.youtube.com/watch?v=scVGSHMug5U&list=PLP-29_9O-M0z5AM7BHPat_fxK7MYsotdn&index=2",
    },
    {
      id: 2,
      name: "How to Start Baby Feeder Manufacturing Business | Complete Turn Key Solution",
      client: "Royal Fan",
      imagePath: require("../assets/businessImgs/three.png"),
      url: "https://www.youtube.com/watch?v=RIbvdrFcl5M&list=PLP-29_9O-M0z5AM7BHPat_fxK7MYsotdn&index=3",
    },
    {
      id: 3,
      name: "How to Start Thin Wall Food Container Manufacturing Business | Complete Turn Key Solution",
      client: "Klass Electric",
      imagePath: require("../assets/businessImgs/four.png"),
      url: "https://www.youtube.com/watch?v=lNlNxou7iFE&list=PLP-29_9O-M0z5AM7BHPat_fxK7MYsotdn&index=4",
    },
    {
      id: 4,
      name: "How to Start Razor Manufacturing Business | Complete Turn Key Solution",
      client: "SV Ruba",
      imagePath: require("../assets/businessImgs/five.png"),
      url: "https://www.youtube.com/watch?v=pDKrvra7XvA&list=PLP-29_9O-M0z5AM7BHPat_fxK7MYsotdn&index=5",
    },
    {
      id: 5,
      name: "How to Start Baby Feeder Manufacturing Business | Complete Turn Key Solution",
      client: "HI TECH Plastics Engineering",
      imagePath: require("../assets/businessImgs/six.png"),
      url: "https://www.youtube.com/watch?v=RIbvdrFcl5M&list=PLP-29_9O-M0z5AM7BHPat_fxK7MYsotdn&index=6",
    },
    {
      id: 6,
      name: "PPRC Fitting Business Idea | PPRC Fitting manufacturing Business Idea | New Business idea",
      client: "HI TECH Plastics Engineering",
      imagePath: require("../assets/businessImgs/seven.png"),
      url: "https://www.youtube.com/watch?v=sSMqSVKPBoY&list=PLP-29_9O-M0z5AM7BHPat_fxK7MYsotdn&index=8",
    },
    {
      id: 7,
      name: "How to Start Thin Wall Food Container Manufacturing Business | Complete Turn Key Solution | Part 2",
      client: "Premier Packaging Industry",
      imagePath: require("../assets/businessImgs/eight.png"),
      url: "https://www.youtube.com/watch?v=LTViDocSX9Y&list=PLP-29_9O-M0z5AM7BHPat_fxK7MYsotdn&index=9",
    },
    {
      id: 8,
      name: "Auto Parts Business Idea | Auto Parts Manufacturing Process | Mehran Auto factory Visit",
      client: "Awn Group",
      imagePath: require("../assets/businessImgs/nine.png"),
      url: "https://www.youtube.com/watch?v=NXzdi1iqi9w&list=PLP-29_9O-M0z5AM7BHPat_fxK7MYsotdn&index=10",
    },

    {
      id: 9,
      name: "Electric switchboard manufacturing business Idea | Best Plastic manufacturing business Idea | Part 2",
      client: "Awn Group",
      imagePath: require("../assets/businessImgs/ten.png"),
      url: "https://www.youtube.com/watch?v=WWke0K8flSE&list=PLP-29_9O-M0z5AM7BHPat_fxK7MYsotdn&index=12",
    },
  ]);
  const [documentaryVids, setDocumentaryVids] = useState([
    {
      id: 0,
      name: "Hi Tech Plastics Engineering Documentary",
      client: "Mr. Habib Ur Rehman",
      imagePath: require("../assets/documentaryImgs/documentary.png"),
      url: "https://www.youtube.com/watch?v=Y-nqK6NOwoA",
    },
  ]);
  const renderInterviewVids = () => {
    console.log("in renderInterviewVids");
    return (
      <FlatList
        data={interviewVids}
        renderItem={({ item, index }) => {
          return (
            <HorizontalItemListCard
              name={item.name}
              imagePath={item.imagePath}
              navigation={navigation}
              url={item.url}
            />
          );
        }}
        keyExtractor={(item) => item.id}
      />
    );
  };
  const renderBusinessVids = () => {
    console.log("in renderBusinessVids");
    return (
      <FlatList
        data={businessVids}
        renderItem={({ item, index }) => {
          return (
            <HorizontalItemListCard
              name={item.name}
              imagePath={item.imagePath}
              navigation={navigation}
              client={item.client}
              url={item.url}
            />
          );
        }}
        keyExtractor={(item) => item.id}
      />
    );
  };
  const renderDocumentaryVids = () => {
    console.log("in renderDocumentaryVids");

    return (
      <FlatList
        data={documentaryVids}
        renderItem={({ item, index }) => {
          return (
            <HorizontalItemListCard
              name={item.name}
              imagePath={item.imagePath}
              navigation={navigation}
              client={item.client}
              url={item.url}
            />
          );
        }}
        keyExtractor={(item) => item.id}
      />
    );
  };


  console.log("called:", id);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AppHeader
        doubleBtn
        doubleBtnContainerStyle={{}}
        doubleBtnImg1={require("../assets/back-button.png")}
        titleImg1="Back"
        styleImg1={{
          width: 45,
          height: 45,
          marginLeft: 10,
        }}
        doubleBtnImg2={require("../assets/search.png")}
        doubleBtnImg2Style={{
          width: 20,
          height: 20,
          marginRight: 27,
        }}
        navigation={navigation}
        navigateTo="CustomersList"
        headerTitle="Videos List"
      />
      <View
        style={{
          marginBottom: 80,
          marginHorizontal: 20,
        }}
      >
        {id === "1"
          ? renderBusinessVids()
          : id === "2"
          ? renderInterviewVids()
          : id === "3"
          ? renderDocumentaryVids()
          : null}
      </View>
    </SafeAreaView>
  );
};

export default VideoList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    marginBottom: 25,
  },
  row: {
    marginVertical: 5,
  },
});
