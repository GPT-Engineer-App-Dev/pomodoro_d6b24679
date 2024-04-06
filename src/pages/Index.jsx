import { Box, Button, Center, Container, Heading, Text, useToast, VStack, Progress, CircularProgress, CircularProgressLabel, useInterval, IconButton } from "@chakra-ui/react";
import { FaPlay, FaPause, FaRedoAlt } from "react-icons/fa";
import { useState } from "react";

const Index = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(25 * 60); // 25 minutes
  const [isBreak, setIsBreak] = useState(false);

  const toast = useToast();

  const startTimer = () => setIsRunning(true);
  const pauseTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setIsRunning(false);
    setIsBreak(false);
    setSecondsLeft(25 * 60);
  };

  useInterval(
    () => {
      if (secondsLeft > 0) {
        setSecondsLeft(secondsLeft - 1);
      } else {
        setIsRunning(false);
        toast({
          title: isBreak ? "Break is over" : "Pomodoro complete",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setIsBreak(!isBreak);
        setSecondsLeft(isBreak ? 25 * 60 : 5 * 60); // 5 minutes for break
      }
    },
    isRunning ? 1000 : null,
  );

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <Container centerContent>
      <VStack spacing={8} mt={10}>
        <Heading>Pomodoro Timer</Heading>
        <CircularProgress value={(isBreak ? 5 * 60 : 25 * 60) - secondsLeft} max={isBreak ? 5 * 60 : 25 * 60} size="200px" thickness="8px" capIsRound color={isBreak ? "green.400" : "red.400"}>
          <CircularProgressLabel>{formatTime(secondsLeft)}</CircularProgressLabel>
        </CircularProgress>
        <Text fontSize="xl">{isBreak ? "Break Time" : "Focus Time"}</Text>
        <Box>
          {isRunning ? <IconButton icon={<FaPause />} onClick={pauseTimer} aria-label="Pause timer" isRound /> : <IconButton icon={<FaPlay />} onClick={startTimer} aria-label="Start timer" isRound />}
          <IconButton icon={<FaRedoAlt />} onClick={resetTimer} aria-label="Reset timer" ml={2} isRound />
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;
