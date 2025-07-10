import React, { useEffect, useState } from 'react';
import {
    View, Text, StyleSheet, ImageBackground, Dimensions,
    TouchableOpacity, ScrollView, Image
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { BlurView } from 'expo-blur';
import {
    getPopularMovies,
    getTopRatedMovies,
    getMoviesByGenre,
    getAnimeMovies,
    getMarvelMovies
} from '../../services/tmdb';

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

    useEffect(() => {
        const fetchAll = async () => {
            // Fetching all movie categories

            const pop = await getPopularMovies();
            const top = await getTopRatedMovies();
            const animeM = await getAnimeMovies();
            const actionM = await getMoviesByGenre(28);
            const comedyM = await getMoviesByGenre(35);
            const horrorM = await getMoviesByGenre(27);
            const marvelM = await getMarvelMovies();
            console.log({
                hero: pop[Math.floor(Math.random() * pop.length)],
                popular: pop.slice(0, 20),
                trending: top.slice(0, 10),
                anime: animeM.slice(0, 20),
                action: actionM.slice(0, 20),
                comedy: comedyM.slice(0, 20),
                horror: horrorM.slice(0, 20),
                marvel: marvelM.slice(0, 20),
            });
            setHeroMovie(pop[Math.floor(Math.random() * pop.length)]);
            setPopular(pop.slice(0, 20));
            setTrending(top.slice(0, 10));
            setAnime(animeM.slice(0, 20));
            setAction(actionM.slice(0, 20));
            setComedy(comedyM.slice(0, 20));
            setHorror(horrorM.slice(0, 20));
            setMarvel(marvelM.slice(0, 20));
        };

        fetchAll();
    }, []);

    const renderCategory = (title, data) => (
        <View style={styles.movieContainer}>
            <Text style={styles.headtext}>{title}</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 10 }}
                style={styles.movieContainer}>
                {data.map((movie) => (
                    <TouchableOpacity key={movie.id}>
                        <Image
                            source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
                            style={styles.movieImage}
                        />
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );

    return (
        <ScrollView
            contentContainerStyle={{ justifyContent: 'flex-start', alignItems: 'center' }}
            style={styles.background}>
            {heroMovie && (
                <ImageBackground
                    source={{ uri: `https://image.tmdb.org/t/p/original${heroMovie.backdrop_path}` }}
                    style={styles.imageBack}>
                    <LinearGradient colors={['transparent', '#00000071']} style={styles.container}>
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
                        </View>
                        <View style={styles.playBtnContainer}>
                            <TouchableOpacity style={styles.playBtn}>
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
            {renderCategory('Trending Now', trending)}
            {renderCategory('Anime', anime)}
            {renderCategory('Action', action)}
            {renderCategory('Comedy', comedy)}
            {renderCategory('Marvel', marvel)}
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
});
