import { FlatList, View } from "react-native";
import CategoryItem from "./CategoryItem";

export default function Categories({ categories, term, setTerm }) {
  return (
    <View>
      <FlatList
        data={categories}
        renderItem={({ item, index }) => {
          return (
            <CategoryItem
              index={index}
              name={item.name}
              url={item.url}
              active={term === item.name}
              handleClick={() => setTerm(item.name)}
            />
          );
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(category) => category.name}
      />
    </View>
  );
}
