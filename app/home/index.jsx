import React, { useEffect, useState, useCallback } from 'react';
import {
    View, Text, StyleSheet, ImageBackground, Dimensions,
    TouchableOpacity, ScrollView, Image, RefreshControl,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { BlurView } from 'expo-blur';
import {
    getPopularMovies,
    getTopRatedMovies,
    getMoviesByGenre,
    getAnimeMovies,
    getBlockbusterMovies
} from '../../services/tmdb';
import SkeletonBox from '@/components/SkeletonBox';
import { router } from "expo-router";
import { Image as CachedImage } from 'react-native-expo-image-cache';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const HomeScreen = () => {
    const [heroMovie, setHeroMovie] = useState(null);
    const [popular, setPopular] = useState([]);
    const [trending, setTrending] = useState([]);
    const [anime, setAnime] = useState([]);
    const [action, setAction] = useState([]);
    const [comedy, setComedy] = useState([]);
    const [horror, setHorror] = useState([]);
    const [marvel, setMarvel] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);


    const fetchData = useCallback(async () => {
        try {
            if (!refreshing) setLoading(true);
            const pop = await getPopularMovies();
            const top = await getTopRatedMovies();
            const animeM = await getAnimeMovies();
            const actionM = await getMoviesByGenre(28);
            const comedyM = await getMoviesByGenre(35);
            const horrorM = await getMoviesByGenre(27);
            const marvelM = await getBlockbusterMovies();

            setHeroMovie(pop[Math.floor(Math.random() * pop.length)]);
            setPopular(pop.slice(0, 20));
            setTrending(top.slice(0, 10));
            setAnime(animeM.slice(0, 20));
            setAction(actionM.slice(0, 20));
            setComedy(comedyM.slice(0, 20));
            setHorror(horrorM.slice(0, 20));
            setMarvel(marvelM.slice(0, 20));
        } catch (error) {
            console.error('Fetch error:', error);
        } finally {
            setLoading(false);
        }
    }, [refreshing]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchData().finally(() => setRefreshing(false));
    }, [fetchData]);

    const renderCategory = (title, data) => (
        <View style={styles.movieContainer}>
            <Text style={styles.headtext}>{title}</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 10 }}
                style={styles.movieContainer}>
                {data.map((movie) => (
                    <TouchableOpacity onPress={() => router.navigate({
                        pathname: '/movieDetails/[id]',
                        params: { id: movie.id }
                    })} key={movie.id}>
                        <CachedImage
                            uri={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            style={styles.movieImage}
                            preview={{ uri: `https://image.tmdb.org/t/p/w92${movie.poster_path}` }}
                        />
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
    const renderTrending = (title, data) => (
        <View style={styles.movieContainer}>
            <Text style={styles.headtext}>{title}</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 10 }}
                style={styles.movieContainer}>
                {data.map((movie) => (
                    <TouchableOpacity onPress={() => router.navigate({
                        pathname: '/movieDetails/[id]',
                        params: { id: movie.id }
                    })} key={movie.id}>
                        <Image
                            source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
                            style={styles.TrendmovieImage}
                        />
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );

    if (loading) {
        return (
            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, backgroundColor: '#000' }} contentContainerStyle={{ padding: 16 }}>
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


    return (
        <ScrollView
        showsVerticalScrollIndicator={false}
            contentContainerStyle={{ justifyContent: 'flex-start', alignItems: 'center' }}
            style={styles.background} refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#fff" />
            }>
            {heroMovie && (
                <ImageBackground
                    source={{ uri: `https://image.tmdb.org/t/p/original${heroMovie.backdrop_path}` }}
                    style={styles.imageBack}>
                    <LinearGradient colors={['transparent', '#000000c5']} style={styles.container}>
                        <View style={styles.absButtonContainer}>
                            <TouchableOpacity>
                                <BlurView intensity={50} tint="dark" style={styles.frostedIcon}>
                                    <IconSymbol type="ant" name="download" size={22} color="#fff" />
                                </BlurView>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <BlurView intensity={50} tint="dark" style={styles.frostedIcon}>
                                    <IconSymbol type="ant" name="search1" size={22} color="#fff" />
                                </BlurView>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image source={ require('../../assets/images/user1.png')} style={styles.profile} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ padding: 10}}>
                            <Text style={styles.headtext}>{heroMovie.title}</Text>
                            <Text style={{ color: '#fff', fontFamily: 'SFProDisplayMedium', fontSize: 16, marginTop: 10 }}>
                                {heroMovie.overview.length > 50 ? `${heroMovie.overview.slice(0, 50)}...` : heroMovie.overview}
                            </Text>
                        </View>
                        <View style={styles.playBtnContainer}>
                            <TouchableOpacity style={styles.playBtn} onPress={() => router.navigate({
                                pathname: '/movieDetails/[id]',
                                params: { id: heroMovie.id }
                            })}>
                                <IconSymbol type="ion" name="play" size={22} color="#333" />
                                <Text style={{ color: '#333', fontFamily: 'SFProDisplayBold' }}>Play Now</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <BlurView intensity={50} tint="light" style={styles.frostedIcon}>
                                    <IconSymbol type="material" name="add" size={24} color="#fff" />
                                </BlurView>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <BlurView intensity={50} tint="light" style={styles.frostedIcon}>
                                    <IconSymbol type="material" name="info-outline" size={24} color="#fff" />
                                </BlurView>
                            </TouchableOpacity>
                        </View>
                    </LinearGradient>
                </ImageBackground>
            )}
            {renderCategory('You might like this', popular)}
            {renderTrending('Trending Now', trending)}
            {renderCategory('Anime', anime)}
            {renderCategory('Action', action)}
            {renderCategory('Comedy', comedy)}
            {renderCategory('Blockbuster', marvel)}
            {renderCategory('Horror', horror)}
        </ScrollView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    background: {
        flex: 1,
        flexDirection: 'column',
        paddingBottom: 50,
    },
    headtext: {
        color: '#fff',
        fontSize: 20,
        fontFamily: 'SFProDisplayBold',
        textTransform: 'capitalize',
    },
    movieContainer: {
        width: '100%',
        marginTop: 20,
    },
    imageBack: {
        height: windowHeight / 1.35,
        width: '100%',
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        overflow: 'hidden',
    },
    container: {
        height: '100%',
        justifyContent: 'flex-end',
    },
    absButtonContainer: {
        flexDirection: 'row',
        gap: 10,
        position: 'absolute',
        top: 30,
        right: 20,
    },
    frostedIcon: {
        width: 40,
        height: 40,
        borderRadius: 55,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: 'rgba(255,255,255,0.15)',
    },
    playBtnContainer: {
        width: '100%',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 10,
    },
    playBtn: {
        height: 50,
        borderRadius: 30,
        backgroundColor: '#ffffffff',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 5,
        paddingHorizontal: 40,
    },
    movieImage: {
        width: windowWidth * 0.4,
        height: 'auto',
        aspectRatio: 0.7,
        borderRadius: 10,
    },
    TrendmovieImage: {
        width: windowWidth * 0.5,
        height: 'auto',
        aspectRatio: 0.7,
        borderRadius: 10,
    },
    profile: {
        width: 40,
        height: 40,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#ffffff60',
    },
});
