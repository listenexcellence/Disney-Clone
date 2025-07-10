import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Linking, ActivityIndicator, Dimensions } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { getMovieDetails, getMovieTrailerLink, getSimilarMovies } from '../../services/tmdb';
import SkeletonBox from '@/components/SkeletonBox';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const MovieDetailScreen = () => {
  const { id } = useLocalSearchParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(true);
  const [similarMovies, setSimilarMovies] = useState([]);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await getMovieDetails(id);
        const trailerLink = await getMovieTrailerLink(id);
        const similar = await getSimilarMovies(id);
        setMovie({ ...data, trailerLink });
        setSimilarMovies(similar.slice(0, 5)); // Limit to 5 similar movies
      } catch (e) {
        console.error('Movie fetch error', e);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) {
    return (
      <ScrollView style={{ flex: 1, backgroundColor: '#000' }} contentContainerStyle={{ padding: 16 }}>
        {/* Hero banner */}
        <SkeletonBox width="100%" height={windowHeight / 1.35} borderRadius={30} />

        {/* Category blocks */}
        {[...Array(5)].map((_, i) => (
          <View key={i} style={{ marginTop: 30 }}>
            <SkeletonBox width={150} height={20} />
            <View style={{ flexDirection: 'row', gap: 12, marginTop: 10 }}>
              {[...Array(4)].map((_, j) => (
                <SkeletonBox
                  key={j}
                  width={windowWidth * 0.4}
                  height={windowWidth * 0.6}
                  borderRadius={10}
                />
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    );
  }

  if (!movie) return null;

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={styles.imageWrapper}>
        {imageLoading && (
          <View style={styles.spinnerContainer}>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        )}

        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
          style={styles.poster}
          resizeMode="cover"
          onLoadEnd={() => setImageLoading(false)}
        />
      </View>
      <Text style={styles.title}>{movie.title}</Text>
      <Text style={styles.meta}>Released: {movie.release_date?.split('-')[0]}</Text>
      <Text style={styles.meta}>Rating: {movie.vote_average}/10</Text>
      <Text style={styles.overview}>{movie.overview}</Text>

      {movie.trailerLink && (
        <TouchableOpacity onPress={() => Linking.openURL(movie.trailerLink)} style={styles.trailerBtn}>
          <Text style={styles.trailerText}>🎬 Watch Trailer</Text>
        </TouchableOpacity>
      )}
      {similarMovies.length > 0 && (
        <View style={{ marginTop: 30 }}>
          <Text style={styles.similarTitle}>Similar Movies</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12, paddingVertical: 10 }}>
            {similarMovies.map((sim) => (
              <TouchableOpacity key={sim.id} onPress={() => router.push(`/movieDetails/${sim.id}`)}>
                <Image
                  source={{ uri: `https://image.tmdb.org/t/p/w300${sim.poster_path}` }}
                  style={styles.similarPoster}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </ScrollView>
  );
};

export default MovieDetailScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 0 },
  loadingContainer: { flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' },
  poster: { width: '100%', height: windowHeight / 1.2, borderRadius: 30 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginTop: 12, fontFamily: 'SFProDisplayBold' },
  meta: { fontSize: 16, color: '#ccc', marginVertical: 4 },
  overview: { fontSize: 15, color: '#ddd', marginTop: 10, lineHeight: 22 },
  trailerBtn: { marginTop: 20, padding: 14, backgroundColor: '#fff', borderRadius: 10, alignItems: 'center' },
  trailerText: { color: '#000', fontWeight: 'bold', fontSize: 16 },
  imageWrapper: {
    width: '100%',
    height: windowHeight / 1.2,
    borderRadius: 30,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 10,
  },

  spinnerContainer: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  similarTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  similarPoster: {
    width: 120,
    height: 180,
    borderRadius: 10,
    backgroundColor: '#222',
  },
});