import React, { FC } from 'react'
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Spot } from '../store/ducks/spots/types'
import { uploadsUrl } from '../../app.json'
import theme from '../theme'

interface SpotListProps {
  spots: Spot[];
  tech: string;
}

const SpotList: FC<SpotListProps> = (props: SpotListProps) => {
  const { spots, tech } = props
  const { navigate } = useNavigation()

  return (
    <>
      <Text style={styles.title}>
        Companies that work with <Text style={styles.techName}>{ tech }</Text>
      </Text>

      <FlatList
        data={spots}
        keyExtractor={(spot: any) => spot._id}
        showsHorizontalScrollIndicator={false}
        horizontal
        style={styles.list}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Image
              source={{ uri: `${uploadsUrl}/${item.thumbnail}` }}
              style={styles.thumbnail}
            />

            <Text style={styles.company}>{item.company}</Text>
            <Text style={styles.price}>{item.price > 0 ? `$${item.price}/day` : 'Free'}</Text>
            
            <TouchableOpacity 
              onPress={() => navigate('Book' as never, { id: item._id } as never)}
              style={styles.bookButton}>
              <Text style={styles.bookText}>Book</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </>
  )
}

const styles = StyleSheet.create({
  bookButton: {
    alignItems: 'center',
    borderRadius: 3,
    backgroundColor: theme.button.primary.bgColor,
    padding: 10,
    marginTop: 10
  },
  bookText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  company: {
    fontSize: 14,
    marginTop: 5
  },
  list: {
    backgroundColor: '#f2f2f2',
    borderColor: '#ccc',
    borderRadius: 10,
    borderWidth: .5,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 20
  },
  listItem: {
    marginRight: 15
  },
  price: {
    color: 'red',
    fontSize: 12
  },
  title: {
    color: '#444',
    marginBottom: 10
  },
  techName: {
    fontWeight: 'bold'
  },
  thumbnail: {
    borderRadius: 5,
    width: 180,
    height: 140,
    resizeMode: 'cover'
  }
})

export default SpotList
