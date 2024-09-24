import React from "react";
import { Box } from "@chakra-ui/react";

interface ModalProps {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
  explanation: boolean;
}

const Modal: React.FC<ModalProps> = ({ show, onClose, children }) => {
  if (!show) return null;

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      bg="rgba(0, 0, 0, 0.5)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      zIndex={1000}
      css={{
        bottom: "-550px",
        "@media screen and (min-width: 768px)": {
          bottom: "-400px",
        },
        "@media screen and (max-width: 380px)": {
          bottom: "-480px",
        },
      }}
    >
      <Box
        bg="white"
        borderRadius="md"
        maxWidth="90%"
        maxHeight="90%"
        overflow="auto"
        position="relative"
        padding={15}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Modal;
