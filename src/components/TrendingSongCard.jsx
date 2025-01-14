import { Flex, Text, Image, Button, Spinner, Box } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import { CiHeart } from 'react-icons/ci';
import { BsThreeDots } from 'react-icons/bs';
import { FaPlay, FaPause } from 'react-icons/fa';
import { formatSongDate } from '../utils/formatSongDate';
import { likeSongService } from '../services/songsServices';
import { MdOutlineImageNotSupported } from 'react-icons/md';
import PropTypes from 'prop-types';
import { getSongDetailsService } from '../services/songsServices';

function TrendingSongCard({
  id,
  title,
  cover,
  audio,
  author,
  authorId,
  createdAt,
  likesCount,
  onPlayAudio,
  isPlaying,
}) {
  const [likeLoading, setLikeLoading] = useState(false);
  const [song, setSong] = useState([]);

  const [likeSong, setLikeSong] = useState(false);

  useEffect(() => {
    console.log('Effect in songCard');
    getSongDetailsService(id)
      .then((data) => setSong(data))
      .catch((err) => console.log(err));
  }, [likeSong, id]);

  async function handleLikeSong() {
    setLikeLoading(true);
    try {
      const response = await likeSongService(id);
      setSong(response);
      setLikeSong(!likeSong);
    } catch (err) {
      console.log(err);
    }

    setLikeLoading(false);
  }
  return (
    <Flex key={id} alignItems="center" justifyContent="space-between">
      <Flex gap="20px" alignItems="center" justifyContent="center">
        <Text width="50px" fontSize="25px">
          {id}
        </Text>

        <Box position="relative" width="100px" height="80px">
          {cover ? (
            <Image
              borderRadius="5px"
              src={cover}
              width="100%"
              height="100%"
              zIndex="1"
            />
          ) : (
            <MdOutlineImageNotSupported
              fontSize="100px"
              width="100px"
              height="80px"
            />
          )}

          <Box
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            transition="0.3s all ease"
            _hover={{ opacity: 1 }}
            opacity="0"
            zIndex="10"
            cursor="pointer"
            onClick={() => onPlayAudio(audio)}
          >
            {isPlaying ? (
              <FaPause fontSize="40px" color="white" />
            ) : (
              <FaPlay fontSize="40px" color="white" />
            )}
          </Box>
        </Box>

        <Flex flexDirection="column">
          <Text
            as={Link}
            to={`/audios/${id}`}
            width="150px"
            fontSize="20px"
            fontWeight="600"
          >
            {title}
          </Text>
          <Text
            as={Link}
            to={`/users/${authorId}`}
            width="150px"
            fontSize="16px"
            color="#ccc"
            fontWeight="400"
          >
            {author}
          </Text>
        </Flex>
      </Flex>

      <Text width="150px" fontSize="19px" color="#ccc" fontWeight="400">
        {likesCount}
      </Text>
      <Text width="300px" fontSize="19px" color="#ccc" fontWeight="400">
        {formatSongDate(createdAt)}
      </Text>

      <Flex gap="20px">
        {likeLoading ? (
          <Spinner margin="0 auto" />
        ) : (
          <Button
            leftIcon={
              song.isLiked ? (
                <FaHeart color="#D6D10F" />
              ) : (
                <CiHeart fontSize="30px" />
              )
            }
            onClick={handleLikeSong}
            variant="ghost"
            fontSize="25px"
          ></Button>
        )}
        <Button variant="ghost">
          <BsThreeDots fontSize="25px" />
        </Button>
      </Flex>
    </Flex>
  );
}

TrendingSongCard.propTypes = {
  id: PropTypes.any,
  author: PropTypes.any,
  title: PropTypes.any,
  cover: PropTypes.any,
  createdAt: PropTypes.any,
  isLiked: PropTypes.any,
  likesCount: PropTypes.any,
  onPlayAudio: PropTypes.any,
  audio: PropTypes.any,
  isPlaying: PropTypes.any,
  authorId: PropTypes.any,
};

export default TrendingSongCard;
