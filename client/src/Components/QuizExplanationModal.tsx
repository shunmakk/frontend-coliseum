import Modal from "./Modal";
import { Button, Flex, Text } from "@chakra-ui/react";

interface ExplanationModalProps {
  show: boolean;
  explanation: string;
  onClose: () => void;
}

//解説を表示するモーダル
const QuizExplanationModal: React.FC<ExplanationModalProps> = ({ show, explanation, onClose }) => {
  return (
    <Modal show={show} onClose={onClose} explanation={true}>
      <Flex direction="column" align="center">
        <Text fontSize="xl" fontWeight="bold" mb={4} className="mt-3">
          解説
        </Text>
        <Text>{explanation}</Text>
        <Button
          onClick={onClose}
          className="mt-2 text-xs text-white bg-blue-400 rounded-md px-2 py-1"
        >
          解説を閉じて次に進む
        </Button>
      </Flex>
    </Modal>
  );
};

export default QuizExplanationModal;
