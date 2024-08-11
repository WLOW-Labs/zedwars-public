import { Box, useDisclosure } from '@chakra-ui/react'
import CharacterSelection from '../components/CharacterSelection'
import GameScreen from '../components/GameScreen'
import WelcomeScreen from '../components/WelcomeScreen'
import { useCharacter } from '../providers/CharacterProvider'
import { Banner } from '../components/Banner'
import { Settings } from '../components/Settings'
import { withMatchMedia } from '../hooks/withMatchMedia'

const MainPage = ({ isMobile }: { isMobile?: boolean }) => {
  const { characterMint } = useCharacter()
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Banner />
      <Box
        {...(!isOpen
          ? {
            fontSize: 'xl',
          }
          : {})}
        maxWidth={'1500px'}
        maxHeight={'850px'}
        width={'100%'}
        height={'100%'}
        borderColor={'#A8B5B2'}
        borderWidth={'10px'}
        backgroundColor={'#577277'}
        margin={isMobile ? 0 : 3}
      >
        {isOpen ? (
          <CharacterSelection closeSelection={onClose} openSelection={isOpen} />
        ) : characterMint ? (
          <GameScreen openCharacterSelection={onOpen} />
        ) : (
          <WelcomeScreen openCharacterSelection={onOpen} />
        )}
      </Box>
      <Settings />
    </>
  )
}

export default withMatchMedia(MainPage)
