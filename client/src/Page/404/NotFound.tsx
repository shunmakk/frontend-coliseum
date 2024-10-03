import { Alert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/react";

const NotFound = () => {
  return (
    <>
      <Alert
        status="error"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="200px"
        className="bg-red-200 rounded-sm"
        width={600}
      >
        <AlertIcon boxSize="40px" mb={4} color="red" />
        <AlertTitle mt={4} mb={1} className="text-2xl font-semibold">
          404 NotFound
        </AlertTitle>
        <AlertDescription maxWidth="sm" className="mt-1">
          お探しのページは見つかりません
        </AlertDescription>
      </Alert>
    </>
  );
};

export default NotFound;
