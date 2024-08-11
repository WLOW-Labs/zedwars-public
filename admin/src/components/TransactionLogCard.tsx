import {
  Text,
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  StackDivider,
  Button,
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalContent,
  Badge,
} from '@chakra-ui/react'
import { useTransactionLogs } from '../providers/useTransactionLogs'
import string_truncate from '../utils/string_truncate'

interface Props {
  size: string
}
const TransactionLogCard = ({ size }: Props) => {
  const { logs } = useTransactionLogs()
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Card
        variant={'outline'}
        w={size}
        h={size}
        background={logs ? (logs.err ? 'red.200' : 'transparent') : 'transparent'}
      >
        <CardHeader>
          <Heading size={'md'}>Transaction Log</Heading>
        </CardHeader>
        <CardBody>
          <Stack divider={<StackDivider />} spacing='4'>
            <Box>
              <Heading size='xs' textTransform='uppercase'>
                Signature
                {logs ? (
                  logs.err ? (
                    <Badge ml='2' colorScheme='red'>
                      Error
                    </Badge>
                  ) : (
                    <Badge ml='2' colorScheme='green'>
                      Success
                    </Badge>
                  )
                ) : null}
              </Heading>
              <Text pt='2' fontSize='sm'>
                {logs ? string_truncate(logs.signature, 8) : '...'}
              </Text>
            </Box>
            <Box>
              <Button variant={'outline'} onClick={onOpen} isDisabled={logs == null}>
                Show Logs
              </Button>
            </Box>
          </Stack>
        </CardBody>
      </Card>
      <Modal onClose={onClose} isOpen={isOpen} scrollBehavior={'inside'} size={'3xl'} isCentered={true}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Transaction Log</ModalHeader>
          <ModalBody>
            {logs ? logs.logs.map((log, index) => <Text key={index}>{log}</Text>) : <Text>...</Text>}
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default TransactionLogCard
